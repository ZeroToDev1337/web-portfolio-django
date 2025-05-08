from django.contrib import admin
from .models import Tag, Project

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'create_at']
    filter_horizontal = ['tags']