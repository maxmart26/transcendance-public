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

// Fonction pour dessiner le jeu
function draw() {
    // Clear the Canvas
	this.context.clearRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);

	// Set the fill style to black
	this.context.fillStyle = this.color;

	// Draw the background
	this.context.fillRect(
		0,
		0,
		this.canvas.width,
		this.canvas.height
	);

	// Set the fill style to white (For the paddles and the ball)
	this.context.fillStyle = '#c156b2';

	// Draw the Player1
	this.context.fillRect(
		this.canvas.width / 2 - 610 - paddle_width,
		player1Y,
		paddle_width,
		paddle_height
	);

	// Draw the Player
	this.context.fillRect(
		this.canvas.width / 2 + 610,
		player2Y,
		paddle_width,
		paddle_height
	);

	// Draw the net (Line in the middle)
	this.context.beginPath();
	this.context.setLineDash([7, 15]);
	this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
	this.context.lineTo((this.canvas.width / 2), 140);
	this.context.lineWidth = 10;
	this.context.strokeStyle = '#4bdae0';
	this.context.stroke();

	// Set the default canvas font and align it to the center
	this.context.font = '100px Courier New';
	this.context.textAlign = 'center';

	this.context.fillStyle = '#ffffff';

	// Draw the Ball
	this.context.fillRect(
		ball.x,
		ball.y,
		ball_size,
		ball_size
	);

	// Draw the players score
	this.context.fillText(
		"9", // Left score
		(this.canvas.width / 2) - 300,
		200
	);
	this.context.fillText(
		"5", // Right score
		(this.canvas.width / 2) + 300,
		200
	);

	this.context.font = '50px Courier New';
	this.context.textAlign = 'center';

	this.context.fillStyle = '#eba811';

	// Draw the current round number
	this.context.fillText(
		"Round 4", //Round number
		(this.canvas.width / 2),
		100
	);
}

// WebSocket
const socket = new WebSocket('ws://' + window.location.host + '/ws/Pong/game/');

socket.onopen = function(e) {
    console.log("WebSocket drawGame open");
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    // Mettre à jour les coordonnées avec les données reçues
    ball = data.ball;
    //player1Y = data.player1_y;
	//player2Y = data.player2_y;

    // Redessiner le jeu
    draw();
};

socket.onclose = function(e) {
    console.error('Socket WebSocket closed (error)');
};

// socket.onerror = function(err) {
//     console.error('Error WebSocket :', err);
// };

// Dessin initial
draw();