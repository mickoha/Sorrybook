from rest_framework import routers
from .api import SorryViewSet

router = routers.DefaultRouter()
router.register('api/sorries', SorryViewSet, 'sorries')

urlpatterns = router.urls
