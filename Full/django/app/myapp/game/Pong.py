import json
import random
import asyncio
import uuid

from channels.generic.websocket import AsyncWebsocketConsumer

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class Player:
	def __init__(self, name, id, color, difficulty):
		self.name = name
		self.id = id #a remplacer par l'id dans la db
		self.color = color #a remplacer par la color dans la db
		self.difficulty = difficulty #a remplacer """"""


class PongGame(AsyncWebsocketConsumer):
	async def connect(self):
		self.room_id = self.scope['url_route']['kwargs']['room_id']
		self.room_group_name = f'game_{self.room_id}'
		self.player1 = self.scope['query_string'].decode().split('&')[0].split('=')[1]
		self.player2 = self.scope['query_string'].decode().split('&')[1].split('=')[1]

		await self.accept()
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)

		self.p1 = Player("Player1", str(uuid.uuid4()), '#ff79d1', 'medium') #A modif: recup les infos via la db
		self.p2 = Player("Player2", str(uuid.uuid4()), '#ff79d1', 'medium') #same
		self.players[self.p1.id] = Paddle('left')
		self.players[self.p2.id] = Paddle('right')

		await self.send(json.dump({
				'type': 'game_info',
				'player_id' : self.p1.id,
				'player_name' : self.p1.name,
				'player_color' : self.p1.color,
				'opp_color' : self.p2.color,
				'opp_name' : self.p2.name,
				'difficulty': self.p1.difficulty
			}))
		
		self.difficulty = self.p1.difficulty
		self.ball = Ball(self.difficulty)
		self.game_over = False
		self.round_nb = 1

		await self.send_state()
		asyncio.create_task(self.play())

	async def disconnect(self):
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		action_json = json.loads(text_data)
		action = action_json.get('action')
		player_id = action_json.get('player_id')

		if action == 'move_up':
				self.players[player_id].move_up()
		elif action == 'move_down':
				self.players[player_id].move_down()
		elif action == 'noo':
				self.players[player_id].still()
		await self.send_state()

	async def send_state(self):
		state = {'type': 'game_state',
				"ball": {"x": self.ball.x, "y": self.ball.y},
		   		"player1_y": self.p1.y,
				"player2_y": self.p2.y,
				"p1_score": self.p1.score,
				"p2_score": self.p2.score,
				"round_nb": self.round_nb}
		await self.channel_layer.group_send(json.dumps(state))

	async def reset_round(self):
		self.players[self.p1.id].reset()
		self.players[self.p1.id].reset()
		self.ball.reset(self.difficulty)
		await self.send_state()

	async def check_score(self):
		if self.ball.x <= 0:
			self.players[self.p2.id].score += 1
			self.ball.reset(self.difficulty)
		elif self.ball.x + BALL_SIZE >= FIELD_WIDTH:
			self.players[self.p1.id].score += 1
			self.ball.reset(self.difficulty)
		if (self.players[self.p1.id].score >= 7 or self.players[self.p2.id].score >=7):
			self.round_nb += 1
			await self.reset_round()

	async def play(self):
		while not self.game_over:

			self.ball.move()
			self.p1.move()
			self.p2.move()
			self.ball.wall_bounce()
			self.ball.paddle_bounce(self.players[self.p1.id])
			self.ball.paddle_bounce(self.players[self.p2.id])
			
			await self.check_score()
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)