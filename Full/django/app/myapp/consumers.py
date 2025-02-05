import json
import sys
import asyncio
import uuid

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from .models import Match, Player
from .views import games, waiting_games

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

	async def disconnect(self, _):
		for difficulty in waiting_games:
			for match_id in waiting_games[difficulty]:
				if waiting_games[difficulty][match_id] == self.player_id:
					del waiting_games[difficulty][match_id]
					print(f"User ", self.player_id, " has been removed from ", difficulty, " waiting list.", file=sys.stderr)
					break

		print("Client ", self.player_id, " disconnected.\n", file=sys.stderr)

		await self.channel_layer.group_send(
				f"match_{self.match_id}",
			{	'type': 'client.disconnected',
				'info': 'client_disconnected',
				'client': self.player_id
			})

	async def receive(self, text_data):
		info_json = json.loads(text_data)

		type = info_json.get('type')
		
		if (type == 'match_start'):
			self.game = games[str(self.match.id)]
			self.match.status = 'playing'
			self.player_id = info_json.get('player_id')
			# if self.match.status == 'waiting': self.match.status = 'starting'
			# elif self.match.status == 'starting': self.match.status == 'playing'
			print("match is ", self.match.status, "\n", file=sys.stderr)
			self.player1.nb_game_play += 1
			self.player2.nb_game_play += 1
			asyncio.create_task(self.game.game_starter(self.channel_layer))

		elif type == 'action':
			await self.game.action(info_json.get('action'), info_json.get('player_nb'))

		elif type == 'player_disconnect':
			self.player_id = info_json.get('id')

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
		if event['winner'] == '2':
			winner = self.player2.username
			self.player2.nb_game_win += 1
			self.player2.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'win'}
			self.player1.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'lose'}
		else:
			self.player1.nb_game_win += 1
			self.player1.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'win'}
			self.player2.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'lose'}
			
		print("Player ", event['winner'], "won! (", winner, ")\n", file=sys.stderr)
		await self.send(text_data=json.dumps({'type': event["info"],
											'status': event['status'],
											'winner': winner}))
		
	async def client_disconnected(self, event):
		winner = '1'
		if str(event['client']) == str(self.player1.id): winner = '2'
		await self.channel_layer.group_send(
				f"match_{self.match_id}",
			{	'type': 'game.over',
				'info': 'game_over',
				"status": 'over',
				"winner": winner,
			})

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
	

	################################################################################################################################

from .views import waiting_tourn

class TournamentManager(AsyncWebsocketConsumer):
	async def connect(self):
		self.tourn_id = self.scope['url_route']['kwargs']['match_id']
		await self.channel_layer.group_add(f"match_{self.tourn_id}", self.channel_name)
		await self.accept()

		self.tournament = waiting_tourn;
		players_name = [];
		players_pic = [];

		for player_id in self.tournament.players:
			players_name.append(self.tournament.players[player_id].username)
			players_pic.append(self.tournament.players[player_id].image_avatar)

		await self.channel_layer.group_send(
		f"match_{self.tourn_id}",
		{	'type': 'players.list',
			'players_name': players_name,
			'players_pic': players_pic
		})

	async def disconnect(self, _):
		pass

	async def receive(self, text_data):
		info_json = json.loads(text_data)
		type = info_json.get('type')

		if (type == "player_disconnect"):
			self.tournament.players.pop(info_json.get('id'))

			players_name = [];
			players_pic = [];

			for player_id in self.tournament.players:
				players_name.append(self.tournament.players[player_id].username)
				players_pic.append(self.tournament.players[player_id].image_avatar)

			await self.channel_layer.group_send(
			f"match_{self.tourn_id}",
			{	'type': 'players.list',
				'players_name': players_name,
				'players_pic': players_pic
			})

#===========================================================

	async def players_list(self, event):
		await self.send(text_data=json.dumps({'type': 'players_list',
			'players_name' : event['players_name'],
			'players_pic' : event['players_pic'],
		}))