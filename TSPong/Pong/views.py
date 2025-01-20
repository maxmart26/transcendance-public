from django.shortcuts import render, HttpResponse

# Create your views here.
def queue():
	return HttpResponse("Looking for an opponent...")

def game():
	return HttpResponse("Game found, have fun!")