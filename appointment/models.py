from django.db import models
from users.models import Usuario, Estilista

class Estado(models.Model):
    numero_estado = models.PositiveSmallIntegerField(primary_key=True)
    nombre_estado = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nombre_estado} ({self.numero_estado})"

class Servicio(models.Model):
    numero_servicio = models.PositiveSmallIntegerField(primary_key=True)
    nombre_servicio = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nombre_servicio} ({self.numero_servicio})"

class DiaSemana(models.Model):
    numero_semana = models.PositiveSmallIntegerField(primary_key=True)
    nombre_dia = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.nombre_dia} ({self.numero_semana})"

class ServiciosEstilista(models.Model):
    numero_combinacion = models.PositiveSmallIntegerField(primary_key=True)
    cedula_estilista = models.ForeignKey(Estilista, on_delete=models.CASCADE, related_name='servicios')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='estilistas')

    def __str__(self):
        return f"Combinación {self.numero_combinacion} - {self.cedula_estilista} - {self.servicio}"

class Cita(models.Model):
    numero_cita = models.BigIntegerField(primary_key=True, default=1)
    hora_inicio = models.TimeField()
    hora_finalizacion = models.TimeField()
    dia_semana = models.ForeignKey(DiaSemana, on_delete=models.PROTECT)
    dia_mes = models.PositiveSmallIntegerField()
    hora_inicio_agendacion = models.TimeField()
    hora_finalizacion_agendacion = models.TimeField()
    calificacion = models.PositiveSmallIntegerField(null=True, blank=True)
    comentario = models.TextField(null=True, blank=True)
    servicios = models.ForeignKey(ServiciosEstilista, on_delete=models.SET_NULL, null=True, blank=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    numero_usuario = models.ForeignKey(Usuario, on_delete=models.PROTECT)
    estado = models.ForeignKey(Estado, on_delete=models.PROTECT)

    def __str__(self):
        return f"Cita {self.numero_cita} - {self.numero_usuario} - {self.dia_semana} {self.dia_mes}"
