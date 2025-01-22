import json
import random
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class PongGame(AsyncWebsocketConsumer):
	async def connect(self):
		self.ball = Ball('easy')
		#remplacer '1' et '2' par les ID des joueurs
		self.players = {'1': Paddle('left'), '2': Paddle('right')}
		self.game_over = False
		self.game_state = {"ball": {"x": self.ball.x, "y": self.ball.y}}
		await self.accept()
		await self.send_state()
		asyncio.create_task(self.play())

	async def disconnect(self):
		pass

	async def receveive(self, data):
		action_json = json.loads(data)
		action = action_json.get('action')
		player_id = action_json.get('player_id')

		if action == 'move_up':
			self.players[player_id].move_up()
		elif action == 'move_down':
			self.players[player_id].move_down()
		await self.send_state()

	async def send_state(self):
		state = {"ball": {"x": self.ball.x, "y": self.ball.y}}
		await self.send(json.dumps(state))

	async def play(self):
		while not self.game_over:
			self.ball.move()
			self.ball.wall_bounce()
			# self.ball.paddle_bounce(self.players['1'].x, self.players['1'].y)
			# self.ball.paddle_bounce(self.players['2'].x, self.players['2'].y)
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)