from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from Pong.Values import TICK_RATE

class PongConsumer(AsyncWebsocketConsumer):
    async def receive(self, data):
        data_json = json.loads(data)
        action = data_json.get('action')

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        #self.game_id = recuperer dans la base de donnee
        await self.accept()
        self.game = PongGame()
        asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        pass

    async def game_loop(self):
        while True:
            game_state = self.game.update()
            await self.send(text_data=game_state)
            await asyncio.sleep(TICK_RATE)

    async def receive(self, text_data):
        try:
            data_json = json.loads(text_data)
            if 'paddle1_y' in data_json:
                self.game.paddle1['y'] = data_json['paddle1_y']
            if 'paddle2_y' in data_json:
                self.game.paddle2['y'] = data_json['paddle2_y']
        except json.JSONDecodeError:
            print("Invalid JSON received")

# Vue pour initialiser le jeu (peut être simplifié si le jeu démarre dès la connexion WebSocket)
def ma_vue(request):
    return render(request, 'pong.html')