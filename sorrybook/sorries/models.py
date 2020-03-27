from django.db import models
from django.contrib.auth.models import User

class Sorry(models.Model):
  owner = models.ForeignKey(User, related_name="sorries", on_delete=models.CASCADE, null=True)
  apologist = models.CharField(max_length=100, blank=True)
  content = models.CharField(max_length=300)
  created_at = models.DateTimeField(auto_now_add=True)