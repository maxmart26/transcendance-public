from .Values import FIELD_HEIGHT, FIELD_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_SPEED

class Paddle:
	def __init__(self, side):
		self.y = FIELD_HEIGHT / 2 - (PADDLE_HEIGHT / 2)

		if side == 'left':
			self.x = 50,
		elif side == 'right':
			self.x = FIELD_WIDTH - 50 - PADDLE_WIDTH

		self.vy = 0

	def reset(self):
		self.y = FIELD_HEIGHT / 2 - (PADDLE_HEIGHT / 2)
		self.vy = 0

	def move_up(self, keypressed):
		if keypressed:
			self.vy = PADDLE_SPEED
		else:
			self.vy = 0

	def move_down(self, keypressed):
		if keypressed:
			self.vy = -PADDLE_SPEED
		else:
			self.vy = 0

	def move(self):
		self.y += self.vy

		if (self.y + PADDLE_HEIGHT) >= FIELD_HEIGHT:
			self.y = FIELD_HEIGHT - PADDLE_HEIGHT
		elif self.y  <= 0:
			self.y = 0

