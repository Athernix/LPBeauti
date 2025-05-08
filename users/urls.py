from django.contrib import admin
from django.urls import path
from . import views

app_name = 'users'
urlpatterns = [
    path('', views.index, name='index'),
    path('log/', views.inicio_registro, name='log'),
    path('perfil/', views.perfil, name='perfil'),
    path('home/', views.home, name='home'),
]