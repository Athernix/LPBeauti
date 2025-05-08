from django.core.management.base import BaseCommand
from users.models import Permiso

class Command(BaseCommand):
    help = 'Inicializa los permisos básicos en la base de datos'

    def handle(self, *args, **kwargs):
        permisos = [
            {'numero_permiso': 1, 'nombre': 'Cliente'},
            {'numero_permiso': 2, 'nombre': 'Administrador'},
            {'numero_permiso': 3, 'nombre': 'Supervisor'},
        ]

        for permiso_data in permisos:
            Permiso.objects.get_or_create(
                numero_permiso=permiso_data['numero_permiso'],
                defaults={'nombre': permiso_data['nombre']}
            )
            self.stdout.write(
                self.style.SUCCESS(f'Permiso "{permiso_data["nombre"]}" creado o ya existente')
            ) 