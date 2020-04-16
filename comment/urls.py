from django.urls import path, re_path, include
from .api import CommentViewSet, create_comment, delete_comment

urlpatterns = [
  re_path(r'api/comments/(?P<pk>[^/.]+)/$', CommentViewSet.as_view({'get': 'retrieve'}), name='comments'),
  re_path(r'api/delete-comment/(?P<pk>[^/.]+)/$', delete_comment, name='delete_comment'),
  re_path(r'api/create-comment/$', create_comment, name="create_comment")
]
