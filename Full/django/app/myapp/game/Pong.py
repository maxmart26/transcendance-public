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
		self.match_id = self.scope['url_route']['kwargs']['match_id']
		self.group_name = f'game_{self.match_id}'

		await self.accept()
		await self.channel_layer.group_add(
			self.group_name,
			self.channel_name
		)

		self.paddle = None
		
	async def disconnect(self):
		await self.channel_layer.group_discard(
			self.match_group_name,
			self.channel_name
		)

	async def receive(self, text_data):
		data_json = json.loads(text_data)

		if data_json.get('type') == 'game_init':
			self.id = data_json.get('player_id')
			#A modif, recup les infos dans la db
			self.player = Player("Player", self.id, '#ff79d1', 'medium')
			self.nb_player = 1
			self.difficulty = self.player.difficulty
			self.ball = Ball(self.difficulty)
			self.game_over = False
			self.round_nb = 1
			self.status = data_json.get('status')
			if self.status == 'playing':
				await self.send_state()
				asyncio.create_task(self.play())
			else:
				await self.channel_layer.group_send(
					self.group_name,
					{
					'type': 'game.info',
					'info': 'game_info',
					'player_nb' : self.nb_player,
					'player_id' : self.player.id,
					'player_name' : self.player.name,
					'player_color' : self.player.color,
					'difficulty': self.player.difficulty
					})
		
		elif data_json.get('type') == 'check_side':
			if data_json.get('left') == self.id:
				self.paddle = Paddle('left')
			else:
				self.paddle = Paddle('right')
			await self.send_state()

		elif data_json.get('type') == 'game_state':
			if data_json.get('round_nb') > self.round_nb:
				await self.reset_round()

		elif data_json.get('type') == 'action':
			action = data_json.get('action')

			if action == 'move_up':
					self.paddle.move_up()
			elif action == 'move_down':
					self.paddle.move_down()
			elif action == 'noo':
					self.paddle.still()
			await self.send_state()

	async def send_state(self):
		await self.channel_layer.group_send(
						self.group_name,
			{	'type': 'game.state',
				'info': 'game_state',
				"ball": {"x": self.ball.x, "y": self.ball.y},
		   		"player_y": self.paddle.y,
				"player_id": self.player.id,
				"player_score": self.paddle.score,
				"round_nb": self.round_nb,
				'status': self.status
			})
		
	async def game_state(self, event):
		await self.send(text_data=json.dumps({'type': event["info"],
											'ball': event["ball"],
											'player_y': event["player_y"],
											'player_id': event["player_id"],
											'player_score': event["player_score"],
											'round_nb': event["round_nb"],
											'status': event['status']}))
	
	async def game_info(self, event):
		await self.send(text_data=json.dumps({'type': event["info"],
											'player_nb': event["player_nb"],
											'player_id': event["player_id"],
											'player_name': event["player_name"],
											'player_color': event["player_color"],
											'difficulty': event['difficulty']}))

	async def reset_round(self):
		self.player.reset()
		self.ball.reset(self.difficulty)
		await self.send_state()

	async def check_score(self):
		if self.paddle.y < FIELD_WIDTH / 2 and self.ball.x <= 0:
			self.player.score += 1
			self.ball.reset(self.difficulty)
		elif self.paddle.y > FIELD_WIDTH / 2 and self.ball.x + BALL_SIZE >= FIELD_WIDTH:
			self.player.score += 1
			self.ball.reset(self.difficulty)
		if (self.player.score >= 7):
			self.round_nb += 1
			await self.reset_round()

	async def play(self):
		while not self.game_over:

			self.ball.move()
			self.paddle.move()
			self.ball.wall_bounce()
			self.ball.paddle_bounce(self.paddle)

			await self.check_score()
			if (self.nb_round >= 3):
				self.status = 'over'
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)