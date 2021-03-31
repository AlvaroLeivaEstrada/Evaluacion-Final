
import json

# Django
from django.core.files import File
from django.db.models import Avg
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import AnonymousUser

# Rest Framework
from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.decorators import action


# Serializer
from api.serializers.product import ProductSerializer,ProductRegisterSerializer
from api.serializers.sale import SaleRegisterSerializer

# Models
from api.models.product import Product
from api.models.sale import Sale

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(activo=True)

  
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("name", "price")
    search_fields = ("name", "price")
    ordering_fields = ("price", "name")


    def get_serializer_class(self):

        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductSerializer
        else:
            return ProductRegisterSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action=="buyProduct" or self.action=="retrieve":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self,request,*args,**kwargs):
        data = request.data
        user = request.user.profile
 
        try:
            image = data.get("archivo")
            data = json.loads(data["data"])
            serializer = ProductRegisterSerializer(data=data)
            if serializer.is_valid():
                Product.objects.create(
                    name=data.get("name"),
                    price=data.get("price"),
                    user=user,
                    archivo=File(image),
                    description=data.get("description")) 
                return Response(data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def list(self,request):
        
        try:
            user = request.user
            if user.id is None:
                queryset = Product.objects.filter(activo=True)
            else:
                user = user.profile
                queryset = Product.objects.exclude(user=user).filter(activo=True)
                
            serializer = ProductSerializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        
        try:            
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            
            serializer = ProductRegisterSerializer(data=data)
            if serializer.is_valid():
            
                product = Product.objects.get(pk=pk)                

                if product.archivo is not None:
                    product.archivo.delete()
                 
                product.name = data.get("name")
                product.description = data.get("description")
                product.price = data.get("price")
                product.archivo = File(archivo)  
                             
                product.save()

                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"],detail=False)
    def productsInSale(self,request):
        user=request.user.profile
        queryset = Product.objects.exclue(user=user).filter(activo=True)
        products = ProductSerializer(queryset,many=True)
        return Response(products,status=status.HTTP_200_OK)

    @action(methods=["get"],detail=False)
    def myProducts(self,request):
        try:
            user = request.user.profile
            queryset = Product.objects.filter(user=user).filter(activo=True)
            serializer = ProductSerializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)
    
    @action(methods=["post"], detail=False)
    def buyProduct(self, request):
        buyer=None
        if request.user.id is not None:
            buyer=request.user.profile

        data=request.data
        data={
            "product":data.get("id"),
            "owner":data.get("user")
        }
        serializer = SaleRegisterSerializer(data = data)
        if serializer.is_valid():
            product = Product.objects.get(pk=data.get("product"))
            owner = product.user
         
            Sale.objects.create(
                product=product,
                owner=owner,
                buyer=buyer
              
            )
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            
    @action(methods=["get"],detail=False)
    def avgPriceProduct(self,request):
        user=request.user.profile
        try:
            promedio = Product.objects.filter(user=user,activo=True).aggregate(
                promedio_precio=Avg('price')
            )
            return Response(promedio,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail':str(e)},status=status.HTTP_400_BAD_REQUEST)

