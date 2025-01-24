import json
from channels.generic.websocket import AsyncWebsocketConsumer

class Match:
    def __init__(self, id, p1):
        self.id = id
        self.p1 = p1
        self.p2 = 'null'

class MatchManager(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.matches = {}
    
    async def disconnect(self):
        pass


    async def send_state(self, status):
        await self.send(status)

    async def receive(self, text_data):
        info_json = json.loads(text_data)
        match_id = info_json.get("match_id")
        player_id = info_json.get("player_id")

        if (match_id not in self.matches):
            self.matches[match_id] = Match(match_id, player_id)
            status = 'waiting'
        else:
            if (self.matches[match_id].p2 == 'null'):
                self.matches[match_id].p2 = player_id
                status = 'ready'
            else:
                status = 'full'

        await self.send_state(status)