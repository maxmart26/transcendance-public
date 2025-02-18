import json
import sys
import asyncio
import uuid
import datetime
import time

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from django.db import transaction
from django.shortcuts import redirect

from .models import Match, Player, Tournament
from .views import games, waiting_games, game
from .game.Pong import PongGame

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
		print("Consumer received ", type, "\n", file=sys.stderr)
		
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
			if (str(self.match.id) not in self.player2.games_history or str(self.match.id) not in self.player1.games_history):
				self.player2.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'win', 'score': event['score'], 'date': datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
				self.player1.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'lose', 'score': event['score'], 'date': datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
		else:
			self.player1.nb_game_win += 1
			if (str(self.match.id) not in self.player2.games_history or str(self.match.id) not in self.player1.games_history):
				self.player1.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'win', 'score': event['score'], 'date': datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
				self.player2.games_history[str(self.match.id)] = {'player1': self.player1.username, 'player2': self.player2.username, 'result': 'lose', 'score': event['score'], 'date': datetime.datetime.fromtimestamp(time.time()).strftime('%Y-%m-%d %H:%M:%S')}
		
		self.match.status = 'over'
		await self.save_state(self.player1)
		await self.save_state(self.player2)
		await self.save_state(self.match)

		print("Player ", event['winner'], "won! (", winner, ")\n", file=sys.stderr)
		await self.send(text_data=json.dumps({'type': event["info"],
											'status': event['status'],
											'winner': winner}))
		self.close()
		
	async def client_disconnected(self, event):
		if (self.match.status != 'over'):
			winner = '1'
			if str(event['client']) == str(self.player1.id): winner = '2'
			await self.channel_layer.group_send(
					f"match_{self.match_id}",
				{	'type': 'game.over',
					'info': 'game_over',
					"status": 'over',
					"winner": winner,
					'score': {'1': 'X', '2': 'X'}
				})

#===========================================================

	@database_sync_to_async
	def save_state(self, obj):
		obj.save()

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

class TournamentManager(AsyncWebsocketConsumer):
	async def connect(self):
		self.tourn_id = self.scope['url_route']['kwargs']['tourn_id']
		await self.channel_layer.group_add(f"match_{self.tourn_id}", self.channel_name)
		await self.accept()

		self.tournament = await self.get_tournament(self.tourn_id);
		if len(self.tournament.players) >= 4:
			print("Tournament is ready !\n", file=sys.stderr)
			self.tournament.status = 'closed'
			await self.save_state(self.tournament)
			await self.channel_layer.group_send(
			f"match_{self.tourn_id}",
			{	'type': 'init.tournament',
				'id': self.tournament.id
			})
			return

		players_name = []
		players_pic = []

		for player_id in self.tournament.players:
			player = await self.get_player(player_id)
			players_name.append(player.username)
			players_pic.append(str(player.image_avatar))

		await self.channel_layer.group_send(
		f"match_{self.tourn_id}",
		{	'type': 'players.list',
			'players_name': players_name,
			'players_pic': players_pic
		})

	async def disconnect(self, _):
			self.tournament = await self.get_tournament(self.tourn_id);

			players_name = [];
			players_pic = [];

			for player_id in self.tournament.players:
				player = await self.get_player(player_id)
				players_name.append(player.username)
				players_pic.append(str(player.image_avatar))

			await self.channel_layer.group_send(
			f"match_{self.tourn_id}",
			{	'type': 'players.list',
				'players_name': players_name,
				'players_pic': players_pic
			})

	async def receive(self, text_data):
		info_json = json.loads(text_data)
		type = info_json.get('type')
		print("Consumer received ", type, "\n", file=sys.stderr)

		if (type == "player_disconnect"):
			self.tournament.players.remove(info_json.get('id'))
			if (len(self.tournament.players) == 0):
				self.tournament.delete()
			await self.save_state(self.tournament)
		elif (type == "get_next_game"):
			if (info_json.get('result') == 'winner'):
				match = await self.get_match(self.tournament.games[2])
				if (not match.player1):
					match.player1 = info_json.get('player_id')
					print("Player1 for ", match.id, " is set.", file=sys.stderr)
				elif (not match.player2):
					match.player2 = info_json.get('player_id')
					print("Player2 for ", match.id, " is set.", file=sys.stderr)
					if str(match.id) not in games:
						games[str(match.id)] = PongGame(match.id, 'medium')
				await self.save_state(match)

				if (match.player1 and match.player2):
					await self.channel_layer.group_send(
					f"match_{self.tourn_id}",
					{	'type': 'next.game',
						'bracket': 'winner',
						'id': self.tournament.games[2]
					})
			else:
				match = await self.get_match(self.tournament.games[3])
				if (not match.player1):
					match.player1 = info_json.get('player_id')
					print("Player1 for ", match.id, " is set.", file=sys.stderr)
				elif (not match.player2):
					match.player2 = info_json.get('player_id')
					print("Player2 for ", match.id, " is set.", file=sys.stderr)
					if str(match.id) not in games:
						games[str(match.id)] = PongGame(match.id, 'medium')
				await self.save_state(match)

				if (match.player1 and match.player2):
					await self.channel_layer.group_send(
					f"match_{self.tourn_id}",
					{	'type': 'next.game',
						'bracket': 'loser',
						'id': self.tournament.games[3]
					})

		elif (type == "end_tournament"):
			if (info_json.get('bracket') == 'winner' and info_json.get('result') == 'winner'):
				player = await self.get_player(info_json.get('player_id'))
				if (player):
					self.tournament.first = player.username
			elif (info_json.get('bracket') == 'winner' and info_json.get('result') == 'loser'):
				player = await self.get_player(info_json.get('player_id'))
				if (player):
					self.tournament.second = player.username
			elif (info_json.get('bracket') == 'loser' and info_json.get('result') == 'winner'):
				player = await self.get_player(info_json.get('player_id'))
				if (player):
					self.tournament.third = player.username

			await self.save_state(self.tournament)
			await self.channel_layer.group_send(
				f"match_{self.tourn_id}",
				{	'type': 'send.podium',
					'first': self.tournament.first,
					'second': self.tournament.second,
					'third': self.tournament.third
				})

#===========================================================

	async def players_list(self, event):
		self.tournament = await self.get_tournament(self.tourn_id);
		await self.send(text_data=json.dumps({'type': 'players_list',
			'players_name' : event['players_name'],
			'players_pic' : event['players_pic'],
		}))

	async def init_tournament(self, event):
		await self.send(text_data=json.dumps({'type': 'init_tournament',
			'id' : str(event['id'])
		}))

	async def next_game(self, event):
		await self.send(text_data=json.dumps({'type': 'next_game',
				'id' : event['id'],
				'bracket' : event['bracket'],
				}))
		
	async def send_podium(self, event):
		print("Tournament is over:\nFirst: ", event['first'], "\nSecond: ", event['second'], "\nThird: ", event['third'], file=sys.stderr)
		await self.send(text_data=json.dumps({'type': 'podium',
				'first': event['first'],
				'second': event['second'],
				'third': event['third']
				}))

#===========================================================

	@database_sync_to_async
	def save_state(self, obj):
		obj.save()

	@database_sync_to_async
	def get_tournament(self, tourn_id):
		try:
			tourn = Tournament.objects.get(id=tourn_id)
			print("Tournament ", tourn.id, "found! (consumer)\n", file=sys.stderr)
		except Tournament.DoesNotExist:
			tourn = None
			print("Tournament ", tourn_id, "not found. (consumer)\n", file=sys.stderr)
		return tourn
	
	@database_sync_to_async
	def get_player(self, player_id):
		try:
			player = Player.objects.get(id=player_id)
			print("Player ", player.id, "found! (consumer)\n", file=sys.stderr)
		except Match.DoesNotExist:
			player = None
			print("Player ", player_id, "not found, yet. (consumer)\n", file=sys.stderr)
		return player
	
	@database_sync_to_async
	def get_match(self, match_id):
		try:
			match = Match.objects.get(id=match_id)
			print("Match ", match.id, "found! (consumer)\n", file=sys.stderr)
		except Match.DoesNotExist:
			match = None
			print("Match ", match_id, "not found, yet. (consumer)\n", file=sys.stderr)
		return match