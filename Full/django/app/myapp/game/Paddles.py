from .Values import FIELD_HEIGHT, FIELD_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_SPEED

class Paddle:
	def __init__(self, side):
		self.y = FIELD_HEIGHT / 2 - (PADDLE_HEIGHT / 2)
		self.x = 0

		if side == 'left':
			self.x = 50
		elif side == 'right':
			self.x = FIELD_WIDTH - 50 - PADDLE_WIDTH

		self.vy = 0

	async def reset(self):
		self.y = FIELD_HEIGHT / 2 - (PADDLE_HEIGHT / 2)
		self.vy = 0
		self.score = 0

	async def still(self):
		self.vy = 0

	async def move_up(self):
		self.vy = -PADDLE_SPEED

	async def move_down(self):
		self.vy = PADDLE_SPEED

	async def move(self):
		self.y += self.vy

		if (self.y + PADDLE_HEIGHT) >= FIELD_HEIGHT:
			self.y = FIELD_HEIGHT - PADDLE_HEIGHT
		elif self.y  <= 0:
			self.y = 0

