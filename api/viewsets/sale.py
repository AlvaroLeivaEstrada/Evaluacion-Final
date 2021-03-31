import json

from django.core.files import File

# Django
from django.contrib.auth.models import User
from django.db.models import Sum,Q

# Rest Framework
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework import status, filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend

# Models
from api.models.product import Product
from api.models.profile import Profile
from api.models.sale import Sale

# Serializer
from api.serializers.sale import SaleSerializer, SaleRegisterSerializer


class SaleViewset(viewsets.ModelViewSet):
    queryset = Sale.objects.filter(activo=True)
    


    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("product__name", )
    search_fields = ("prodcut__name", )
    ordering_fields = ("product__name",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return SaleSerializer
        else:
            return SaleRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action == "buyProduct":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    
    @action(methods=["get"],detail=False)
    def totalSalesbyProduct(self,request):
        user = request.user.profile
        try:
            queryset = Product.objects.prefetch_related(
                'sale'
                ).filter(sale__owner=user).annotate(
                    totalSalesbyProduct=Sum('sale__product__price')
                    )
            products=[]
            for product in queryset:
                data = {
                    "name":product.name,
                    "total_Sales":product.totalSalesbyProduct
                }
                products.append(data)
            print(products)
            return Response(products,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)},status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"],detail=False)
    def totalSales(self,request):
        user = request.user.profile
        try:
            total_sales = Sale.objects.filter(owner=user).aggregate(
                total_sales=Sum('product__price')
                )
            return Response(total_sales,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)},status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"],detail=False)
    def myShoppingBasket(self,request):
        user=request.user.profile
        items = Sale.objects.filter(buyer=user)
        serializer = SaleSerializer(items,many=True)
        print(serializer.data)
        return Response(serializer.data,status.HTTP_200_OK)

    
