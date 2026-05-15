let player = { x: 200, y: 200, size: 20 };
let enemies = [];
let score = 0;
let startButton;
let gameState = "START"
let gameOver = false;
let baseSpeedFactor = 1.0;
let speedIncreaseRate = 0.005;


function setup() {
  createCanvas(400, 400);
  startButton = createButton('START GAME');
  startButton.position(windowWidth / 2 - 50, windowHeight / 2);
  startButton.mousePressed(startGame);

  initEnemies();
}

function initEnemies() {
  enemies = [];
  // 创建多个敌人
  for (let i = 0; i < 4; i++) {
    enemies.push({
      x: random(400),
      y: random(400),
      speedX: random(1, 3),
      speedY: random(1, 3)
    });
  }
}

function startGame(){
  gameState = "PLAYING";
  startButton.hide();
  score = 0;
  player.x = 200;
  player.y = 200;

  baseSpeedFactor = 1.0;
  intiEnemies();
}


function draw() {
  background(30);

  if (gameState === "START"){
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("Dodge game", width / 2, 120);

    return;
    
  }

  // 玩家
  fill(0, 150, 255);
  ellipse(player.x, player.y, player.size);

  // 控制
  if (keyIsDown(LEFT_ARROW)) player.x -= 4;
  if (keyIsDown(RIGHT_ARROW)) player.x += 4;
  if (keyIsDown(UP_ARROW)) player.y -= 4;
  if (keyIsDown(DOWN_ARROW)) player.y += 4;

  // 限制边界
  player.x = constrain(player.x, 0, 400);
  player.y = constrain(player.y, 0, 400);

  baseSpeedFactor += speedIncreaseRate;

  // 敌人
  fill(255, 50, 50);
  for (let e of enemies) {
    e.x += e.speedX * baseSpeedFactor;
    e.y += e.speedY * baseSpeedFactor;

    // 碰墙反弹
    if (e.x < 0 || e.x > 400) e.speedX *= -1;
    if (e.y < 0 || e.y > 400) e.speedY *= -1;

    ellipse(e.x, e.y, 20);

    // 碰撞检测
    let d = dist(player.x, player.y, e.x, e.y);
    if (d < 20) {
      gameState = "GAMEOVER";
      alert("💥 Game over! Your score is: " + score);

      startButton.show ();
      gameState = "START"
      
    }
  }

  // 分数
  score++;
  fill(255);
  textSize(16);
  text("分数: " + score, 10, 20);
}


