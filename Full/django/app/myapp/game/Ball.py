import random

from .Values import FIELD_HEIGHT, FIELD_WIDTH, BALL_SIZE, BALL_SPEED, PADDLE_HEIGHT, PADDLE_WIDTH

class Ball():
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

	def move(self, p_paddle, o_paddle):
		self.paddle_bounce(o_paddle)
		self.paddle_bounce(p_paddle)

		self.wall_bounce()

		self.x += self.vx * self.speed
		self.y += self.vy * self.speed

	def wall_bounce(self):
		if self.x + BALL_SIZE >= FIELD_WIDTH or self.x <= 0:
			self.vx *= -1
		elif self.y + BALL_SIZE >= FIELD_HEIGHT or self.y <= 0:
			self.vy *= -1

	def paddle_bounce(self, paddle):
		if(self.x < 50 or self.x > FIELD_WIDTH - 50 - PADDLE_WIDTH):
			return

		if paddle.x > (FIELD_WIDTH / 2) and (self.x + BALL_SIZE) >= paddle.x and (self.y + BALL_SIZE / 2) >= paddle.y - 10 \
			and self.y + (BALL_SIZE / 2) <= (paddle.y + PADDLE_HEIGHT + 10):
			self.vx *= -1
			if self.vy != 0:
				self.speed += 0.85
			else:
				self.speed += 0.5

		elif (paddle.x < FIELD_WIDTH / 2) and self.x <= (paddle.x + PADDLE_WIDTH) and (self.y + BALL_SIZE / 2) >= paddle.y - 10 \
			and self.y + (BALL_SIZE / 2) <= (paddle.y + PADDLE_HEIGHT + 10):
			self.vx *= -1
			if self.vy != 0:
				self.speed += 0.85
			else:
				self.speed += 0.5

	