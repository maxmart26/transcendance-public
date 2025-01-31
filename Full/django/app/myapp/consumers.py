import json
import sys
import asyncio
import uuid

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match, Player
from .views import games

class MatchManager(AsyncWebsocketConsumer):
	async def connect(self):
		self.match_id = self.scope['url_route']['kwargs']['match_id']
		await self.channel_layer.group_add(f"match_{self.match_id}", self.channel_name)
		await self.accept()

		self.match = await self.get_match(self.match_id)
		if (self.match):
			await self.channel_layer.group_send(
			f"match_{self.match.id}",
			{	'type': 'match.init',
				'match_id': self.match.id
			})

	async def disconnect(self):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)

		type = info_json.get('type')
		
		if (type == 'match_start'):
			self.game = games[str(self.match.id)]
			self.match.status = 'playing'
			# if self.match.status == 'waiting': self.match.status = 'starting'
			# elif self.match.status == 'starting': self.match.status == 'playing'
			print("match is ", self.match.status, "\n", file=sys.stderr)
			asyncio.create_task(self.game.game_starter(self.channel_layer))

		elif type == 'action':
			await self.game.action(info_json.get('action'), info_json.get('player_nb'))

#===========================================================

	async def match_init(self, event):
		self.match = await self.get_match(event['match_id'])
		self.player1 = await self.get_player(self.match.player1)
		self.player2 = await self.get_player(self.match.player2)

		await self.channel_layer.group_send(
		f"match_{self.match.id}",
		{	'type': 'match.setup',
			'match_id': self.match.id,
			'difficulty': self.match.difficulty,
			'player1': str(self.player1.id),
			'player1_name': self.player1.username,
			'player1_color': self.player1.color,
			'player2': str(self.player2.id),
			'player2_name': self.player2.username,
			'player2_color': self.player2.color
		})

	async def match_setup(self, event):
		await self.send(text_data=json.dumps({'type': 'match_setup',
			'match_id' : str(event['match_id']),
			'difficulty' : event['difficulty'],
			'player1': event["player1"],
			'player1_name': event["player1_name"],
			'player1_color': event["player1_color"],
			'player2': event["player2"],
			'player2_name': event["player2_name"],
			'player2_color': event["player2_color"]
		}))

	async def game_state(self, event):
		print("\n\nconsumer received state (", event['ball'],")\n\n")
		await self.send(text_data=json.dumps({'type': event["info"],
											'ball': event["ball"],
											'player1_y': event["player1_y"],
											'player2_y': event["player2_y"],
											'player1_score': event["player1_score"],
											'player1_scorebo': event["player1_scorebo"],
											'player2_score': event["player2_score"],
											'player2_scorebo': event["player2_scorebo"],
											'round_nb': event["round_nb"],
											'status': event['status']}))
		
	async def game_over(self, event):
		winner = self.player1.username
		if event['winner'] == '2': winner = self.player2.username
		await self.send(text_data=json.dumps({'type': event["info"],
											'status': event['status'],
											'winner': winner}))

#===========================================================

	@database_sync_to_async
	def get_match(self, match_id):
		try:
			match = Match.objects.get(id=match_id)
			print("Match ", match.id, "found! (consumer)\n", file=sys.stderr)
		except Match.DoesNotExist:
			match = None
			print("Match ", match_id, "not found, yet. (consumer)\n", file=sys.stderr)
		return match
		

	@database_sync_to_async
	def get_player(self, player_id):
		try:
			player = Player.objects.get(id=player_id)
			print("Player ", player.id, "found! (consumer)\n", file=sys.stderr)
		except Match.DoesNotExist:
			player = None
			print("Player ", player_id, "not found, yet. (consumer)\n", file=sys.stderr)
		return player