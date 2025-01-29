function launchGame() {
const gameContainer = document.querySelector('#online-game-container');
const canvas = gameContainer.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = 1400;
canvas.height = 1000;
const color = '#281f79'

canvas.style.width = (canvas.width / 2) + 'px';
canvas.style.height = (canvas.height / 2) + 'px';

// Paramètres initiaux (seront mis à jour par les données du WebSocket)
const ball_size = 20;
const paddle_height = 120;
const paddle_width = 15; 

let ball = {x: canvas.width / 2 - (ball_size / 2), y: canvas.height / 2 - (ball_size / 2)};

let player1Y = canvas.height / 2 - (paddle_height / 2);
let player2Y = canvas.height / 2 - (paddle_height / 2);
let p1_score = 0
let p2_score = 0
let round_nb = 0

// Fonction pour dessiner le jeu
function draw() {
    // Clear the Canvas
	context.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	);

	// Set the fill style to black
	context.fillStyle = color;

	// Draw the background
	context.fillRect(
		0,
		0,
		canvas.width,
		canvas.height
	);

	context.fillStyle = '#ff79d1';
	context.shadowOffsetX = -1;
	context.shadowOffsetY = 0;
	context.shadowBlur = 15;
	context.shadowColor = '#ff79d1';

	// Draw the Player1
	context.fillRect(
		50,
		player1Y,
		paddle_width,
		paddle_height
	);

	// Draw the Player2
	context.fillRect(
		canvas.width - 50 - paddle_width,
		player2Y,
		paddle_width,
		paddle_height
	);

	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;

	// Draw the net (Line in the middle)
	context.beginPath();
	context.setLineDash([7, 15]);
	context.moveTo((canvas.width / 2), canvas.height - 140);
	context.lineTo((canvas.width / 2), 140);
	context.lineWidth = 10;
	context.strokeStyle = '#4bdae0';
	context.stroke();

	// Set the default canvas font and align it to the center
	context.font = '100px Impact';
	context.textAlign = 'center';

	context.fillStyle = '#ffffff';
	context.shadowOffsetX = -1;
	context.shadowOffsetY = 0;
	context.shadowBlur = 15;
	context.shadowColor = '#ffffff';

	// Draw the Ball
	context.fillRect(
		ball.x,
		ball.y,
		ball_size,
		ball_size
	);

	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;

	// Draw the players score
	context.fillText(
		p1_score, // Left score
		(canvas.width / 2) - 300,
		200
	);
	context.fillText(
		p2_score, // Right score
		(canvas.width / 2) + 300,
		200
	);

	context.font = '50px Impact';
	context.textAlign = 'center';

	context.fillStyle = '#eba811';
	context.shadowOffsetX = -1;
	context.shadowOffsetY = 0;
	context.shadowBlur = 15;
	context.shadowColor = '#eba811';

	// Draw the current round number
	context.fillText(
		"Round " + round_nb,
		(canvas.width / 2),
		100
	);

	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.shadowBlur = 0;
}

// WebSocket
const socket = new WebSocket('ws://' + window.location.host + '/ws/myapp/game/');

socket.onopen = function(e) {
    console.log("WebSocket drawGame open");
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Mettre à jour les coordonnées avec les données reçues
    ball = data.ball;
    player1Y = data.player1_y;
	player2Y = data.player2_y;
	p1_score = data.p1_score;
	p2_score = data.p2_score;
	round_nb = data.round_nb;

    // Redessiner le jeu
    draw();
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
			'action': action
		}));
	}
});

document.addEventListener('keyup', (event) => {
	socket.send(JSON.stringify({
		'action': 'noo'
	}));
});

// Dessin initial
draw();

// Difficulty selection
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
difficultyButtons.forEach(button => {
	button.addEventListener('click', (event) => {
		const difficulty = event.target.id; // 'easy', 'medium', 'hard'
		socket.send(JSON.stringify({ action: 'set_difficulty', difficulty }));

		// Highlight the selected difficulty
		difficultyButtons.forEach(btn => btn.classList.remove('selected'));
		event.target.classList.add('selected');
	});
});
}