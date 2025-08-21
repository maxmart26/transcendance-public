## Project overview

This project consists of building a **web server from scratch** with **Docker** to host a real-time, Pong-based web application.  
Users can **sign in securely**, manage their profile, view **match history and stats**, add **friends**, and play matches in real time.

### Tech stack
- **Backend:** Django (+ Django Channels for WebSockets), PostgreSQL  
- **Frontend:** Vanilla JavaScript  
- **Infra:** Docker / Docker Compose

### My role
I **implemented the entire backend in Django**:
- Designed the data model (users, matches, stats, friendships) in **Django ORM** with **PostgreSQL**.
- Built the REST endpoints and server-side logic for authentication, profile data, match history and statistics.
- Added **real-time** communication using **Django Channels** (WebSockets) to connect the JS frontend with the Python backend.
- Integrated everything in **Docker Compose** for local development and deployment.

I also created a simple **3D version** of the game using **three.js**.

### (Experiment) AI opponent
I experimented with an AI that could play Pong using **PyTorch**, training with **OpenAI Gym**.  
The idea was to save model weights at different training stages to provide multiple difficulty levels.  
We chose not to ship the AI as it wasn’t reliable enough yet, but it was a great first dive into building and training a small neural network.

---

![image](https://github.com/user-attachments/assets/85629f0d-b697-437e-a5e9-6b59f74721e0)
![image](https://github.com/user-attachments/assets/cb239148-8288-49ac-90bc-183b6841c272)
![image](https://github.com/user-attachments/assets/d5a8fad5-d50d-4fdd-97c3-9906e8d12cc7)
![image](https://github.com/user-attachments/assets/9169bdb5-7eb1-48d2-90e7-a41da0a107ef)
![image](https://github.com/user-attachments/assets/dbd33f05-34c2-46cf-b10f-cd2fee138ec9)
