from rest_framework import serializers
from .models import Sorry

# Sorry Serializer
class SorrySerializer(serializers.ModelSerializer):
  class Meta:
    model = Sorry
    fields = '__all__'