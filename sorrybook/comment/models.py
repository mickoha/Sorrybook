from django.db import models
from sorries.models import Sorry
from django.contrib.auth.models import User

class Comment(models.Model):
    sorry = models.ForeignKey(Sorry, related_name='comment_sorry', on_delete=models.CASCADE)
    owner = models.ForeignKey(User, related_name='comment_owner', on_delete=models.CASCADE, null=True)
    content = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)
