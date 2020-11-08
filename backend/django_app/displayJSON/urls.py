from django.urls import path
import displayJSON.views as views
urlpatterns = [
    path('upload/', views.handleJSON.as_view(), name = 'api_upload'),
    path('download/', views.getData.as_view(), name = 'api_download'),
]