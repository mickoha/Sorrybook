from django.urls import path, re_path, include
from .api import CommentViewSet

urlpatterns = [
  re_path(r'api/comments/$', CommentViewSet, 'comments'),
]
