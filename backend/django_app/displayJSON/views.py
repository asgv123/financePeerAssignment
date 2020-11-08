from django.db import IntegrityError
from django.http import JsonResponse
# from django.shortcuts import render_to_response

from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import myTable
import json
import fnmatch   

# Create your views here.
class getData(APIView):
    
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, format=None):
        queryset = myTable.objects.all().values()
        # print(queryset)
        return JsonResponse({"data": list(queryset)})
          

class handleJSON(APIView):
    keys = ['userId', 'id', 'title', 'body']
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
          
        print("\n\n ###################################")
       
        for file_entry in request.FILES.getlist('file'):
            isNotJSON = file_entry.name.lower().split('.')[-1] != 'json'
            if isNotJSON:
                print("\n NOT JSON\n")
                return Response("Upload only JSON files")
            data = file_entry.read()
        print("\n\n ###################################")
        json_obj = json.loads(data.decode('utf8'))
        id_clash = False
        num_clash = 0
        for i in range(len(json_obj)): # check for repeated id, new keys
            entry = {}
            entry['userId'] = json_obj[i]['userId']
            entry['id'] = json_obj[i]['id']
            entry['title'] = json_obj[i]['title']
            entry['body'] = json_obj[i]['body']
            db_obj = myTable(**entry)
            try:
                db_obj.save()
            except IntegrityError:
                id_clash = True
                num_clash += 1
        if id_clash == True:
                response_str = "{num_clash} rows not stored - they already exist!".format(num_clash = num_clash)
                return Response(response_str)
        return Response("Stored Successfully")
            
                
            
        #     return 
        # except:
        #     return Response("Check the format of the JSON file!")