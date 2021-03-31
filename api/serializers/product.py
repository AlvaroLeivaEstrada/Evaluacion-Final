# Rest Framework
from rest_framework import serializers
# Models
from api.models.product import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model= Product
        fields=(
            'id',
            'name',
            'price',
            'description',
            'user',
            'archivo'
        )

class ProductRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (
            'name',
            'price',
            'description'
        )