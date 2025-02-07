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

tourn_list = []
games = {}

def create_tourn_games(tournament):
    i = 0
    for match_id in tournament.games:
        game = Match.objects.create(id=match_id, difficulty='medium')
        i+=1
    print(i, " games created for tournament ", tournament.id, "\n", file=sys.stderr)

def tournament(request):
    user_id = request.COOKIES.get('user_id')
    global tourn_list

    if tourn_list:
        tournament = Tournament.objects.get(id=tourn_list[0])
        if len(tournament.players) < 4 and user_id not in tournament.players:
            tournament.players.append(user_id)
            if len(tournament.players) == 4:
                tournament.status = 'closed'
                tourn_list.remove(tournament.id)
    else:
        tourn_list.append(uuid.uuid4())
        tournament = Tournament.objects.create(id=tourn_list[0], status='open', players=[user_id], games=[str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4()), str(uuid.uuid4())])
        create_tourn_games(tournament)
    tournament.save()
    return redirect('init_tourn', tourn_id=tournament.id)

async def init_tourn(request, tourn_id):
    response = HttpResponse(status=204)
    await set_cookie(response, 'tourn_id', tourn_id)
    return response

def start_tourn(request):
    tourn_id = request.COOKIES.get('tourn_id')
    user_id = request.COOKIES.get('user_id')

    tournament = Tournament.objects.get(id=tourn_id)
    global games

    player1 = tournament.players[0]
    player2 = tournament.players[1]
    player3 = tournament.players[2]
    player4 = tournament.players[3]

    # tempo, tournois a 2 joueurs:
    # game = Match.objects.get(id=tournament.games[0])
    # if not game.player1 or not game.player2:
    #     game.player1 = player1
    #     game.player2 = player2
    #     game.save()

    # if str(game.id) not in games:
    #     games[str(game.id)] = PongGame(game.id, 'medium')

    # if (user_id == player1 or user_id == player2):
    #     return redirect('game', match_id=game.id)

    game = Match.objects.get(id=tournament.games[0])
    if not game.player1 or not game.player2:
        game.player1 = player1
        game.player2 = player3
        game.save()

    if str(game.id) not in games:
        games[str(game.id)] = PongGame(game.id, 'medium')

    if (user_id == player1 or user_id == player3):
        return redirect('game', match_id=game.id)

    game = Match.objects.get(id=tournament.games[1])
    if not game.player1 or not game.player2:
        game.player1 = player2
        game.player2 = player4
        game.save()

    if str(game.id) not in games:
        games[str(game.id)] = PongGame(game.id, 'medium')

    if (user_id == player2 or user_id == player4):
        return redirect('game', match_id=game.id)
    
waiting_games = {'easy': {}, 'medium': {}, 'hard': {}}

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

def search_player(request):
    query = request.GET.get('q', '').strip().lower()
    if not query:
        return JsonResponse([], safe=False)

    players = Player.objects.filter(username__icontains=query)[:10]
    results = [{"id": p.id, "username": p.username} for p in players]

    return JsonResponse(results, safe=False)

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



