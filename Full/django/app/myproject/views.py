from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from myapp.models import Player
from myapp.serializers import PlayerLead
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, logout
from django.shortcuts import redirect
from django.http import JsonResponse,HttpResponseRedirect
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
import requests
import os
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.core.files.base import ContentFile
from django.views.decorators.csrf import csrf_exempt
from collections import defaultdict
from django.utils.timezone import now
import uuid




import logging
logger = logging.getLogger(__name__)

# route pour add un player
@swagger_auto_schema(
    method="post",
    operation_description="Ajoute un nouveau joueur avec un nom d'utilisateur, un mot de passe, un email et une image d'avatar.",
    consumes=["multipart/form-data"],  # Important pour Swagger
    manual_parameters=[
        openapi.Parameter('username', openapi.IN_FORM, type=openapi.TYPE_STRING, required=True, description="Nom d'utilisateur"),
        openapi.Parameter('password', openapi.IN_FORM, type=openapi.TYPE_STRING, required=True, description="Mot de passe"),
        openapi.Parameter('email', openapi.IN_FORM, type=openapi.TYPE_STRING, required=True, description="Email"),
        openapi.Parameter('image_avatar', openapi.IN_FORM, type=openapi.TYPE_FILE, required=True, description="Image d'avatar"),
    ],
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING),
                'player_id': openapi.Schema(type=openapi.TYPE_STRING),  # UUID string
                'image_url': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        400: "Bad Request: Champs manquants",
        500: "Erreur interne du serveur",
    },
)
@api_view(["POST"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def add_player(request):
    """Ajoute un joueur avec upload d'image."""
    try:
        logger.debug(f"Request data: {request.data}")
        logger.debug(f"Request files: {request.FILES}")

        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        image_avatar = request.FILES.get("image_avatar", None)

        if not username or not password or not email:
            return Response({"error": "Tous les champs (username, password, image_avatar) sont requis."},
                            status=status.HTTP_400_BAD_REQUEST)

        if Player.objects.filter(email=email).exists():
            return Response({"error": "Cet email est déjà utilisé."}, status=status.HTTP_400_BAD_REQUEST)
        
        if Player.objects.filter(username=username).exists():
            return Response({"error": "Cet username est déjà utilisé."}, status=status.HTTP_400_BAD_REQUEST)


        hashed_password = make_password(password)

        player = Player.objects.create(username=username, password=hashed_password, email=email, image_avatar=image_avatar)

        return Response({
            "message": "Joueur ajouté avec succès !",
            "player_id": str(player.id),
            "image_url": player.image_avatar.url if player.image_avatar else None
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        logger.error(f"Erreur lors de l'ajout d'un joueur: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# route pour modif un player
@swagger_auto_schema(
    method="put",
    operation_description="Met à jour ou ajoute un joueur.",
    consumes=["multipart/form-data"],  # Indispensable pour Swagger
    manual_parameters=[
        openapi.Parameter('player_id', openapi.IN_FORM, type=openapi.TYPE_STRING, required=True, description="ID du joueur à modifier"),
        openapi.Parameter('username', openapi.IN_FORM, type=openapi.TYPE_STRING, description="Nouveau nom d'utilisateur"),
        openapi.Parameter('password', openapi.IN_FORM, type=openapi.TYPE_STRING, description="Nouveau mot de passe"),
        openapi.Parameter('email', openapi.IN_FORM, type=openapi.TYPE_STRING, description="Nouvel email"),
        openapi.Parameter('image_avatar', openapi.IN_FORM, type=openapi.TYPE_FILE, description="Nouvelle image d'avatar"),
        openapi.Parameter('nb_game_play', openapi.IN_FORM, type=openapi.TYPE_INTEGER, description="Nombre de parties jouées"),
        openapi.Parameter('nb_game_win', openapi.IN_FORM, type=openapi.TYPE_INTEGER, description="Nombre de parties gagnées"),
    ],
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING),
                'player': openapi.Schema(type=openapi.TYPE_OBJECT),
            }
        ),
        404: "Joueur non trouvé",
        400: "Requête invalide",
    },
)
@api_view(["PUT"])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])  # Ajout du parser pour gérer les fichiers
def update_or_add_player(request):
    try:
        data = request.data
        player_id = data.get("player_id")

        if not player_id:
            return Response({"error": "Le champ player_id est requis."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            player = Player.objects.get(id=player_id)
        except Player.DoesNotExist:
            return Response({"error": "Joueur non trouvé."}, status=status.HTTP_404_NOT_FOUND)

        if "username" in data:
            player.username = data["username"]
        if "password" in data:
            player.password = make_password(data["password"])
        if "email" in data:
            player.email = data["email"]
        if "image_avatar" in request.FILES:
            player.image_avatar = request.FILES["image_avatar"]
        if "nb_game_play" in data:
            player.nb_game_play = int(data["nb_game_play"])
        if "nb_game_win" in data:
            player.nb_game_win = int(data["nb_game_win"])

        player.save()

        return Response(
            {
                "message": "Joueur mis à jour avec succès.",
                "player": {
                    "id": str(player.id),
                    "username": player.username,
                    "email": player.email,
                    "nb_game_play": player.nb_game_play,
                    "nb_game_win": player.nb_game_win,
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        logger.error(f"Erreur lors de la mise à jour du joueur: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@swagger_auto_schema(
    method="post",
    operation_description="Log in a user with username and password.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='The username of the user'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='The password of the user'),
        },
        required=['username', 'password'],
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING),
                'token': openapi.Schema(type=openapi.TYPE_STRING),
            }
        ),
        401: "Unauthorized: Invalid credentials.",
    },
)
@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    """
    Login route to authenticate users.
    """
    data = request.data
    username = data.get("username")
    password = data.get("password")

    # Vérification des champs obligatoires
    if not username or not password:
        return Response(
            {"error": "Both username and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )
    # Authentification
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # Vérifiez si l'utilisateur existe dans la base
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        user.is_online = True  # ✅ Marque comme "en ligne"
        user.save(update_fields=["is_online"])
        response = Response(
            {
                "message": "Login successful!",
                "access": access_token,
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )

        # Définition d'un cookie contenant le token d'accès
        response.set_cookie(
            key='access_token',  # Nom du cookie
            value=access_token,  # Valeur (ici le token JWT)
            httponly=False,       # HTTPOnly pour la sécurité (non accessible en JS)
            secure=True,         # True si vous utilisez HTTPS
            samesite='Strict',   # Protéger contre les attaques CSRF
        )
        response.set_cookie(
            key='user_id',       # Nom du cookie
            value=user.id,       # ID de l'utilisateur connecté
            httponly=False,      # Accessible via JavaScript si besoin (optionnel)
            secure=True,         # True si vous utilisez HTTPS
            samesite='Strict',   # Protéger contre les attaques CSRF
        )
        response.set_cookie(
            key='user_username',       # Nom du cookie
            value=user.username,       # ID de l'utilisateur connecté
            httponly=False,      # Accessible via JavaScript si besoin (optionnel)
            secure=True,         # True si vous utilisez HTTPS
            samesite='Strict',   # Protéger contre les attaques CSRF
        )
        return response
    else:
        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    
@csrf_exempt
@api_view(["POST"])
@permission_classes([IsAuthenticated])  # Désactive la protection CSRF si tu l'appelles depuis un client externe
def user_logout(request):
    print("Utilisateur actuel :", request.user)  # ✅ Debugging

    if request.user.is_authenticated:
        # ✅ Marquer l'utilisateur comme hors ligne avant de le déconnecter
        request.user.is_online = False
        request.user.save(update_fields=["is_online"])

        logout(request)  # Déconnecte l'utilisateur

        response = JsonResponse({"message": "Logout successful!"})
        response.delete_cookie("access_token")  # ✅ Supprime le token JWT
        response.delete_cookie("user_id")
        response.delete_cookie("user_username")
        
        return response
    else:
        return JsonResponse({"error":request.user}, status=401)


def oauth_callback(request):
      # Étape 1 : Récupérer le code d'autorisation
    code = request.GET.get('code')
    if not code:
        return JsonResponse({'error': 'Code not provided'}, status=400)

    # Étape 2 : Échanger le code contre un token d'accès
    token_url = "https://api.intra.42.fr/oauth/token"
    data = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
    }

    response = requests.post(token_url, data=data)
    if response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch token', 'details': response.json()}, status=response.status_code)

    token = response.json().get('access_token')

    # Étape 3 : Récupérer les informations utilisateur
    user_info_url = "https://api.intra.42.fr/v2/me"
    headers = {
        'Authorization': f'Bearer {token}'
    }
    user_response = requests.get(user_info_url, headers=headers)
    if user_response.status_code != 200:
        return JsonResponse({'error': 'Failed to fetch user info'}, status=user_response.status_code)

    user_info = user_response.json()

    # Étape 4 : Gestion ou création de l'utilisateur
    email = user_info.get('email')
    username = user_info.get('login')
    avatar_url = user_info.get('image', {}).get('link')

    if not email or not username:
        return JsonResponse({'error': 'Missing user info from 42 API'}, status=400)

    try:
        # Chercher ou créer l'utilisateur
        player, created = Player.objects.get_or_create(
            email=email,
            defaults={
                'username': username,
                'image_avatar': avatar_url,
                'is_active': True,
                'is_staff': False,
                'nb_game_play': 0,
                'nb_game_win': 0,
            }
        )

        if avatar_url:
            image_response = requests.get(avatar_url)
            if image_response.status_code == 200:
                image_name = f"avatars/{username}.jpg"  # Nom du fichier
                player.is_online = True
                player.image_avatar.save(image_name, ContentFile(image_response.content), save=True)

        if not created and avatar_url:
            image_response = requests.get(avatar_url)
            if image_response.status_code == 200:
                image_name = f"avatars/{username}.jpg"
                player.is_online = True
                player.image_avatar.save(image_name, ContentFile(image_response.content), save=True)

        # Connecter l'utilisateur
        login(request, player)
        response = HttpResponseRedirect('/#home-page')
        refresh = RefreshToken.for_user(player)  # Génère un JWT pour Django
        access_token = str(refresh.access_token)
        response.set_cookie(
            key='access_token',  # Nom du cookie
            value=access_token,  # Valeur du token d'accès
            httponly=False,  # HTTPOnly pour empêcher l'accès via JavaScript
            secure=True,  # True si vous utilisez HTTPS
            samesite='Strict',  # Protéger contre les attaques CSRF
        )
        response.set_cookie(
            key='user_id',  # Nom du cookie
            value=str(player.id),  # ID de l'utilisateur connecté
            httponly=False,  # Accessible via JavaScript si nécessaire
            secure=True,  # True si vous utilisez HTTPS
            samesite='Strict',  # Protéger contre les attaques CSRF
        )
        response.set_cookie(
            key='user_username',       # Nom du cookie
            value=str(player.username),       # ID de l'utilisateur connecté
            httponly=False,      # Accessible via JavaScript si besoin (optionnel)
            secure=True,         # True si vous utilisez HTTPS
            samesite='Strict',   # Protéger contre les attaques CSRF
        )
        return response

    except IntegrityError as e:
        return JsonResponse({'error': 'Database error', 'details': str(e)}, status=500)

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "You are authenticated!"})


@swagger_auto_schema(
    method='get',
    operation_description="Retrieve user information by ID",
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'user': openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_STRING, description='The user UUID'),
                        'username': openapi.Schema(type=openapi.TYPE_STRING, description='The username of the player'),
                        'email': openapi.Schema(type=openapi.TYPE_STRING, description='The email of the player'),
                        'image_avatar': openapi.Schema(type=openapi.TYPE_STRING, format='url', description='URL of the avatar'),
                        'nb_game_play': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of games played'),
                        'nb_game_win': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of games won'),
                        'created_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time', description='Creation date'),
                        'updated_at': openapi.Schema(type=openapi.TYPE_STRING, format='date-time', description='Last update date'),
                    }
                )
            }
        ),
        404: "User not found"
    },
    manual_parameters=[
        openapi.Parameter(
            'user_id',
            openapi.IN_PATH,
            type=openapi.TYPE_STRING,
            description="UUID of the user",
            required=True
        )
    ]
)
@api_view(['GET']) 
def get_user_info(request, username):
    """
    Récupère les informations d'un utilisateur via son ID.
    """
    # Recherche l'utilisateur par son ID
    user = get_object_or_404(Player, username=username)

    # Retourne les informations de l'utilisateur
    user_data = {
        'id': str(user.id),
        'username': user.username,
        'email': user.email,
        'image_avatar': user.get_avatar_url(),
        'nb_game_play': user.nb_game_play,
        'nb_game_win': user.nb_game_win,
        'created_at': user.created_at.strftime('%Y-%m-%d %H:%M:%S'),
        'updated_at': user.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        'games_history': user.games_history,  # JSONField, stocke l'historique des parties
        'nb_friends': user.nb_friends,  # Nombre total d'amis
        'friends': [
            {'id': str(friend.id), 'username': friend.username, 'email': friend.email, 'image_avatar': friend.image_avatar.url if friend.image_avatar else None, 'online' : friend.is_online}
            for friend in user.friends.all()
        ],
    }

    return JsonResponse({'user': user_data}, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_friend(request):
    """Ajoute un ami à la liste d'amis d'un joueur"""
    user = request.user
    friend_username = request.data.get("friend_username")
    
    try:
        friend = Player.objects.get(username=friend_username)
        if friend == user:
            return Response({"error": "Vous ne pouvez pas vous ajouter vous-même en ami."}, status=status.HTTP_400_BAD_REQUEST)
        
        user.add_friend(friend)
        return Response({"message": f"{friend_username} a été ajouté à votre liste d'amis."}, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return Response({"error": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_friend(request):
    """Supprime un ami de la liste d'amis d'un joueur"""
    user = request.user
    friend_username = request.data.get("friend_username")
    
    try:
        friend = Player.objects.get(username=friend_username)
        user.remove_friend(friend)
        return Response({"message": f"{friend_username} a été retiré de votre liste d'amis."}, status=status.HTTP_200_OK)
    except Player.DoesNotExist:
        return Response({"error": "Utilisateur non trouvé."}, status=status.HTTP_404_NOT_FOUND)



@swagger_auto_schema(
    method='get',
    operation_description="Retourne les 9 meilleurs joueurs avec le plus grand nombre de victoires.",
    responses={
        200: openapi.Response(
            description="Liste des meilleurs joueurs",
            examples={
                "application/json": [
                    {"id": "1", "username": "Player1", "nb_game_win": 100},
                    {"id": "2", "username": "Player2", "nb_game_win": 95}
                ]
            }
        ),
        500: "Erreur interne du serveur"
    }
)
@api_view(["GET"])
@permission_classes([AllowAny])
def leaderboard(request):
    """Retourne les 9 meilleurs joueurs avec le plus grand nombre de victoires."""
    try:
        top_players = Player.objects.order_by('-nb_game_win')[:9]  # Trier par nb_game_win décroissant
        serializer = PlayerLead(top_players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


def get_online_users(request):
    online_users = Player.objects.filter(is_online=True).values("username", "email")
    return JsonResponse(list(online_users), safe=False)


def victories_per_day(request, username):
    """
    Calcule le pourcentage de victoires d'un joueur.
    """
    try:
        player = Player.objects.get(username=username)

        # Vérifier si le joueur a joué des parties
        if player.nb_game_play == 0:
            return JsonResponse({"win_percentage": 0}, safe=False)

        # Calculer le pourcentage
        percentage = (player.nb_game_win / player.nb_game_play) * 100

        return JsonResponse({"win_percentage": round(percentage, 2)}, safe=False)

    except Player.DoesNotExist:
        return JsonResponse({"error": "Player not found"}, status=404)

@api_view(["POST"])
def record_match_result(request):
    """
    Enregistre le résultat d'un match de Pong et met à jour les statistiques des joueurs.
    """
    data = request.data

    player1_username = data.get("player1")
    player2_username = data.get("player2")
    winner_username = data.get("winner")  # "player1" ou "player2"
    score = data.get("score")  # { "player1": 10, "player2": 7 }

    if not player1_username or not player2_username or not winner_username or not score:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        player1 = Player.objects.get(username=player1_username)
        player2 = Player.objects.get(username=player2_username)

        # Créer un match
        match = Match.objects.create(
            id=uuid.uuid4(),
            player1=player1.username,
            player2=player2.username,
            status="finished"
        )

        # Déterminer le gagnant et mettre à jour les stats
        if winner_username == player1.username:
            winner = player1
        elif winner_username == player2.username:
            winner = player2
        else:
            return Response({"error": "Winner must be either player1 or player2"}, status=status.HTTP_400_BAD_REQUEST)

        # Mettre à jour les statistiques des joueurs
        player1.nb_game_play += 1
        player2.nb_game_play += 1

        if winner == player1:
            player1.nb_game_win += 1
        else:
            player2.nb_game_win += 1

        # Ajouter l'historique du match dans les jeux des joueurs
        match_id = str(match.id)
        match_data = {
            "date": now().strftime("%Y-%m-%d %H:%M:%S"),
            "player1": player1.username,
            "player2": player2.username,
            "winner": winner.username,
            "score": score
        }

        # Ajouter l'historique au joueur 1
        if match_id not in player1.games_history:
            player1.games_history[match_id] = match_data

        # Ajouter l'historique au joueur 2
        if match_id not in player2.games_history:
            player2.games_history[match_id] = match_data

        # Sauvegarder les modifications
        player1.save()
        player2.save()

        return Response({"message": "Match recorded successfully!", "match_id": match_id}, status=status.HTTP_201_CREATED)

    except Player.DoesNotExist:
        return Response({"error": "One or both players not found"}, status=status.HTTP_404_NOT_FOUND)