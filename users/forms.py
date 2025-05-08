from django import forms
from .models import Usuario

class registroForm(forms.ModelForm):
    class Meta:
        model = Usuario
        fields = [
            'nombre',
            'correo',
            'contraseña'
        ]
        widgets = {
            'contraseña': forms.PasswordInput(),
        }