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

import uuid

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

def create_game(request):
    player_id = str(uuid.uuid4()) #A remplacer par son id dans la db
    if waiting_games:
        match_id, waiting_player = waiting_games.popitem()
        return redirect(f'/game/{match_id}/?player1={waiting_player}&player2={player_id}')
    else:
        match_id = str(uuid.uuid4())
        waiting_games[match_id] = player_id
        return redirect(f'/game/{match_id}/?player1={player_id}')
        #A remplacer par un beau script JS qui cherche un joueur
        #return render(request, 'index.html', {'status': 'waiting'})
        #On envoie le status au .html qui pourra afficher la bonne page avec un if
    
def game(request, match_id):
    player1 = request.GET.get('player1')
    player2 = request.GET.get('player2')

    if player1 and player2:
        return render(request, 'game-page.html', {'status': 'start_game', 'match_id': match_id, 'player1_id': player1, 'player2_id': player2})
        #return render(request, 'index.html', {'status': 'play', 'match_id': match_id, 'player1_id': player1, 'player2_id': player2})
    elif player1:
        return render(request, 'game-page.html', {'status': 'waiting', 'match_id': match_id, 'player1_id': player1})
        #return render(request, 'index.html', {'status': 'play', 'match_id': match_id, 'player1_id': player1})
    else:
        return Http404("Game not found.")

from .serializers import PlayerAll

class PlayerListView(APIView):
    def get(self, request):
        players = Player.objects.all()
        serializer = PlayerAll(players, many=True)
        return Response(serializer.data)
