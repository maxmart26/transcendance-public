import json
import asyncio
import sys

from channels.generic.websocket import AsyncWebsocketConsumer

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class Player:
	def __init__(self, name, id, color, difficulty, nb):
		self.id = id #a remplacer par l'id dans la db
		#self.name, self.color, self.difficulty = getPlayerinfo(self.id)
		self.name = name
		self.color = color #a remplacer par la color dans la db
		self.difficulty = difficulty #a remplacer """"""
		self.nb = nb
		self.paddle = None

class Opponent:
	def __init__(self, name, id, color):
		self.id = id #a remplacer par l'id dans la db
		#self.name, self.color, self.difficulty = getPlayerinfo(self.id)
		self.name = name
		self.color = color #a remplacer par la color dans la db
		self.paddle = None

class PongGame(AsyncWebsocketConsumer):
	async def connect(self):
		self.match_id = self.scope['url_route']['kwargs']['match_id']
		self.group_name = f'game_{self.match_id}'

		await self.accept()
		await self.channel_layer.group_add(
			self.group_name,
			self.channel_name
		)
		
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
			self.player = Player("Player", self.id, '#52e3e2', 'medium', data_json.get('player_nb'))
			self.status = data_json.get('status')
			print("Game init:\n", file=sys.stderr)
			if self.player.nb == '1':
				self.player.paddle = Paddle('left')
				print("Host: ", self.player.id, "\n", file=sys.stderr)
			else:
				self.player.paddle = Paddle('right')
				print("Joiner: ", self.player.id, "\n", file=sys.stderr)

			await self.channel_layer.group_send(
				self.group_name,
				{
				'type': 'game.info',
				'info': 'game_info',
				'player_nb' : self.player.nb,
				'player_id' : self.player.id,
				'player_name' : self.player.name,
				'player_color' : self.player.color,
				'difficulty': self.player.difficulty
				})
			
		elif data_json.get('type') == 'action':
			action = data_json.get('action')
			print(self.player.nb, "Received:\naction: ", action, "by player: ", data_json.get('player'), file=sys.stderr)
			if (self.player.nb == '2'):
				await self.channel_layer.group_send(
							self.group_name,
				{	'type': 'player.action',
					'info': 'action',
					"action": action,
					"player_nb": self.player.nb
				})
			else:
				if action == 'move_up':
						self.player.paddle.move_up() if data_json.get('player_nb') == self.player.nb else self.opponent.paddle.move_up()
				elif action == 'move_down':
						self.player.paddle.move_down() if data_json.get('player_nb') == self.player.nb else self.opponent.paddle.move_down()
				elif action == 'noo':
						self.player.paddle.still() if data_json.get('player_nb') == self.player.nb else self.opponent.paddle.still()
				await self.send_state()

	async def send_state(self):
		await self.channel_layer.group_send(
						self.group_name,
			{	'type': 'game.state',
				'info': 'game_state',
				"ball": {"x": self.ball.x, "y": self.ball.y},
		   		"player1_y": self.player.paddle.y,
		   		"player2_y": self.opponent.paddle.y,
				"player1_score": self.player.paddle.score,
				"player2_score": self.opponent.paddle.score,
				"round_nb": self.round_nb,
				'status': self.status
			})
		
	async def game_state(self, event):
		await self.send(text_data=json.dumps({'type': event["info"],
											'ball': event["ball"],
											'player1_y': event["player1_y"],
											'player2_y': event["player2_y"],
											'player1_score': event["player1_score"],
											'player2_score': event["player2_score"],
											'round_nb': event["round_nb"],
											'status': event['status']}))
	
	async def game_info(self, event):
		print(self.player.nb, "Received game info from ", event["player_nb"], file=sys.stderr)
		#if (event["player_nb"] != self.player.nb):
		self.opponent = Opponent('Opponent', event["player_id"], '#e9234f')
		if (event["player_nb"] == '1'): self.opponent.paddle = Paddle('left') 
		else: self.opponent.paddle = Paddle('right')
		if self.player.nb == '1': self.difficulty = self.player.difficulty
		else: self.difficulty = event['difficulty']

		if (self.player.nb == '1' and self.player.id != self.opponent.id):
			print("Game start: (host)\n", file=sys.stderr)
			print("Player1: ", self.player.id, "\n", file=sys.stderr)
			print("Player2: ", self.opponent.id, "\n", file=sys.stderr)
			print("Difficulty: ", self.difficulty, "\n", file=sys.stderr)
			self.ball = Ball(self.difficulty)
			self.game_over = False
			self.round_nb = 1
			self.status = 'playing'
			asyncio.create_task(self.play())

		await self.send(text_data=json.dumps({'type': event["info"],
											'player_nb': self.player.nb,
											'player_id': self.player.id,
											'player_name': self.player.name,
											'player_color': self.player.color,
											'opp_id': self.opponent.id,
											'opp_name': self.opponent.name,
											'opp_color': self.opponent.color,
											'difficulty': self.difficulty}))

	async def player_action(self, event):
		if (self.player.nb == '1'):
			if event["action"] == 'move_up':
				self.player.paddle.move_up() if event["player_nb"] == self.player.nb else self.opponent.paddle.move_up()
			elif event["action"] == 'move_down':
				self.player.paddle.move_down() if event["player_nb"] == self.player.nb else self.opponent.paddle.move_down()
			elif event["action"] == 'noo':
				self.player.paddle.still() if event["player_nb"] == self.player.nb else self.opponent.paddle.still()
			await self.send_state()

	async def reset_round(self):
		self.player.paddle.reset()
		self.opponent.paddle.reset()
		self.ball.reset(self.difficulty)
		await self.send_state()

	async def check_score(self):
		if self.ball.x <= 0:
			self.opponent.paddle.score += 1
			self.ball.reset(self.difficulty)
		elif self.ball.x + BALL_SIZE >= FIELD_WIDTH:
			self.player.paddle.score += 1
			self.ball.reset(self.difficulty)

		if (self.player.paddle.score >= 7 or self.opponent.paddle.score >= 7):
			self.round_nb += 1
			await self.reset_round()

	async def play(self):
		while not self.game_over:

			self.ball.move()
			self.player.paddle.move()
			self.opponent.paddle.move()
			self.ball.wall_bounce()
			self.ball.paddle_bounce(self.player.paddle)
			self.ball.paddle_bounce(self.opponent.paddle)

			await self.check_score()
			if (self.round_nb >= 3):
				self.status = 'over'
			await self.send_state()
			await asyncio.sleep(1/TICK_RATE)