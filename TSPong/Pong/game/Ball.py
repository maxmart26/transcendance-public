import random

from .Values import FIELD_HEIGHT, FIELD_WIDTH, BALL_SIZE, BALL_SPEED, PADDLE_HEIGHT, PADDLE_WIDTH

class Ball:
	def __init__(self, difficulty):
		self.x = ((FIELD_WIDTH - 20) / 2)
		self.y = random.randrange(150, (FIELD_HEIGHT - 20) - 150)

		self.vx = random.choice([1, -1])
		self.vy = random.choice([1, -1])

		self.speed = BALL_SPEED[difficulty]

	def reset(self, difficulty):
		self.x = (FIELD_WIDTH - 20) / 2
		self.y = random.randrange(150, (FIELD_HEIGHT - 20) - 150)

		self.vx = random.choice([1, -1])
		self.vy = random.choice([1, -1])

		self.speed = BALL_SPEED[difficulty]

	def move(self):
		self.x += self.vx * self.speed
		self.y += self.vy * self.speed

	def wall_bounce(self):
		if self.x + BALL_SIZE >= FIELD_WIDTH or self.x <= 0:
			self.vx *= -1
		elif self.y + BALL_SIZE >= FIELD_HEIGHT or self.y <= 0:
			self.vy *= -1

	def paddle_bounce(self, paddle_x, paddle_y):
		if paddle_x > (FIELD_WIDTH / 2) and (self.x + BALL_SIZE) >= paddle_x and (self.y + BALL_SIZE) >= paddle_y and self.y <= (paddle_y + PADDLE_HEIGHT):
			self.vx *= -1
			self.speed += 0.7
		elif (paddle_x < FIELD_WIDTH / 2) and self.x <= (paddle_x + PADDLE_WIDTH) and (self.y + BALL_SIZE) >= paddle_y and self.y <= (paddle_y + PADDLE_HEIGHT):
			self.vx *= -1
			self.speed += 0.7

	