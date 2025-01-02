from django.http import JsonResponse
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Information
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg import openapi



@csrf_exempt  # Désactive temporairement la protection CSRF pour simplifier les tests
def receive_info(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse les données JSON envoyées
            info = Information.objects.create(
                name=data['name'],
                email=data['email'],
                message=data['message']
            )
            return JsonResponse({'status': 'success', 'message': 'Information received!'}, status=201)
        except KeyError as e:
            return JsonResponse({'status': 'error', 'message': f'Missing key: {e}'}, status=400)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

def send_info(request):
    if request.method == "GET":
        infos = Information.objects.all().values('name', 'email', 'message', 'created_at')
        return JsonResponse(list(infos), safe=False)
    return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)

from django.http import HttpResponse

def home(request):
    return HttpResponse("Bienvenue sur la page d'accueil !")

@swagger_auto_schema(
    method='get',
    operation_description="Récupère toutes les informations stockées.",
    operation_summary="Liste des informations stockées",
    tags=["Informations"]
)
@api_view(['GET'])
def send_info(request):
    if request.method == "GET":
        infos = Information.objects.all().values('name', 'email', 'message', 'created_at')
        return Response(list(infos))

@swagger_auto_schema(
    method='post',
    operation_description="Teste du login à l'API avec les informations de l'utilisateur.",
    operation_summary="Login",
    tags=["login"],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='Nom d\'utilisateur'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='Mot de passe'),
        },
        required=['username', 'password']
    ),
    responses={
        200: openapi.Response(
            description="Connexion réussie",
            examples={
                "application/json": {
                    "message": "Login successful!"
                }
            }
        ),
        400: openapi.Response(
            description="Erreur de connexion",
            examples={
                "application/json": {
                    "message": "Invalid credentials."
                }
            }
        )
    }
)
@api_view(['POST'])
def login(request):
    if request.method == "POST":
        # Parse les données du corps de la requête
        data = request.data
        username = data.get('username')
        password = data.get('password')

        # Exemple de logique : vérifier les informations
        if username == "admin" and password == "password123":
            return Response({"message": "Login successful!"}, status=200)
        else:
            return Response({"message": "Invalid credentials."}, status=400)