import json
import sys
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match, Player
from myapp.game.Pong import PongGame

class MatchManager(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()
		self.player1 = None
		self.player2 = None
    
	async def disconnect(self):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)

		type = info_json.get('type')

		if (type == 'match_init'):
			match_id = info_json.get("match_id")

			await self.channel_layer.group_add(f"match_{match_id}", self.channel_name)
			print("Data Received:\nmatch_id: ", match_id, "\nDifficulty: ", info_json.get("difficulty"), file=sys.stderr)

			match = self.get_match(match_id, info_json.get("difficulty"), info_json.get("player_id"))
			if match:
				await self.start_match(match)
		
		elif (type == 'game_create'):
			if (info_json.get('host') == self.player1.id):
				asyncio.create_task(PongGame.play(match.difficulty))

	@database_sync_to_async
	def get_match(self, match_id, difficulty, player_id):
		try:
			match = Match.objects.get(id=match_id)
			match.player2 = player_id
		except Match.DoesNotExist:
			Match.objects.create(id=match_id, player1=player_id, difficulty=difficulty)
		return match

	async def update_match(self, match, player_id):
		match = await self.update_match_db(match, player_id)
		await self.add_to_group(match, player_id)
		await self.send_state(match)

	async def send_state(self, match):
		await self.channel_layer.group_send(
			f"match_{match.id}",
			{	'type': 'match.update',
				'status': 'waiting'
			})
		
	async def start_match(self, match):
		self.player1 = Player.objects.get(id=match.player1)
		self.player2 = Player.objects.get(id=match.player2)

		await self.channel_layer.group_send(
		f"match_{match.id}",
		{	'type': 'match.start',
			'status': 'match.status',
			'player1': self.player1.name,
			'player1id': self.player1.id,
			'player1color': self.player1.color,
			'player2': self.player2.name,
			'player2id': self.player2.id,
			'player2color': self.player2.color,
			'difficulty': match.difficulty
		})

	async def match_start(self, event):
		await self.send(text_data=json.dumps({ 'type': 'match_start',
										'status': event['status'],
										'player1': event['player1'],
										'player1id': event['player1id'],
										'player1color': event['player1color'],
										'player2': event['player2'],
										'player2id': event['player2id'],
										'player2color': event['player2color'],
										'difficulty':event['difficulty']
										}))
		
	async def match_update(self, event):
		status = event["status"]
		await self.send(text_data=json.dumps({'status': status}))

	async def game_state(self, event):
		await self.send(text_data=json.dumps({'type': event["info"],
											'ball': event["ball"],
											'player1_y': event["player1_y"],
											'player2_y': event["player2_y"],
											'player1_score': event["player1_score"],
											'player1_scorebo': event["player1_scorebo"],
											'player2_score': event["player2_score"],
											'player2_score': event["player2_scorebo"],
											'round_nb': event["round_nb"],
											'status': event['status']}))