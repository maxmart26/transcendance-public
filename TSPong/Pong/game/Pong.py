import json
import random
import asyncio

from Values import *
from Ball import Ball
from Paddles import Paddle

def PongGame():
	ball = Ball('easy')
	player_1 = Paddle('left')
	player_2 = Paddle('right')
	game_over = False

	while not game_over:
		ball.move()
		ball.wall_bounce()
		#envoyer les donnees de la balle au .js

PongGame()