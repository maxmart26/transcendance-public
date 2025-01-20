import math
import random

from Values import FIELD_HEIGHT, FIELD_WIDTH, BALL_SIZE, BALL_SPEED

class Ball:
	def __init__(self):
		self.x = 0
		self.y = random.randrange(FIELD_HEIGHT / 2, -FIELD_HEIGHT / 2)

		self.vx = random.choice(1, -1)
		#self.vy = 

		self.size = BALL_SIZE
		self.speed = BALL_SPEED
		#self.accel = faire en sorte que l'accel soit plus forte au moment de l'impact avec raquette

def reset(self):
	self.x = 0
	self.y = random.randrange(FIELD_HEIGHT / 2, -FIELD_HEIGHT / 2)

	self.vx = random.choice(1, -1)
	#self.vy =

	self.speed = BALL_SPEED

def move(self):
	self.x += self.vx * self.speed
	self.y += self.vy * self.speed


def wall_bounce(self):
	if self.y + self.size >= FIELD_HEIGHT / 2:
		self.vy = -abs(self.vy)
	elif self.y - self.size <= -FIELD_HEIGHT / 2:
		self.vy = abs(self.vy)

#def paddle_bounce(self, paddle):
	