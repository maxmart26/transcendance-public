import json
import random
import asyncio

from Values import *
from Ball import Ball
from Paddles import Paddle

class PongGame:
	def __init__(self, difficulty):
		ball = Ball('easy')
		player_1 = Paddle('left')
		player_2 = Paddle('right')
		game_over = False

	async def send_state(self):
		state = {"ball": {"x": self.ball.x, "y": self.ball.y}}
		await self.send(json.dumps(state))

	def play(self):
		while not self.game_over:
			self.ball.move()
			self.ball.wall_bounce()
			self.send_state()