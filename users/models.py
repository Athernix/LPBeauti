from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Permiso(models.Model):
    numero_permiso = models.PositiveSmallIntegerField(primary_key=True)
    nombre_permiso = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre_permiso} ({self.numero_permiso})"

class Usuario(models.Model):
    numero_usuario = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=100, null=True, blank=True)
    apellido = models.CharField(max_length=100, null=True, blank=True)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=128)
    permiso = models.ForeignKey(Permiso, on_delete=models.PROTECT, related_name='usuarios', null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.numero_usuario}"

class Estilista(models.Model):
    cedula = models.BigIntegerField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='estilistas/', null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} - {self.cedula}"
