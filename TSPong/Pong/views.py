from django.shortcuts import render, HttpResponse

# Create your views here.
def index(request):
	return render(request, "Pong/index.html")

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
	return render(request, "Pong/game-page.html")
