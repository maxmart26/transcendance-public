from django.db import models

# Create your models here.
class Match:
	class State(models.TextChoices):
		WAITING = 'waiting', 'Waiting for players'
		READY = 'ready', 'Match ready'
		IN_PROGRESS = 'in_progress', 'Match in progress'
		FINISHED = 'finished', 'Match finished'
	
	class Difficulty(models.TextChoices):
		EASY = 'easy', 'Easy'
		MEDIUM = 'medium', 'Medium'
		HARD = 'hard', 'Hard'
		