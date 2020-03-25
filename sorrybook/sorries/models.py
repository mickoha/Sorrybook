from django.db import models

class Sorry(models.Model):
  apologist = models.CharField(max_length=100, blank=True)
  content = models.CharField(max_length=300)
  created_at = models.DateTimeField(auto_now_add=True)