import json
import sys
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match, Player

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

#===========================================================

	async def match_init(self, event):
		self.match = Match.objects.get(id=event['match_id'])
		self.player1 = Player.objects.get(id=self.match.player1)
		self.player2 = Player.objects.get(id=self.match.player2)

		await self.channel_layer.group_send(
		f"match_{self.match.id}",
		{	'type': 'match.setup',
			'match_id': self.match.id,
			'difficulty': self.match.difficulty,
			'player1': self.player1.id,
			'player1_name': self.player1.username,
			'player1_color': self.player1.color,
			'player2': self.player2.id,
			'player2_name': self.player2.username,
			'player2_color': self.player2.color
		})

	async def match_setup(self, event):
		await self.send(text_data=json.dumps({'type': 'match_setup',
			'match_id' : event['match_id'],
			'difficulty' : event['difficulty'],
			'player1': event["player1"],
			'player1_name': event["player_name"],
			'player1_color': event["player1_score"],
			'player2': event["player2"],
			'player2_name': event["player2_name"],
			'player2_color': event["player2_color"]
		}))
    
	async def disconnect(self):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)

		type = info_json.get('type')

		if (type == 'match_init'):
			match_id = info_json.get("match_id")

			print("Data Received:\nmatch_id: ", match_id, "\nDifficulty: ", info_json.get("difficulty"), file=sys.stderr)
			self.match = await self.get_match(match_id, info_json.get("difficulty"), info_json.get("player_id"))
			self.player1 = await self.get_player(self.match.player1)

			await self.send_newplayer(self.match.player2)
		
		elif (type == 'game_create'):
			await self.match.game.play(info_json.get("difficulty"), self.match)

		elif type == 'action':
			action = info_json.get('action')
			await self.match.game.action(action, '1') if info_json.get('player') == self.player1.id else self.match.game.action(action, '2')


#===========================================================

	@database_sync_to_async
	def get_match(self, match_id, difficulty, player_id):
		try:
			match = Match.objects.get(id=match_id)
			print("Match ", match.id, "found!\n", file=sys.stderr)
		except Match.DoesNotExist:
			match = None
			print("Match ", match.id, "not found, yet.\n", file=sys.stderr)
		return match

#===========================================================

	async def send_status(self, match):
		await self.channel_layer.group_send(
			f"match_{match.id}",
			{	'type': 'match.update',
				'status': 'waiting'
			})
		
	async def game_state(self, event):
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