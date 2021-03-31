# Rest Framework
from rest_framework import serializers
# Models
from api.models.sale import Sale

class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model= Sale
        fields=(
            'id',
            'product',
            'owner',
        )
        depth=1

class SaleRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = (
            'product',
        )