from rest_framework import routers
from django.urls import path, re_path, include
from .api import SorryViewSet, like_sorry

router = routers.DefaultRouter()
router.register('api/sorries', SorryViewSet, 'sorries')

urlpatterns = [
  path('', include(router.urls)),
  re_path(r'api/like/$', like_sorry, name="like")
]