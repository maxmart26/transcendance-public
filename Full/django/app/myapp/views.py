from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import Player
from .permissions import IsAdminOrReadOnly
from .serializers import PlayerSerializer
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from .models import Match
from .game.Pong import PongGame

import sys
import uuid
import random

@api_view(["GET"])
@permission_classes([IsAdminOrReadOnly])
def get_all_players(request):
    """
    Endpoint to retrieve all players (admin users only).
    """
    try:
        players = Player.objects.all()
        serializer = PlayerSerializer(players, many=True)
        return Response(serializer.data, status=200)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

def homepage(request):
    return render(request, 'index.html')

waiting_games = {}
games = {}

def create_game(request, difficulty):
    user_id = request.COOKIES.get('user_id')

    if waiting_games:
        match_id = random.choice(list(waiting_games))
        game = Match(id=match_id, player1=waiting_games[match_id], player2=user_id)
        games[game] = PongGame(match_id, difficulty)
        waiting_games.pop(match_id)
    else:
        match_id = str(uuid.uuid4())
        waiting_games[match_id] = user_id
    return redirect(f'/game/{difficulty}/{match_id}/')
    
def game(request, difficulty, match_id):
    return render(request, 'game-page.html', {'match_id': match_id, 'difficulty': difficulty})

from .serializers import PlayerAll

class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerAll(players, many=True)
        return Response(serializer.data)
