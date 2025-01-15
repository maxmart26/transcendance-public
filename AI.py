import gym
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import json
import cv2
import os
import numpy as np
import random

def print_ball(x, y):
	print("Ball's coords: ", x, ", ", y)

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
		self.fc1 = nn.Linear(input_size, hidden_size)
		self.relu =  nn.ReLU()
		self.fc2 = nn.Linear(hidden_size, output_size)

	def forward(self, x):
		x = self.fc1(x)
		x = torch.relu(x)
		x = self.fc2(x)
		return x
	
#Hyperparameters
num_episodes = 10 #nb d'iteration apprentissage
gamma = 0.99
epsilon = 1.0
epsilon_min = 0.01
epsilon_decay = 0.995

model = PongNet(3, 128, 3)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
optimizer = optim.Adam(model.parameters(), lr = 0.001)
criterion = nn.MSELoss()

def select_action(coords):
	with torch.no_grad():
		q_values = model(state)
		action = torch.argmax(q_values).item()
		return action
	
#Training loop:
for episode in range(num_episodes):
	state, info = env.reset()
	coords = get_coords(state)
	state = torch.from_numpy(coords).float().unsqueeze(0).to(device)
	print("def_coords: ", coords)
	total_reward = 0
	done = False
	trunc = False
	while not done and not trunc:
		if random.random() < epsilon:
			action = env.action_space.sample()
		else:
			action = select_action(state)
		if action == 1 or action == 4 or action == 5:
			action = 0
		print("action: ", action)
		
		next_state, reward, done, trunc, info = env.step(action)
		coords = get_coords(next_state)
		print("coords: ", coords)
		next_state = torch.from_numpy(coords).float().unsqueeze(0).to(device)
		total_reward += reward

		with torch.no_grad():
			next_q_values = model(next_state)
			max_next_q = torch.max(next_q_values).item()

		if done or trunc:
   			target = reward
		else:
			target = reward + gamma * max_next_q
		q_values = model(state)
		#loss = criterion(q_values[0][action], torch.tensor(target).float().to(device))
		optimizer.zero_grad()
		#loss.backward()
		optimizer.step()
		state = next_state

	epsilon = max(epsilon_min, epsilon * epsilon_decay)
	print(f"Episode: {episode * 1}, Total Reward: {total_reward}, Epsilon: {epsilon}")

env.close()

# def play():
# 	state, _ = env.reset()
# 	done = False
# 	while not done:
# 		env.render()
# 		action = select_action(state)
# 		state, reward, done, _ = env.step(action)

# play()
