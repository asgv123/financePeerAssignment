import uuid
from django.db import models

# Create your models here.
class myTable(models.Model):
	userId = models.PositiveIntegerField()
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title = models.CharField(max_length=100)
	body = models.TextField()