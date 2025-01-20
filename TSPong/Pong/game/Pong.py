import json
import random
import asyncio

from Values import *
from Ball import Ball
from Paddles import Paddle

def PongGame():
	ball = Ball()
	player_1 = Paddle('left')
	player_2 = Paddle('right')