import random

from .Values import FIELD_HEIGHT, FIELD_WIDTH, BALL_SIZE, BALL_SPEED, PADDLE_HEIGHT, PADDLE_WIDTH

class Ball:
	def __init__(self, difficulty):
		self.x = ((FIELD_WIDTH - 20) / 2)
		self.y = random.randrange(150, (FIELD_HEIGHT - 20) - 150)

		self.vx = random.choice([1, -1])
		self.vy = random.choice([1, -1])

		self.size = BALL_SIZE
		self.speed = BALL_SPEED[difficulty]
		#self.accel = faire en sorte que l'accel soit plus forte au moment de l'impact avec raquette

	def reset(self, difficulty):
		self.x = (FIELD_WIDTH - 20) / 2
		self.y = random.randrange(150, (FIELD_HEIGHT - 20) - 150)

		self.vx = random.choice([1, -1])
		self.vy = random.choice([1, -1])

	def move(self):
		self.x += self.vx * self.speed
		self.y += self.vy * self.speed


	def wall_bounce(self):
		if self.x + self.size > (FIELD_WIDTH - 20) or self.x - self.size <= 0:
			self.vx *= -1
		elif self.y + self.size > (FIELD_HEIGHT - 20) or self.y - self.size <= 0:
			self.vy *= -1

	def paddle_bounce(self, paddle_x, paddle_y):
		if paddle_x > FIELD_WIDTH / 2 and self.x == paddle_x \
			and self.y >= paddle_y and self.y <= (paddle_y + PADDLE_HEIGHT):
			self.vx *= -1
		elif paddle_x < FIELD_WIDTH / 2 and self.x == paddle_x + PADDLE_WIDTH \
			and self.y >= paddle_y and self.y <= (paddle_y + PADDLE_HEIGHT):
			self.vx *= -1
	