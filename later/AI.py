import torch
import torch.nn as nn
import torch.optim as optim

import gym
import numpy as np
import random

env = gym.make("Pong-ram-v4", render_mode='rgb_array')

class Net(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(Net, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        x = self.fc1(x)
        x = self.relu(x)
        x = self.fc2(x)
        return x

input_size = 4  # Position balle (x, y), position raquette joueur (y), position raquette adversaire (y)
hidden_size = 128
output_size = 3  # 0: rien, 2: haut, 3: bas
net = Net(input_size, hidden_size, output_size)

optimizer = optim.Adam(net.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# Paramètres d'entraînement
env = gym.make("Pong-ram-v4", render_mode='rgb_array')
num_episodes = 5000
gamma = 0.99
epsilon = 1.0
epsilon_min = 0.01
epsilon_decay = 0.995
batch_size = 32

for episode in range(num_episodes):
    obs, info = env.reset() # Initialisation de obs ici
    obs, reward, done, _, info = env.step(1)
    done = False
    total_reward = 0
    state = None
    states_list = []
    actions_list = []
    rewards_list = []
    next_states_list = []

    while not done:
        # Extraction des données
        ball_x = obs[49]
        ball_y = obs[54]
        player_y = obs[51]
        opponent_y = obs[50]
        new_state = np.array([ball_x, ball_y, player_y, opponent_y], dtype=np.float32)

        new_obs = obs #Initialisation de new_obs ici
        if state is not None:
            state_tensor = torch.from_numpy(state).float().unsqueeze(0)
            if random.random() < epsilon:
                action = env.action_space.sample()
            else:
                with torch.no_grad():
                    q_values = net(state_tensor)
                    action = torch.argmax(q_values).item()
                    
            action_mapping = {0:0, 2:1, 3:2}
            mapped_action = action_mapping.get(action,0) #gestion du cas ou l'action n'est pas dans le mapping

            new_obs, reward, done, _, info = env.step(action)
            total_reward += reward

            states_list.append(state)
            actions_list.append(mapped_action) #stock l'action mapper
            rewards_list.append(reward)
            next_states_list.append(new_state)

            if len(states_list) >= batch_size or done:
                batch_states = torch.from_numpy(np.stack(states_list)).float()
                batch_actions = torch.tensor(actions_list, dtype=torch.long)
                batch_rewards = torch.tensor(rewards_list, dtype=torch.float)
                batch_next_states = torch.from_numpy(np.stack(next_states_list)).float()
                
                with torch.no_grad():
                    next_q_values = net(batch_next_states).max(1)[0]
                    target_q_values = batch_rewards + gamma * next_q_values * (1 - torch.tensor(done, dtype=torch.float))

                q_values = net(batch_states).gather(1, batch_actions.unsqueeze(1)).squeeze(1)
                loss = criterion(q_values, target_q_values)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()

                states_list = []
                actions_list = []
                rewards_list = []
                next_states_list = []
        state = new_state
        obs = new_obs
    epsilon = max(epsilon_min, epsilon * epsilon_decay)
    print(f"Episode: {episode + 1}, Reward: {total_reward}, Epsilon: {epsilon}")

env.close()