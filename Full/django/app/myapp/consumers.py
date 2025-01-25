import json
import sys

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match

class MatchManager(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()
    
	async def disconnect(self):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)
		match_id = info_json.get("match_id")
		player_id = info_json.get("player_id")
        
		print("Data Received:\nmatch_id: ", match_id, "\nplayer_id: ", player_id, "\n", file=sys.stderr)

		match = await self.get_or_create_match(match_id, player_id)
		await self.update_match(match, player_id)

	async def add_to_group(self, match, player_id):
		if player_id == match.player1 or player_id == match.player2:
			await self.channel_layer.group_add(f"match_{match.id}", self.channel_name)

	@database_sync_to_async
	def get_or_create_match(self, match_id, player_id):
		try:
			match = Match.objects.get(id=match_id)
		except Match.DoesNotExist:
			match = Match.objects.create(id=match_id, player1=player_id)
			print("Match created. (", match.id, ")\n", file=sys.stderr)
		return match

	@database_sync_to_async
	def update_match_db(self, match, player_id):
		if match.player2 is None and match.player1 != player_id:
			match.player2 = player_id
			match.status = 'ready'
			match.save()
			print("Match ready. (", match.id, ")\n", file=sys.stderr)
		elif match.player2 and match.player2 != player_id and match.player1 != player_id:
			match.status = 'full'
		return match

	async def update_match(self, match, player_id):
		match = await self.update_match_db(match, player_id)
		await self.add_to_group(match, player_id)
		await self.send_state(match)

	async def send_state(self, match):
		await self.channel_layer.group_send(
			f"match_{match.id}",
			{	'type': 'match.update',
				'data': match.status
			})
		
	async def match_update(self, event):
		status = event["data"]
		await self.send(text_data=json.dumps({'status': status}))