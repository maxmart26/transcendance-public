this.canvas = document.querySelector('canvas');
this.context = this.canvas.getContext('2d');

this.canvas.width = 1400;
this.canvas.height = 1000;
this.color = '#281f79'

this.canvas.style.width = (this.canvas.width / 2) + 'px';
this.canvas.style.height = (this.canvas.height / 2) + 'px';

// Paramètres initiaux (seront mis à jour par les données du WebSocket)
ball_size = 20;
paddle_height = 120;
paddle_width = 15; 

let ball = {x: this.canvas.width / 2 - (ball_size / 2), y: this.canvas.height / 2 - (ball_size / 2)};

let player1Y = this.canvas.height / 2 - (paddle_height / 2);
let player2Y = this.canvas.height / 2 - (paddle_height / 2);
let p1_score = 0
let p2_score = 0
let round_nb = 0

let player_id;
let player_name, opp_name;
let player_color = '#ff79d1';
let opp_color = '#ff79d1';

// Fonction pour dessiner le jeu
function draw() {
	this.context.clearRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);

	this.context.fillStyle = this.color;

	// Draw the background
	this.context.fillRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);

	this.context.fillStyle = player_color;
	this.context.shadowOffsetX = -1;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 15;
	this.context.shadowColor = player_color;

	// Draw the Player1
	this.context.fillRect(
		50,
		player1Y,
		paddle_width,
		paddle_height
	);

	this.context.fillStyle = opp_color;
	this.context.shadowColor = opp_color;

	// Draw the Player2
	this.context.fillRect(
		this.canvas.width - 50 - paddle_width,
		player2Y,
		paddle_width,
		paddle_height
	);

	this.context.shadowOffsetX = 0;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 0;

	// Draw the net (Line in the middle)
	this.context.beginPath();
	this.context.setLineDash([7, 15]);
	this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
	this.context.lineTo((this.canvas.width / 2), 140);
	this.context.lineWidth = 10;
	this.context.strokeStyle = '#4bdae0';
	this.context.stroke();

	// Set the default canvas font and align it to the center
	this.context.font = '100px Impact';
	this.context.textAlign = 'center';

	this.context.fillStyle = '#ffffff';
	this.context.shadowOffsetX = -1;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 15;
	this.context.shadowColor = '#ffffff';

	// Draw the Ball
	this.context.fillRect(
		ball.x,
		ball.y,
		ball_size,
		ball_size
	);

	this.context.shadowOffsetX = 0;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 0;

	// Draw the players score
	this.context.fillText(
		p1_score, // Left score
		(this.canvas.width / 2) - 300,
		200
	);
	this.context.fillText(
		p2_score, // Right score
		(this.canvas.width / 2) + 300,
		200
	);

	this.context.font = '50px Impact';
	this.context.textAlign = 'center';

	this.context.fillStyle = '#eba811';
	this.context.shadowOffsetX = -1;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 15;
	this.context.shadowColor = '#eba811';

	// Draw the current round number
	this.context.fillText(
		"Round " + round_nb,
		(this.canvas.width / 2),
		100
	);

	this.context.shadowOffsetX = 0;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 0;
}

function connect_socket()
{	// WebSocket game_state
	const socket = new WebSocket('ws://' + window.location.host + '/ws/myapp/game/');

	socket.onopen = function(e) {
		console.log("WebSocket drawGame open");
	};

	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);

		switch (data.type) {
			case 'game_info':
				player_id = data.player_id;
				player_name = data.player_name;
				player_color = data.player1_color;
				opp_color = data.opp_color;
				opp_name = data.opp_name;
				draw();
				check_input();
				break;
			case 'game_state':
				ball = data.ball;
				player1Y = data.player1_y;
				player2Y = data.player2_y;
				p1_score = data.p1_score;
				p2_score = data.p2_score;
				round_nb = data.round_nb;
				draw();
				break;
		}
	};

	socket.onclose = function(e) {
		console.error('Socket WebSocket closed (error)');
	};

	socket.onerror = function(err) {
		console.error('Error WebSocket :', err);
	};

	function check_input(){
		document.addEventListener('keydown', (event) => {
			let action = null;
			if (event.key === 'ArrowUp') {
				action = 'move_up';
			} else if (event.key === 'ArrowDown') {
				action = 'move_down';
			}
			if (action){
				socket.send(JSON.stringify({
					'action': action,
					'player_id': '2'
				}));
			}
		
			action = null;
			if (event.key === 'w') {
				action = 'move_up';
			} else if (event.key === 's') {
				action = 'move_down';
			}
			if (action){
				socket.send(JSON.stringify({
					'action': action,
					'player_id': '1'
				}));
			}
		});

		document.addEventListener('keyup', (event) => {
			socket.send(JSON.stringify({
				'action': 'noo',
				'player_id' : '1'
			}));
		});
	}
}

function startGame(gameData)
{
	draw();
	console.log("status: " + gameData.status);
	
	let checkStatus = setInterval(() => {
		if (gameData.status === 'start_game') {
			clearInterval(checkStatus);
			console.log("Game is starting.");
			connect_socket();
		}
		else{
            fetch('/game_status/'+gameData.roomId).then(response => response.json()).then(data => gameData.status = data.status);
        }
	}, 500);
}
