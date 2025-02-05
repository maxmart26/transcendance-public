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
from asgiref.sync import sync_to_async

import sys
import uuid
import random
import asyncio

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

waiting_games = {'easy': {}, 'medium': {}, 'hard': {}}
games = {}

def create_game(request, difficulty):
    user_id = request.COOKIES.get('user_id')
    if not user_id:
        try:
            player = Player.objects.get(username='Unknown')
        except:
            player = Player.objects.create(id=uuid.uuid4(), username='Unknown')
        user_id = player.id

    if waiting_games[difficulty]:
        match_id = random.choice(list(waiting_games[difficulty]))
        game = Match.objects.create(id=match_id, player1=waiting_games[difficulty][match_id], player2=user_id, difficulty=difficulty)
        waiting_games[difficulty].pop(match_id)
        games[str(game.id)] = PongGame(match_id, difficulty)
    else:
        match_id = uuid.uuid4()
        waiting_games[difficulty][match_id] = user_id
    return redirect('game', match_id=match_id)

def search_player(request):
    query = request.GET.get('q', '').strip().lower()
    if not query:
        return JsonResponse([], safe=False)

    players = Player.objects.filter(username__icontains=query)[:10]
    results = [{"id": p.id, "username": p.username} for p in players]

    return JsonResponse(results, safe=False)

@sync_to_async
def set_matchid_cookie(response, match_id):
    response.set_cookie(
    key='match_id',
    value=str(match_id),
    httponly=False,     
    secure=True,
    samesite='None',
    max_age=3600,
    path='/'
    )

async def game(request, match_id):
    response = HttpResponse(status=204)
    await set_matchid_cookie(response, match_id)
    return response

from .serializers import PlayerAll

class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerAll(players, many=True)
        return Response(serializer.data)



