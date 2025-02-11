import json
import asyncio
import sys

from .Values import *
from .Ball import Ball
from .Paddles import Paddle

from channels.layers import get_channel_layer
from channels.db import database_sync_to_async
from myapp.models import Match

class Player:
	def __init__(self, side):
		self.paddle = Paddle(side)
		self.score = 0
		self.score_bo = 0

@database_sync_to_async
def get_match(match_id):
	try:
		match = Match.objects.get(id=match_id)
		print("Match ", match.id, "found! (PongGame)\n", file=sys.stderr)
	except Match.DoesNotExist:
		match = None
		print("Match ", match_id, "not found, yet. (PongGame)\n", file=sys.stderr)
	return match

class PongGame():
	def __init__(self, match_id, difficulty):
		self.player1 = Player('left')
		self.player2 = Player('right')
		self.status = 'playing'
		self.round_nb = 1
		self.difficulty = difficulty
		self.ball = Ball(self.difficulty)
		self.channel_group = "match_" + str(match_id)
		self.match_id = match_id

		self.start_counter = 0

	async def game_starter(self, channel_layer):
		self.channel_layer = channel_layer
		self.start_counter += 1
		if self.start_counter == 2:
			print("Game is starting, have fun!", file=sys.stderr)
			await self.play()

	async def play(self):
		while self.status == 'playing':
			self.player1.paddle.move()
			self.player2.paddle.move()
			self.ball.move(self.player1.paddle, self.player2.paddle)

			self.check_score()
			if (self.player1.score_bo >= 2 or self.player2.score_bo >= 2):
				await self.end_game()
				self.status = 'over'
				break
			else:
				await self.send_state()
				await asyncio.sleep(1/TICK_RATE)

	async def action(self, action, player):
		if (player == 'spectator'):
			return
		if action == 'move_up':
			self.player1.paddle.move_up() if player == '1' else self.player2.paddle.move_up()
		elif action == 'move_down':
			self.player1.paddle.move_down() if player == '1' else self.player2.paddle.move_down()
		elif action == 'noo':
			self.player1.paddle.still() if player == '1' else self.player2.paddle.still()
		await self.send_state()

	async def send_state(self):
		await self.channel_layer.group_send(
			self.channel_group,({	'type': 'game.state',
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
			}))

	def reset_round(self):
		self.player1.paddle.reset()
		self.player1.score = 0
		self.player2.paddle.reset()
		self.player2.score = 0
		self.ball.reset(self.difficulty)
		self.send_state()

	def check_score(self):
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
			self.reset_round()
		
	async def end_game(self):
		self.status = 'over'
		self.winner = '1' 
		if (self.player2.score_bo > self.player1.score_bo):
			self.winner = '2'
		await self.channel_layer.group_send(
						self.channel_group,
			{	'type': 'game.over',
				'info': 'game_over',
				"status": 'over',
				"winner": self.winner,
				'score': {'1': self.player1.score_bo, '2': self.player2.score_bo}
			})