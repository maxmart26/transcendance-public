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

	async def send_state(self, status):
		await self.send(json.dumps({'status': status}))

	async def receive(self, text_data):
		info_json = json.loads(text_data)
		match_id = info_json.get("match_id")
		player_id = info_json.get("player_id")
        
		print("Data Received:\nmatch_id: %s\nplayer_id: %s\n", match_id, player_id, file=sys.stderr)

		match = await self.get_or_create_match(match_id, player_id)
		status = self.get_match_status(match)

		await self.update_match(match, player_id, status)

	@database_sync_to_async
	def get_or_create_match(self, match_id, player_id):
		try:
			match = Match.objects.get(id=match_id)
		except Match.DoesNotExist:
			match = Match.objects.create(id=match_id, player1=player_id)
		print("Match created. (%s)\n", match.id, file=sys.stderr)
		return match

	def get_match_status(self, match):
		if match.player2 is None:
			return 'waiting'
		else:
			return 'ready' if match.status == 'ready' else 'full'

	@database_sync_to_async
	def update_match_db(self, match, player_id, status):
		if match.player2 is None:
			match.player2 = player_id
			match.status = 'ready'
			match.save()
			print("Match ready. (%s)\n", match.id, file=sys.stderr)
		return match

	async def update_match(self, match, player_id, status):
		match = await self.update_match_db(match, player_id, status)
		await self.send_state(status)

	async def send_state(self, status):
		await self.send(json.dumps({'status': status}))