this.canvas = document.querySelector('canvas');
this.context = this.canvas.getContext('2d');

this.canvas.width = 1400;
this.canvas.height = 1000;
this.color = '#281f79' //background color

this.canvas.style.width = (this.canvas.width / 2) + 'px';
this.canvas.style.height = (this.canvas.height / 2) + 'px';

this.ball_size = 20;
this.paddle_height = 120;
this.paddle_width = 15; 

this.ball = {x: this.canvas.width / 2 - (ball_size / 2), y: this.canvas.height / 2 - (ball_size / 2)};
this.player1 = {};
this.player2 = {};
let player_nb = '1';
let round_nb = 0
this.game_status = 'waiting'
let winner = 'Michel'

// Fonction pour dessiner le jeu
function draw(status) {
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

	if (status == 'playing')
	{
		this.context.fillStyle = this.player1.color;
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = this.player1.color;
	
		// Draw the Player1
		this.context.fillRect(
			50,
			this.player1.y,
			this.paddle_width,
			this.paddle_height
		);
	
		this.context.fillStyle = this.player2.color;
		this.context.shadowColor = this.player2.color;
	
		// Draw the Player2
		this.context.fillRect(
			this.canvas.width - 50 - this.paddle_width,
			this.player2.y,
			this.paddle_width,
			this.paddle_height
		);
	
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
	}

	// Draw the net (Line in the middle)
	this.context.beginPath();
	this.context.setLineDash([7, 15]);
	this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
	this.context.lineTo((this.canvas.width / 2), 140);
	this.context.lineWidth = 10;
	this.context.strokeStyle = '#4bdae0';
	this.context.stroke();

	if (status == 'waiting')
	{
		this.context.fillStyle = '#ff79d1';
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = '#ff79d1';
			this.context.fillRect(
				this.canvas.width / 2 - 350,
				this.canvas.height / 2 - 48,
				700,
				100);
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
		this.context.fillStyle = '#ffffff';
		this.context.font = '50px Impact';
		this.context.fillText('Waiting for players...',
			this.canvas.width / 2 - 200,
			this.canvas.height / 2 + 15);
		return;
	}

	if (status == 'over')
	{
		this.context.fillStyle = '#ff79d1';
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = '#ff79d1';
			this.context.fillRect(
				this.canvas.width / 2 - 350,
				this.canvas.height / 2 - 48,
				700,
				100);
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
		this.context.fillStyle = '#ffffff';
		this.context.font = '50px Impact';
		this.context.fillText(winner + ' won!',
			this.canvas.width / 2 - 50,
			this.canvas.height / 2 + 15);
	}

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
		this.ball.x,
		this.ball.y,
		this.ball_size,
		this.ball_size
	);

	this.context.shadowOffsetX = 0;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 0;

	// Draw the players score
	this.context.fillText(
		this.player1.score, // Left score
		(this.canvas.width / 2) - 300,
		200
	);
	this.context.fillText(
		this.player2.score, // Right score
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
	const socket = new WebSocket('ws://' + window.location.host + '/ws/myapp/game/' + gameData.matchID + '/');

	socket.onopen = function(e) {
		console.log("WebSocket drawGame open");
		player_id = gameData.player1;
		if (player_nb == '2'){
			player_id = gameData.player2;
		}
		socket.send(JSON.stringify({
			'type': 'game_init',
			'player_id': player_id,
			'player_nb': player_nb
		}));
		console.log("sent:\nplayer_id: " + player_id + "\nplayer_nb: " + player_nb + "\n");
	};

	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);

		switch (data.type) {
			case 'game_info':
				if (player_nb === '1'){
					player1.id = data.player_id;
					player1.name = data.player_name;
					player1.color = data.player_color;

					player2.id = data.opp_id;
					player2.name = data.opp_name;
					player2.color = data.opp_color;

					player1.y = 1000 / 2 - (120 / 2);
					player1.side = 'left';
					player1.score = 0;
					player2.y = 1000 / 2 + (120 / 2);
					player2.side = 'right'
					player2.score = 0;
				}
				else{
					player1.id = data.opp_id;
					player1.name = data.opp_name;
					player1.color = data.opp_color;
					
					player2.id = data.player_id;
					player2.name = data.player_name;
					player2.color = data.player_color;

					player1.y = 1000 / 2 + (120 / 2);
					player1.side = 'right';
					player1.score = 0;
					player2.y = 1000 / 2 - (120 / 2);
					player2.side = 'left'
					player2.score = 0;
				}
				draw('playing');
				break;

			case 'game_state':
				ball = data.ball;
				player1.y = data.player1_y;
				player2.y = data.player2_y;
				player1.score = data.player1_score;
				player2.score = data.player2_score;
				round_nb = data.round_nb;
				this.game_status = data.status
				draw(this.game_status);
				break;
			
			case 'game_over':
				winner = data.winner;
				console.log(player_nb + " received a game over notification.\n");
				draw('over');
				break;
		}
	};

	socket.onclose = function(e) {
		console.error('Socket WebSocket closed (error)');
	};

	socket.onerror = function(err) {
		console.error('Error WebSocket :', err);
	};

	document.addEventListener('keydown', (event) => {
		let action = null;
		if (event.key === 'ArrowUp') {
			action = 'move_up';
		} else if (event.key === 'ArrowDown') {
			action = 'move_down';
		}
		if (action){
			socket.send(JSON.stringify({
				'type': 'action',
				'action': action,
				'player_nb': player_nb
			}));
		}
	});

	document.addEventListener('keyup', (event) => {
		socket.send(JSON.stringify({
			'type': 'action',
			'action': 'noo',
			'player_nb': player_nb
		}));
	});
}

function startGame(gameData)
{
	let status = gameData.status

	console.log("Match_id: " + gameData.matchID);
	console.log("Status: " + gameData.status);
	player_id = gameData.player1;
	if (gameData.player2.length){
		player_id = gameData.player2;
		player_nb = '2';
	}
	console.log("Player_id: " + player_id);

	const socket = new WebSocket('ws://' + window.location.host + '/ws/myapp/game/');

	socket.onopen = function(e) {
		console.log("WebSocket state open");
		socket.send(JSON.stringify({
			'match_id': gameData.matchID,
			'player_id': player_id
		}))
	};

	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);
		status = data.status;

		console.log("Received new match status: " + status);

		draw('waiting');
		if (status === 'ready')
		{
			console.log("Game is starting.");
			connect_socket();
		}
		else if (status === 'full')
		{
			console.log("Game is full, exiting");
			return;
		}
	};

	socket.onclose = function(e) {
		console.error('Socket WebSocket closed (error)');
	};
	socket.onerror = function(err) {
		console.error('Error WebSocket :', err);
	};
}
