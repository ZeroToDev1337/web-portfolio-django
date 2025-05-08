from django.contrib import admin
from django.urls import path, register_converter
from . import views, convertes


register_converter(convertes.ArchiveYears, 'year')

urlpatterns = [
    path('', views.main, name='home'),
    path('projects/', views.projects, name='projects'),
    path('about/', views.about, name='about'),
]