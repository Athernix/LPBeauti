from django.contrib import admin
from django.urls import path
from . import views

app_name = 'appointment'

urlpatterns = [
    path('calendario/', views.calendario, name='calendario'),
    path('pago/', views.pago, name='pago'),
]