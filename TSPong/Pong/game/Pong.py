import json
import random
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class PongGame(AsyncWebsocketConsumer):
	async def connect(self):
		#a determiner selon le choix du joueur
		self.difficulty = 'easy'
		self.ball = Ball('easy')
		#remplacer '1' et '2' par les ID des joueurs
		self.p1 = Paddle('left')
		self.p2 = Paddle('right')
		self.game_over = False
		self.round_nb = 1
		await self.accept()
		await self.send_state()
		asyncio.create_task(self.play())

	async def disconnect(self):
		pass

	async def receive(self, text_data):
		action_json = json.loads(text_data)
		action = action_json.get('action')
		#player_id = action_json.get('player_id')

		if action == 'move_up':
			self.p1.move_up()
		elif action == 'move_down':
			self.p1.move_down()
		elif action == 'noo':
			self.p1.still()
		await self.send_state()

	async def send_state(self):
		state = {"ball": {"x": self.ball.x, "y": self.ball.y},
		   		"player1_y": self.p1.y,
				"player2_y": self.p2.y,
				"p1_score": self.p1.score,
				"p2_score": self.p2.score,
				"round_nb": self.round_nb}
		await self.send(json.dumps(state))

	async def reset_round(self):
		self.p1.reset()
		self.p2.reset()
		self.ball.reset(self.difficulty)
		await self.send_state()

	async def check_score(self):
		if self.ball.x <= 0:
			self.p2.score += 1
			self.ball.reset(self.difficulty)
		elif self.ball.x + BALL_SIZE >= FIELD_WIDTH:
			self.p1.score += 1
			self.ball.reset(self.difficulty)
		if (self.p1.score >= 7 or self.p2.score >=7):
			self.round_nb += 1
			await self.reset_round()

	async def play(self):
		while not self.game_over:

			self.ball.move()
			self.p1.move()
			self.ball.wall_bounce()
			self.ball.paddle_bounce(self.p1.x, self.p1.y)
			self.ball.paddle_bounce(self.p2.x, self.p2.y)
			
			await self.check_score()
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)