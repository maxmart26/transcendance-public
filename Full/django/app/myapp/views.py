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
from .models import Match, Player, Tournament
from .game.Pong import PongGame
from asgiref.sync import sync_to_async

import sys
import json
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

tourn_id = None

def tournament(request):
    user_id = request.COOKIES.get('user_id')
    global tourn_id

    if (tourn_id):
        tournament = Tournament.objects.get(id=tourn_id)
        if len(tournament.players) == 4:
            tournament.status = 'closed'
            tourn_id = None
        elif len(tournament.players) < 4 and user_id not in tournament.players:
            tournament.players.append(user_id)
    else:
        tourn_id = uuid.uuid4()
        tournament = Tournament.objects.create(id=tourn_id, status='open', players=[user_id], games=[])
    tournament.save()
    print("(view) Tournament ", tournament.id, "\nPlayers list: ", tournament.players, "\n", file=sys.stderr)
    return redirect('init_tourn', tourn_id=tournament.id)

async def init_tourn(request, tourn_id):
    response = HttpResponse(status=204)
    await set_cookie(response, 'tourn_id', tourn_id)
    return response

waiting_games = {'easy': {}, 'medium': {}, 'hard': {}}
games = {}

def create_game(request, difficulty):

    global waiting_games
    global games

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

@sync_to_async
def set_cookie(response, name, match_id):
    response.set_cookie(
    key=name,
    value=str(match_id),
    httponly=False,     
    secure=True,
    samesite='None',
    max_age=3600,
    path='/'
    )

async def game(request, match_id):
    response = HttpResponse(status=204)
    await set_cookie(response, 'match_id', match_id)
    return response

from .serializers import PlayerAll

class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerAll(players, many=True)
        return Response(serializer.data)
