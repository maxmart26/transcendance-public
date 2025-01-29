import json
import asyncio
import sys

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

class Player:
	def __init__(self, side):
		self.paddle = Paddle(side)
		self.score = 0
		self.score_bo = 0

class PongGame():
	def __init__(self, difficulty):
		self.player1 = Player('left')
		self.player2 = Player('right')
		self.ball = Ball(difficulty)
		self.status = 'playing'
		self.round_nb = 1
		self.difficulty = difficulty

	async def play(self):
		while self.status != 'over':

			self.player1.paddle.move()
			self.player2.paddle.move()
			self.ball.move(self.player1.paddle, self.player2.paddle)

			await self.check_score()
			if (self.player1.score >= 2 or self.player2.score >= 2):
				await self.end_game()
			else:
				await self.send_state()
				await asyncio.sleep(1/TICK_RATE)

	async def receive(self, text_data):
		data_json = json.loads(text_data)

		if data_json.get('type') == 'action':
			action = data_json.get('action')
			if action == 'move_up':
				self.player1.paddle.move_up() if data_json.get('player_nb' == '1') else self.player2.paddle.move_up()
			elif action == 'move_down':
				self.player1.paddle.move_down() if data_json.get('player_nb' == '1') else self.player2.paddle.move_down()
			elif action == 'noo':
				self.player1.paddle.still() if data_json.get('player_nb' == '1') else self.player2.still()
			await self.send_state()

	async def send_state(self):
		await self.channel_layer.group_send(
						self.group_name,
			{	'type': 'game.state',
				'info': 'game_state',
				"ball": {"x": self.ball.x, "y": self.ball.y},
		   		"player1_y": self.player1.paddle.y,
		   		"player2_y": self.player2.paddle.y,
				"player1_score": self.player1.score,
				"player1_scorebo": self.player1.score_bo,
				"player2_score": self.player2.score,
				"player2_scorebo": self.player2.score_bo,
				"round_nb": self.round_nb,
				'status': self.status
			})

	async def reset_round(self):
		self.player1.paddle.reset()
		self.player2.paddle.reset()
		self.ball.reset(self.difficulty)
		await self.send_state()

	async def check_score(self):
		if self.ball.x <= 0:
			self.player2.score += 1
			self.ball.reset(self.difficulty)
		elif self.ball.x + BALL_SIZE >= FIELD_WIDTH:
			self.player1.score += 1
			self.ball.reset(self.difficulty)

		if (self.player1.score >= 7 or self.player2.score >= 7):
			self.round_nb += 1
			if (self.player1.score >= 7):
				self.player1.score_bo += 1
			if (self.player2.score >= 7):
				self.player2.score_bo += 1
			await self.reset_round()
		
	async def end_game(self):
		self.status = 'over'
		self.winner = self.player.name
		if (self.player2.score > self.player.score):
			self.winner = self.player2.name
		await self.channel_layer.group_send(
						self.group_name,
			{	'type': 'game.over',
				'info': 'game_over',
				"status": 'over',
				"winner": self.winner,
			})
		
	async def game_over(self, event):
		print(self.player.nb, " sent game over.", file=sys.stderr)
		await self.send(text_data=json.dumps({'type': event["info"],
											'status': event['status'],
											'winner': event['winner']}))
		await self.disconnect()
