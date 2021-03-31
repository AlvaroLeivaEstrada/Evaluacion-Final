# Django
from django.db import models

# Models
from api.models.product import Product
from api.models.profile import Profile

class Sale(models.Model):
    product = models.ForeignKey('Product',on_delete=models.CASCADE,related_name="sale")
    owner = models.ForeignKey('Profile',on_delete=models.CASCADE,related_name="sale")
    buyer = models.ForeignKey('Profile',on_delete=models.CASCADE,related_name="items",null=True,blank=True)

    activo = models.BooleanField(default=True)
    compra = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

     
    def __str__(self):
        return self.name

    def delete(self):
        self.activo=False
        self.save()
        return True
        

