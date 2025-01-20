from django.shortcuts import render, HttpResponse
from game import Pong

# Create your views here.
def search_match(request):
	"""
	Check the database of created matches currently waiting for opponents
	if database is empty, creates a new match
	"""
	return HttpResponse("Looking for an opponent...")

def join_match(request, game_id):
	"""
	Match is found, player joins it
	Match is being deleted from the database of created matches currently waiting for opponents
	"""

def DEBUGgame(request):
	Pong.PongGame()
	return render(request, "game-page.html")
