from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Usuario, Permiso
from django.contrib.auth.hashers import make_password, check_password

def inicio_registro(request):
    if request.method == 'POST':
        # Manejar el login
        if 'inicio_submit' in request.POST:
            correo = request.POST.get('inicio_email')
            contraseña = request.POST.get('inicio_password')
            
            try:
                # Buscar el usuario por correo
                usuario = Usuario.objects.get(correo=correo)
                
                # Verificar la contraseña encriptada
                if check_password(contraseña, usuario.contraseña):
                    messages.success(request, '¡Bienvenido!')
                    #return redirect('inicio')
                else:
                    messages.error(request, 'Contraseña incorrecta')
                    
            except Usuario.DoesNotExist:
                messages.error(request, 'Usuario no encontrado')
            
            return render(request, 'LoginyRegistro.html')
            
        # Manejar el registro
        elif 'registro_submit' in request.POST:
            # Obtener los datos del formulario
            nombre_completo = request.POST.get('registro_username')
            correo = request.POST.get('registro_email')
            contraseña = request.POST.get('registro_password')
            
            # Validar que los campos obligatorios no estén vacíos
            if not all([nombre_completo, correo, contraseña]):
                messages.error(request, 'Todos los campos son obligatorios')
                return render(request, 'LoginyRegistro.html')
            
            # Dividir el nombre completo en palabras
            palabras = nombre_completo.strip().split()
            
            # Validar que haya al menos 3 palabras
            if len(palabras) < 3:
                #Este mensaje no se deberia usar js tambien hace la comprovación
                messages.error(request, 'Por favor ingrese su nombre completo (mínimo 1 nombre y 2 apellido)')
                return render(request, 'LoginyRegistro.html')
            
            # Separar nombres y apellidos
            apellidos = ' '.join(palabras[-2:])  # Últimas dos palabras como apellidos
            nombres = ' '.join(palabras[:-2])    # Resto como nombres
            
            # Verificar si el correo ya existe
            if Usuario.objects.filter(correo=correo).exists():
                messages.error(request, 'Este correo ya está registrado')
                return render(request, 'LoginyRegistro.html')
            
            try:
                # Generar un número de usuario único
                ultimo_usuario = Usuario.objects.order_by('-numero_usuario').first()
                nuevo_numero = (ultimo_usuario.numero_usuario + 1) if ultimo_usuario else 1
                
                # Obtener el permiso de cliente (numero_permiso=1)
                permiso_cliente = Permiso.objects.get(numero_permiso=1)
                
                # Encriptar la contraseña
                contraseña_encriptada = make_password(contraseña)
                
                # Crear el nuevo usuario
                usuario = Usuario.objects.create(
                    numero_usuario=nuevo_numero,
                    nombre=nombres,
                    apellido=apellidos,
                    correo=correo,
                    contraseña=contraseña_encriptada,
                    permiso=permiso_cliente
                )
                
                messages.success(request, '¡Registro exitoso! Ahora puedes iniciar sesión.')
                #return redirect('login')
                
            except Exception as e:
                messages.error(request, f'Error al registrar: {str(e)}')
                return render(request, 'LoginyRegistro.html')
    
    return render(request, 'LoginyRegistro.html')

def index(request):
    return render(request, 'index.html')

def perfil(request):
    return render(request, 'clients/perfil.html')

def home(request):
    return render(request, 'clients/home.html')

