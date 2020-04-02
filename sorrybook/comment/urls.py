from rest_framework import routers
from django.urls import path, re_path, include
from .api import CommentViewSet

router = routers.DefaultRouter()
router.register('api/comments', CommentViewSet, 'comments')

urlpatterns = [
  path('', include(router.urls)),
]
