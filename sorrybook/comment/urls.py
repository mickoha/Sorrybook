from django.urls import path, re_path, include
from .api import CommentViewSet, create_comment
urlpatterns = [
  re_path(r'api/comments/', CommentViewSet.as_view({'get': 'list'}), name='comments'),
  re_path(r'api/create-comment/$', create_comment, name="create_comment")
]
