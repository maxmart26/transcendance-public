this.canvas = document.querySelector('canvas');
this.context = this.canvas.getContext('2d');

this.canvas.width = 1400;
this.canvas.height = 1000;
this.color = '#281f79' //background color
this.diff_color = {'easy': '#33cc4c', 'medium': '#faec2d', 'hard': '#d1332e'};

this.canvas.style.width = (this.canvas.width / 2) + 'px';
this.canvas.style.height = (this.canvas.height / 2) + 'px';

this.ball_size = 20;
this.paddle_height = 120;
this.paddle_width = 15; 

this.ball = {x: this.canvas.width / 2 - (ball_size / 2), y: this.canvas.height / 2 - (ball_size / 2)};
this.player1 = {};
this.player2 = {};
this.podium = ['Waiting...', 'Waiting...', 'Waiting...'];

this.round_nb = 0;
this.winner = 'Michel';

this.match_id;
this.player_id;
this.player_nb;
this.difficulty;
this.finals = false;
var bracket;

this.socket = null;

function getCookieValue(cookieName) {
	const name = cookieName + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const cookieArray = decodedCookie.split(';');
  
	for (let i = 0; i < cookieArray.length; i++) {
	  let cookie = cookieArray[i];
	  while (cookie.charAt(0) === ' ') {
		cookie = cookie.substring(1);
	  }
	  if (cookie.indexOf(name) === 0) {
		return cookie.substring(name.length, cookie.length);
	  }
	}
	return "Undefined";
  }

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

	if (status == 'podium')
	{
		this.context.font = '80px Audiowide';
		this.context.textAlign = 'center';

		this.context.fillStyle = '#ff79d1';
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
		//box #1
		this.context.fillRect(
			(this.canvas.width / 2) - 90,
			315,
			180,
			505
		);
		//box #2
		this.context.fillRect(
			(this.canvas.width / 2) - 410,
			565,
			225,
			250
		);
		//box #3
		this.context.fillRect(
			(this.canvas.width / 2) + 175,
			665,
			255,
			150
		);

		this.context.fillStyle = '#ffffff'
		this.context.shadowColor = '#4bdae0';
		this.context.font = '100px Audiowide';
		this.context.fillText(
			this.podium[0],
			(this.canvas.width / 2),
			300
		);
		this.context.font = '85px Audiowide';
		this.context.fillText(
			this.podium[1],
			(this.canvas.width / 2) - 300,
			550
		);
		this.context.font = '70px Audiowide';
		this.context.fillText(
			this.podium[2],
			(this.canvas.width / 2) + 300,
			650
		);

		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;

		this.context.font = '120px Audiowide';
		this.context.fillStyle = '#ffd700';
		this.context.shadowColor = '#ffd700';
		this.context.fillText(
			"1",
			(this.canvas.width / 2),
			408
		);
		this.context.fillStyle = '#c0c0c0'
		this.context.shadowColor = '#c0c0c0';
		this.context.fillText(
			"2",
			(this.canvas.width / 2) - 300,
			657
		);
		
		this.context.fillStyle = '#b87333'
		this.context.shadowColor = '#b87333';
		this.context.fillText(
			"3",
			(this.canvas.width / 2) + 300,
			757
		);

		this.context.fillStyle = '#ffffff'
		this.context.shadowColor = '#4bdae0';
		this.context.font = '50px Audiowide';
		this.context.fillText(
			"- TOURNAMENT -",
			(this.canvas.width / 2),
			60
		);
		return;
	}

	if (status == 'playing' || status == 'over')
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

	this.context.font = '50px Audiowide';
	this.context.textAlign = 'center';
	this.context.shadowOffsetX = -1;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 15;

	this.context.fillStyle = '#ffffff'
	this.context.shadowColor = '#4bdae0';

	this.context.fillText(
		"- TOURNAMENT -",
		(this.canvas.width / 2),
		60
	);

	this.context.fillStyle = '#eba811';
	this.context.shadowColor = '#eba811';

	// Draw the net (Line in the middle)
	this.context.beginPath();
	this.context.setLineDash([7, 15]);
	this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
	this.context.lineTo((this.canvas.width / 2), 140);
	this.context.lineWidth = 10;
	this.context.strokeStyle = '#4bdae0';
	this.context.stroke();

	this.context.font = '50px Audiowide';
	this.context.textAlign = 'center';

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
		this.context.shadowBlur = 0;
		this.context.fillStyle = '#ffffff';
		this.context.fillText('Waiting for players...',
			this.canvas.width / 2,
			this.canvas.height / 2 + 15);
		return;
	}

	// Draw the current round number
	this.context.fillText(
		"Round " + round_nb,
		(this.canvas.width / 2),
		125
	);

	//Dessiner le score du BO
	if (player1.score_bo > 0)
		this.context.fillRect(
			(this.canvas.width / 2) - 120 - 40,
			100,
			35,
			15
		);

	if (player1.score_bo > 1)
		this.context.fillRect(
			(this.canvas.width / 2) - 120 - 90,
			100,
			35,
			15
		);

	if (player2.score_bo > 0)
		this.context.fillRect(
			(this.canvas.width / 2) + 85 + 40,
			100,
			35,
			15
		);

	if (player2.score_bo > 1)
		this.context.fillRect(
			(this.canvas.width / 2) + 85 + 90,
			100,
			35,
			15
		);

	this.context.shadowOffsetX = 0;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 0;

	if (player_nb == 'spectator')
	{
		this.context.fillStyle = '#ffffff'
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = '#4bdae0';
	
		// Draw the difficulty
		this.context.fillText(
			'SPECTATOR',
			(this.canvas.width / 2),
			this.canvas.height - 50
		);
	
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
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
				this.context.fillStyle = '#ffffff'
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = '#4bdae0';
		
		if (!finals){
			this.context.fillText(
				'Waiting for next game...',
				(this.canvas.width / 2),
				this.canvas.height - 50
			);
		}

		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
		this.context.fillStyle = '#ffffff';
		this.context.textAlign = 'center';
		this.context.font = '50px Audiowide';
		this.context.fillText(winner + ' won!',
			this.canvas.width / 2,
			this.canvas.height / 2 + 20);
		return;
	}

	if (finals && player_nb !== 'spectator')
	{
		this.context.fillStyle = '#ffd700'
		this.context.shadowOffsetX = -1;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 15;
		this.context.shadowColor = '#ffd700';

		this.context.fillText(
			'FINALS',
			(this.canvas.width / 2),
			this.canvas.height - 50
		);
	
		this.context.shadowOffsetX = 0;
		this.context.shadowOffsetY = 0;
		this.context.shadowBlur = 0;
	}

	this.context.shadowOffsetX = -1;
	this.context.shadowOffsetY = 0;
	this.context.shadowBlur = 15;
	this.context.font = '40px Audiowide';
	this.context.textAlign = 'center';
	this.context.fillStyle = '#ffffff'
	this.context.shadowColor = '#4bdae0';

	this.context.fillText(
		player1.name,
		(this.canvas.width / 4),
		this.canvas.height - 50
	);
	this.context.fillText(
		player2.name,
		3 * (this.canvas.width / 4),
		this.canvas.height - 50
	);

	this.context.font = '100px Audiowide';
	this.context.textAlign = 'center';

	this.context.fillStyle = '#ffffff';
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

}

function start_game(socket)
{	
	socket.send(JSON.stringify({
		'type': 'match_start',
		'match_id': this.match_id
	}))
	console.log("Match starts.\n");
	draw('playing');
	
	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);
		console.log("Received new " + data.type + "\n");

		switch (data.type) {
			case 'game_state':
				ball = data.ball;
				player1.y = data.player1_y;
				player2.y = data.player2_y;
				player1.score = data.player1_score;
				player1.score_bo = data.player1_scorebo;
				player2.score = data.player2_score;
				player2.score_bo = data.player2_scorebo;
				round_nb = data.round_nb;
				this.status = data.status
				draw(this.status);
				break;
			
			case 'game_over':
				deleteCookie('match_id');
				winner = data.winner;
				if (winner == player1.name)
				{
					player1.score_bo++;
					var winner_id = player1.id;
				}
				else
				{
					player2.score_bo++;
					var winner_id = player2.id;
				}
				console.log(player_nb + " received a game over notification.\n");
				socket.close();
				draw('over');
				if (winner_id == player_id)
					var result = 'winner';
				else
					var result = 'loser';
				if (finals){
					socket_tourn.send(JSON.stringify({
						'type': 'end_tournament',
						'player_id': player_id,
						'match_id': this.match_id,
						'bracket': bracket,
						'result': result
					}));
				}
				else{
					bracket = result;
					socket_tourn.send(JSON.stringify({
						'type': 'get_next_game',
						'player_id': player_id,
						'match_id': this.match_id,
						'result': result
					}));
				}
				break;
		}
	};

	socket_tourn.onmessage = function(event) {
		const data = JSON.parse(event.data);
		console.log("Received new " + data.type + "\n");

		switch (data.type) {
			case 'next_game':
				if (bracket == data.bracket)
					document.cookie = "match_id=" + data.id;
				else
					break;
				finals=true;
				wait_cookie();
				function wait_cookie(){
					if (document.cookie.includes('match_id') && getCookieValue('match_id') !== 'Undefined' && getCookieValue('match_id') !== this.match_id)
						init_game();
					else
						setTimeout(wait_cookie, 100);
				}
				break;

			case 'podium':
				console.log("Podium: #1 " + data.first + ", #2" + data.second + ", #3 " + data.third);
				if (data.first && podium[0] === 'Waiting...')
					podium[0] = data.first;
				if (data.second && podium[1] === 'Waiting...')
					podium[1] = data.second;
				if (data.third && podium[2] === 'Waiting...')
					podium[2] = data.third;
				draw('podium');
				break;
		}
	};

	document.addEventListener('keydown', (event) => {
		let action = null;
		event.stopPropagation();
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
		event.stopPropagation();
		socket.send(JSON.stringify({
			'type': 'action',
			'action': 'noo',
			'player_nb': player_nb
		}));
	});
}

function kill()
{
	socket.send(JSON.stringify({
		'type': 'player_disconnect',
		'id': self.player_id
	}))
	socket.close();
}

function init_game()
{
	if (finals)
		draw('over');
	else
		draw('waiting');

	player_id = getCookieValue('user_id')
	this.match_id = getCookieValue('match_id')
	console.log("Match_id: " + this.match_id);
	console.log("Player_id: " + player_id);

	socket = new WebSocket('wss://' + window.location.host + '/ws/game/' + this.match_id + '/');

	socket.onopen = function(e) {
		console.log("WebSocket state open");
	};

	socket.onmessage = function(event) {
		const data = JSON.parse(event.data);

		console.log("Received new " + data.type + "\n");
		if (data.type === 'match_setup')
		{
			this.match_id = data.match_id;
			difficulty = data.difficulty;
			round_nb = 0;

			player1.id = data.player1;
			player1.name = data.player1_name;
			player1.color = data.player1_color;
			player1.y = 1000 / 2 - (120 / 2);
			player1.side = 'left';
			player1.score = 0;
			player1.score_bo = 0;
			player1.bo_scorex = 50;
			
			player2.id = data.player2;
			player2.name = data.player2_name;
			player2.color = data.player2_color;
			player2.y = 1000 / 2 + (120 / 2);
			player2.side = 'right'
			player2.score = 0;
			player2.score_bo = 0;
			player1.bo_scorex = 50;

			if (player1.id == player_id)
				player_nb = '1';
			else if (player2.id == player_id)
				player_nb = '2';
			else
				player_nb = 'spectator'

			console.log("game is all set");
			console.log("Player1: " + player1.name);
			console.log("Player2: " + player2.name);
			start_game(socket);
		}

	};

	socket.onclose = function(e) {
		console.error('Socket WebSocket closed');
	};
	socket.onerror = function(err) {
		console.error('Error WebSocket :', err);
	};
}
