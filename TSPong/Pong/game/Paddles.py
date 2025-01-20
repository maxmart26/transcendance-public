from Ball import Ball
from Values import FIELD_HEIGHT, FIELD_WIDTH, PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_SPEED

class Paddle:
	def __init__(self, side):
		self.x = 0
		self.y = -FIELD_WIDTH / 2 + PADDLE_WIDTH if side == 'left' else self.y = FIELD_WIDTH / 2 - PADDLE_WIDTH

		self.height = PADDLE_HEIGHT
		self.width = PADDLE_WIDTH

		self.speed = PADDLE_SPEED
		self.vy = 0

def reset(self):
	self.x = 0
	self.y = 0

	self.height = PADDLE_HEIGHT
	self.width = PADDLE_WIDTH

	self.speed = PADDLE_SPEED
	self.vy = 0

def move_up(self, keypressed):
	if keypressed:
		self.vy = self.speed
	else:
		self.vy = 0

def move_down(self, keypressed):
	if keypressed:
		self.vy = -self.speed
	else:
		self.vy = 0

def move(self):
	self.y += self.vy

	if (self.y + self.height / 2) > FIELD_HEIGHT / 2:
		self.y = FIELD_HEIGHT / 2 - self.height / 2
	
	elif (self.y - self.height / 2) < -FIELD_HEIGHT / 2:
		self.y = -FIELD_HEIGHT / 2 + self.height / 2

