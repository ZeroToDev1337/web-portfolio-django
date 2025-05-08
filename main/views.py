from django.http import HttpResponse
from django.shortcuts import render
from .models import Project


def main(request):
    return render(request, 'main/main.html')


def projects(request):
    Projects = Project.objects.all()
    return render(request, 'main/projects.html', {'projects':Projects})


def about(request):
    return render(request, 'main/about.html')