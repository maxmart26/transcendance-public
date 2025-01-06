from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(['POST'])
def test_world(request):
    return Response({"message": "POST, world!"})

from django.shortcuts import render

def home(request):
    return render(request, 'index.html')  # Assure-toi que "index.html" existe dans "myapp/templates/"


from django.shortcuts import render
from django.http import JsonResponse
from .models import Person
from django.views.decorators.csrf import csrf_exempt
import json


