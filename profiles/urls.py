
from django.urls import path, include, re_path
from .api import ProfileAPI, UserViewSet

urlpatterns = [
  re_path(r'api/users', UserViewSet.as_view({'get': 'list'}), name='users'),
  re_path(r'api/profiles/(?P<pk>[^/.]+)/', ProfileAPI.as_view(), name='profile')
]
