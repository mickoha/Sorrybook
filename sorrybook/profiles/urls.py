from rest_framework import routers
from .api import ProfileViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('api/profiles', ProfileViewSet, 'profiles')
router.register('api/users', UserViewSet, 'users')

urlpatterns = router.urls
