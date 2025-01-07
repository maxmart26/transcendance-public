from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from myapp.models import Player
from django.contrib.auth.hashers import make_password


# route pour add un player

@swagger_auto_schema(
    method="post",
    operation_description="Add a new player with username, password, and email.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='The username of the player'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='The password of the player'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='The email of the player'),
            'image_avatar': openapi.Schema(type=openapi.TYPE_STRING, format='binary', description='The new avatar image of the player'),

        },
        required=['username', 'password', 'email'],
    ),
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING),
                'player_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            }
        ),
        400: "Bad Request: Missing fields.",
        500: "Internal Server Error",
    },
)
@api_view(["POST"])
@permission_classes([AllowAny])
def add_player(request):
    try:
        # Charger les données du POST
        data = request.data
        username = data.get("username")
        password = data.get("password")
        email = data.get("email")
        image_avatar = data.get("image_avatar")


        # Vérifier les champs obligatoires
        if not username or not password or not email or not image_avatar:
            return Response({"error": "All fields (username, password, email, image_avatar) are required."}, status=status.HTTP_400_BAD_REQUEST)

        hashed_password = make_password(password)

        # Créer un joueur
        player = Player.objects.create(username=username, password=hashed_password, email=email)
        return Response({"message": "Player added successfully!", "player_id": player.id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# route pour modif un player

@swagger_auto_schema(
    method="put",
    operation_description="Update or add fields for a player.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'player_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='The ID of the player to update (required for update)'),
            'username': openapi.Schema(type=openapi.TYPE_STRING, description='The new username of the player'),
            'password': openapi.Schema(type=openapi.TYPE_STRING, description='The new password of the player'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, description='The new email of the player'),
            'image_avatar': openapi.Schema(type=openapi.TYPE_STRING, format='binary', description='The new avatar image of the player'),
            'nb_game_play': openapi.Schema(type=openapi.TYPE_INTEGER, description='The new number of games played'),
            'nb_game_win': openapi.Schema(type=openapi.TYPE_INTEGER, description='The new number of games won'),
        },
        required=[],
    ),
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'message': openapi.Schema(type=openapi.TYPE_STRING),
                'player': openapi.Schema(type=openapi.TYPE_OBJECT),
            },
        ),
        404: "Player not found.",
        400: "Invalid request.",
    },
)
@api_view(["PUT"])
@permission_classes([AllowAny])
def update_or_add_player(request):
    try:
        data = request.data

        # Récupérer l'ID du joueur pour modification
        player_id = data.get("player_id")

        # Vérifier si c'est une mise à jour ou une création
        if player_id:
            try:
                player = Player.objects.get(id=player_id)
            except Player.DoesNotExist:
                return Response({"error": "Player not found."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "need player_id."}, status=status.HTTP_404_NOT_FOUND)

        # Mettre à jour les champs fournis
        if "username" in data:
            player.username = data["username"]
        if "password" in data:
            player.password = make_password(data["password"])
        if "email" in data:
            player.email = data["email"]
        if "image_avatar" in request.FILES:
            player.image_avatar = request.FILES["image_avatar"]
        if "nb_game_play" in data:
            player.nb_game_play = data["nb_game_play"]
        if "nb_game_win" in data:
            player.nb_game_win = data["nb_game_win"]

        # Sauvegarder le joueur
        player.save()

        # Retourner la réponse
        return Response(
            {
                "message": "Player updated successfully!" if player_id else "Player created successfully!",
                "player": {
                    "id": player.id,
                    "username": player.username,
                    "email": player.email,
                    "nb_game_play": player.nb_game_play,
                    "nb_game_win": player.nb_game_win,
                },
            },
            status=status.HTTP_200_OK,
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)