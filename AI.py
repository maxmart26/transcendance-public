import gym
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import json
import cv2
import os
import numpy as np
import pickle

def print_ball(x, y):
	print("Ball's coords: ", x, ", ", y)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
env = gym.make("Pong-v4")

def get_coords(picture):
	gray = cv2.cvtColor(picture, cv2.COLOR_RGB2GRAY)
	_, ball_mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
	ball_contours, _ = cv2.findContours(ball_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	if ball_contours:
		ball_x, ball_y, _, _ = cv2.boundingRect(ball_contours[0])
		ball_x += 2
		ball_y += 2
	else:
		ball_x = -1
		ball_y = -1
	_, paddle_mask = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
	paddle_mask = paddle_mask[:, :20]
	paddle_contours, _ = cv2.findContours(paddle_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
	if paddle_contours:
		paddle_x, paddle_y, _, _ = cv2.boundingRect(paddle_contours[0])
		paddle_y += 5
	else:
		paddle_y = -1
	return np.array([paddle_y, ball_x, ball_y])


class PongNet(nn.Module):
	def __init__(self, input_size, hidden_size, output_size):
		super(PongNet, self).__init__()
		self.fc1 = nn.Linear(input_size, hidden_size)  #3 entrees (raquette y et balle x y), 128 neuronnes
		self.relu =  nn.ReLU()
		self.fc2 = nn.Linear(hidden_size, output_size) #128 entrees (les neuronnes), 3 sorties (up, down et nothing)

	def forward(self, x):
		x = self.fc1(x)
		x = torch.relu(x)
		x = self.fc2(x)
		return x
	
#Hyperparameters
learning_rate = 0.001
num_episodes = 1 #nb d'iteration apprentissage
gamma = 0.99

model = PongNet(3, 128, 3)
optimizer = optim.Adam(model.parameters(), lr = learning_rate)
criterion = nn.CrossEntropyLoss()

def select_action(coords):
	with torch.no_grad():
		state = torch.tensor(coords, dtype=torch.float32).unsqueeze(0)
		q_values = model(state)
		action = torch.argmax(q_values).item()
		return action
	
#Training loop:
for episode in range(num_episodes):
	state, _ = env.reset()
	coords = get_coords(state)
	state = torch.from_numpy(coords).float().unsqueeze(0).unsqueeze(0).to(device)
	print("def_coords: ", coords)
	done = False
	while not done:
		action = select_action(state)
		print("action: ", action)
		next_state, reward, done, trunc, _ = env.step(action)
		coords = get_coords(next_state)
		next_state = torch.from_numpy(coords).float().unsqueeze(0).unsqueeze(0).to(device)
		if not done:
			target = reward + gamma * torch.max(model(torch.tensor(next_state, dtype=torch.float32).unsqueeze(0))).item()
		action = torch.tensor([action], dtype=torch.long)
		#loss = criterion(model(torch.tensor(state, dtype=torch.float32).unsqueeze(0)), action)
		optimizer.zero_grad()
		#loss.backward()
		optimizer.step()
		#state = next_state
		print("new_coords: ", coords)

def play():
	state, _ = env.reset()
	done = False
	while not done:
		env.render()
		action = select_action(state)
		state, reward, done, _ = env.step(action)

play()
