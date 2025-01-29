import json
import sys
import asyncio

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match, Player

class MatchManager(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()
		self.player1 = None
		self.player2 = None
		self.match = None
    
	async def disconnect(self):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)

		type = info_json.get('type')

		if (type == 'match_init'):
			match_id = info_json.get("match_id")

			await self.channel_layer.group_add(f"match_{match_id}", self.channel_name)
			print("Data Received:\nmatch_id: ", match_id, "\nDifficulty: ", info_json.get("difficulty"), file=sys.stderr)
			self.match = await self.get_match(match_id, info_json.get("difficulty"), info_json.get("player_id"))
			self.player1 = await self.get_player(self.match.player1)

			await self.send_newplayer(self.match.player2)
		
		elif (type == 'game_create'):
			await self.match.game.play(info_json.get("difficulty"), self.match)

		elif type == 'action':
			action = info_json.get('action')
			await self.match.game.action(action, '1') if info_json.get('player') == self.player1.id else self.match.game.action(action, '2')


#==================================================

	@database_sync_to_async
	def get_player(self, id):
		try:
			player_db = Player.objects.get(id=id)
			print("Player ", id, "found!\n", file=sys.stderr)
		except Player.DoesNotExist:
			print("Player ", id, "not found in db.\n", file=sys.stderr)
			player_db = None
		return player_db

	async def send_newplayer(self, id):
		await self.channel_layer.group_send(
			f"match_{self.match.id}",
			{	'type': 'player.connect',
				'match_id': self.match.id,
				'player_id': id
			})

	async def player_connect(self, event):
		print("Player connect received.", file=sys.stderr)
		self.player2 = await self.get_player(self.match.player2)

		if (self.player2 != None):
			await self.channel_layer.group_send(
				f"match_{self.match.id}",
				{	'type': 'match.start',
					'status': 'match.status',
					'player1': self.player1.username,
					'player1id': self.player1.id,
					'player1color': self.player1.color,
					'player2': self.player2.username,
					'player2id': self.player2.id,
					'player2color': self.player2.color,
					'difficulty': self.match.difficulty
				})
			
#==============================================

	@database_sync_to_async
	def get_match(self, match_id, difficulty, player_id):
		try:
			match = Match.objects.get(id=match_id)
			print("Match ", match.id, "found!\n", file=sys.stderr)
			match.player2 = player_id
		except Match.DoesNotExist:
			match = Match.objects.create(id=match_id, player1=player_id, difficulty=difficulty)
			print("Match ", match.id, "created!\n", file=sys.stderr)
		return match

	async def update_match(self, match, player_id):
		match = await self.update_match_db(match, player_id)
		await self.add_to_group(match, player_id)
		await self.send_state(match)

	async def match_start(self, event):
		if (self.player2 == None):
			self.player2 = await self.get_player(event['player2id'])

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