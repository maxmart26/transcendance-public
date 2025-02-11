var renderer, scene, camera, pointLight, spotLight;

var fieldWidth = 400, fieldHeight = 200;
var paddleWidth, paddleHeight, paddleDepth, paddleQuality;
var paddle1DirY = 0, paddle2DirY = 0, paddleSpeed = 3;
var ball, paddle1, paddle2;
var ballDirX = 1, ballDirY = 1, maxBallSpeed = 1.5, ballSpeed = 0.3;
var score1 = 0, score2 = 0;
var maxScore = 7;

function setup() {
    score1 = 0;
    score2 = 0;
    createScene();
    draw();
}

function createScene() {
    var WIDTH = 900,
    HEIGHT = 600;
    var VIEW_ANGLE = 50,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

    var c = document.getElementById("gameCanvas");

    renderer = new THREE.WebGLRenderer({ antialias: true });
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    scene = new THREE.Scene();
    scene.add(camera);
    camera.position.z = 320;

    renderer.setSize(WIDTH, HEIGHT);
    c.appendChild(renderer.domElement);

    var planeWidth = fieldWidth,
    planeHeight = fieldHeight,
    planeQuality = 10;

    var paddle1Material = new THREE.MeshLambertMaterial({
    color: 0xdb32d8
    });
    var paddle2Material = new THREE.MeshLambertMaterial({
    color: 0xdb32d8
    });
    var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0x151517
    });
    var tableMaterial = new THREE.MeshLambertMaterial({
    color: 0x0e47f0
    });
    Texture = new THREE.ImageUtils.loadTexture("/media/textures/floor.jpg");
    var groundMaterial = new THREE.MeshLambertMaterial({ map: Texture });

    var plane = new THREE.Mesh(
    new THREE.PlaneGeometry(
        planeWidth * 0.95,
        planeHeight,
        planeQuality,
        planeQuality
    ),
    planeMaterial
    );

    scene.add(plane);
    plane.receiveShadow = true;

    var table = new THREE.Mesh(
    new THREE.CubeGeometry(
        planeWidth * 1.05,
        planeHeight * 1.03,
        100,
        planeQuality,
        planeQuality,
        1
    ),
    tableMaterial
    );
    table.position.z = -51;
    scene.add(table);
    table.receiveShadow = true;

    var radius = 6,
    segments = 6,
    rings = 6;

    var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xff7305
    });

    ball = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    sphereMaterial
    );
    scene.add(ball);

    ball.position.x = 0;
    ball.position.y = 0;
    ball.position.z = radius;
    ball.receiveShadow = true;
    ball.castShadow = true;

    paddleWidth = 12;
    paddleHeight = 35;
    paddleDepth = 10;
    paddleQuality = 2;

    paddle1 = new THREE.Mesh(
    new THREE.CubeGeometry(
        paddleWidth,
        paddleHeight,
        paddleDepth,
        paddleQuality,
        paddleQuality,
        paddleQuality
    ),
    paddle1Material
    );

    scene.add(paddle1);
    paddle1.receiveShadow = true;
    paddle1.castShadow = true;

    paddle2 = new THREE.Mesh(
    new THREE.CubeGeometry(
        paddleWidth,
        paddleHeight + 5,
        paddleDepth,
        paddleQuality,
        paddleQuality,
        paddleQuality
    ),
    paddle2Material
    );

    scene.add(paddle2);
    paddle2.receiveShadow = true;
    paddle2.castShadow = true;

    paddle1.position.x = -fieldWidth / 2 + paddleWidth;
    paddle1.position.z = paddleDepth;

    paddle2.position.x = fieldWidth / 2 - paddleWidth;
    paddle2.position.z = paddleDepth;

    var ground = new THREE.Mesh(
    new THREE.CubeGeometry(2000, 1000, 3, 1, 1, 1),
    groundMaterial
    );
    ground.position.z = -132;
    ground.receiveShadow = true;
    scene.add(ground);
    pointLight = new THREE.PointLight(0xff85e7);

    pointLight.position.x = -1000;
    pointLight.position.y = 0;
    pointLight.position.z = 1000;
    pointLight.intensity = 2.9;
    pointLight.distance = 10000;
    scene.add(pointLight);

    spotLight = new THREE.SpotLight(0xff21d3);
    spotLight.position.set(0, 0, 460);
    spotLight.intensity = 1.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    renderer.shadowMapEnabled = true;
}

function draw() {
    if (getCurrentTab() === 'game-page'){
        renderer.render(scene, camera);
        requestAnimationFrame(draw);

        move_ball();
        paddle_bounce();
        cameraPhysics();
        move_player1();
        move_player2();
    }
}

function move_ball() {
    if (ball.position.x >= fieldWidth / 2) {
        score1++;
        document.getElementById("scores").innerHTML = score1 + "-" + score2;
        resetBall(1);
        check_score();
    }
    if (ball.position.x <= -fieldWidth / 2) {
        score2++;
        document.getElementById("scores").innerHTML = score1 + "-" + score2;
        resetBall(2);
        check_score();
    }
    if (ball.position.y <= -fieldHeight / 2) 
        ballDirY = -ballDirY;
    if (ball.position.y >= fieldHeight / 2)
        ballDirY = -ballDirY;

    ball.position.x += ballDirX * ballSpeed;
    ball.position.y += ballDirY * ballSpeed;

    if (ballSpeed < maxBallSpeed) ballSpeed += 0.01;
    else ballSpeed = maxBallSpeed;
}

window.addEventListener('keyup', function(event) { keyPress.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { keyPress.onKeydown(event); }, false);

var keyPress = {
    _pressed: {},

    A: 65,
    D: 68,
    LEFT: 37,
    RIGHT: 39,
    
    isDown: function(keyCode) {
        return this._pressed[keyCode];},
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;},
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];}
};

function move_player1() {
    if (keyPress.isDown(keyPress.A))
    {
        if (paddle1.position.y < fieldHeight * 0.45)
        paddle1DirY = paddleSpeed * 0.5;
        else 
        paddle1DirY = 0;
    } 
    else if (keyPress.isDown(keyPress.D))
    {
        if (paddle1.position.y > -fieldHeight * 0.45)
            paddle1DirY = -paddleSpeed * 0.5;
        else
            paddle1DirY = 0;
    } 
    else
        paddle1DirY = 0;
    paddle1.position.y += paddle1DirY;
}

function move_player2() {
    if (keyPress.isDown(keyPress.LEFT))
    {
        if (paddle2.position.y < fieldHeight * 0.45)
            paddle2DirY = paddleSpeed * 0.5;
    else
      paddle2DirY = 0;
    }
    else if (keyPress.isDown(keyPress.RIGHT))
    {
        if (paddle2.position.y > -fieldHeight * 0.45)
            paddle2DirY = -paddleSpeed * 0.5;
        else
            paddle2DirY = 0;
    } 
    else
        paddle2DirY = 0;
    paddle2.position.y += paddle2DirY;
}

function cameraPhysics() {
    camera.position.x = paddle1.position.x - 100;
    camera.position.y += (camera.position.y) * 0.05;
    camera.position.z = paddle1.position.z + 100 + 0.04 * (paddle1.position.x);
    camera.rotation.x = -0.01 * Math.PI / 180;
    camera.rotation.y = -60 * Math.PI / 180;
    camera.rotation.z = -90 * Math.PI / 180;
}

function paddle_bounce() {
    if (ball.position.x <= paddle1.position.x + paddleWidth && ball.position.x >= paddle1.position.x) 
    {
    if (ball.position.y <= paddle1.position.y + paddleHeight / 2 && ball.position.y >= paddle1.position.y - paddleHeight / 2)
    {
        if (ballDirX < 0) {
            ballDirX = -ballDirX;
            ballDirY -= paddle1DirY * 0.7;
        }
    }
    }
    if (ball.position.x <= paddle2.position.x + (paddleWidth + 5) && ball.position.x >= paddle2.position.x)
    {
        if (ball.position.y <= paddle2.position.y + (paddleHeight + 5) / 2 && ball.position.y >= paddle2.position.y - (paddleHeight + 5) / 2)
        {
            if (ballDirX > 0)
            {
                ballDirX = -ballDirX;
                ballDirY -= paddle2DirY * 0.7;
            }
        }
    }
}

function resetBall(loser) {
    ball.position.x = 0;
    ball.position.y = 0;

    if (loser == 1)
        ballDirX = -1;
    else
        ballDirX = 1;

    ballDirY = 1;
    ballSpeed = 0.5;
}

function check_score() {
    if (score1 >= maxScore) {
        ballSpeed = 0;
        document.getElementById("scores").innerHTML = "Player1 wins!";
    } 
    else if (score2 >= maxScore) {
        ballSpeed = 0;
        document.getElementById("scores").innerHTML = "Player2 wins!";
    }
}

