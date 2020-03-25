from .models import Sorry
from rest_framework import viewsets, permissions
from .serializers import SorrySerializer

# Sorry Viewset
class SorryViewSet(viewsets.ModelViewSet):
  queryset = Sorry.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = SorrySerializer