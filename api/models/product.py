
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100,blank=True,null=True)
    price = models.FloatField(blank=True,null=True,default=0)
    description = models.CharField(max_length=300,null=True,blank=True)
    user = models.ForeignKey('Profile',on_delete=models.CASCADE,related_name="usuario")
    archivo = models.FileField(upload_to='images',blank=True,null=True)
    #items_available = models.IntegerField(default=0)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def delete(self):
        self.activo=False
        self.save()
        return True
        
