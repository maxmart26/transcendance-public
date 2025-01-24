import json
import random
import asyncio
import uuid

from channels.generic.websocket import AsyncWebsocketConsumer

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class Player:
	def __init__(self):
		self.id = str(uuid.uuid4()) #a remplacer par l'id dans la db
		self.color = '#ff79d1' #a remplacer par la color dans la db
		self.difficulty = 'medium' #a remplacer """"""


class PongGame(AsyncWebsocketConsumer):
	connected_players = {}
	async def connect(self):
		await self.accept()

		self.p1 = Paddle('left')
		self.p2 = Paddle('right')
		self.player_1 = Player()
		self.player_2 = Player()

		if (self.p1.free):
			self.connected_players()
		
		await()

		self.difficulty = 'medium'
		self.ball = Ball(self.difficulty)

		self.game_over = False
		self.round_nb = 1
		await self.send_state()
		asyncio.create_task(self.play())

	async def disconnect(self):
		pass

	async def receive(self, text_data):
		action_json = json.loads(text_data)
		action = action_json.get('action')
		#remplacer tout le systeme de player id
		player_id = action_json.get('player_id')
		print("data: \n	action: %s\n id: %s", action, player_id)

		if action == 'move_up':
			if (player_id == '1'):
				self.p1.move_up()
			else:
				self.p2.move_up()
		elif action == 'move_down':
			if (player_id == '1'):
				self.p1.move_down()
			else:
				self.p2.move_down()
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
			self.p2.move()
			self.ball.wall_bounce()
			self.ball.paddle_bounce(self.p1)
			self.ball.paddle_bounce(self.p2)
			
			await self.check_score()
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)