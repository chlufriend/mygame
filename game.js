let player = { x: 200, y: 200, size: 20 };
let enemies = [];
let score = 0;
let startButton;
let gameState = "START"
let gameOver = false;
let baseSpeedFactor = 1.0;
let speedIncreaseRate = 0.005;
let highScore = 0;

let shieldEndTime = 0;
let shieldItem ={x: 0, y: 0, size: 15, isPresent: false};

function setup() {
  createCanvas(400, 400);
  startButton = createButton('START GAME');
  startButton.position(windowWidth / 2 - 50, windowHeight / 2);
  startButton.mousePressed(startGame);
  
  let savedHighScore = localStorage.getItem("dodgeGameHighScore");
  if (savedHighScore !== null){
    highScore = parseInt(savedHighScore);
  }

  initEnemies();
}

function initEnemies() {
  enemies = [];
  // 创建多个敌人
  for (let i = 0; i < 5; i++) {
    enemies.push({
      x: random(400),
      y: random(400),
      speedX: random(2, 2),
      speedY: random(2, 2)
    });
  }
}

function spawnShieldItem() {
  shieldItem.x = random(40, 360);
  shielditem.y = random(40, 360);
  ShieldItem.isPresent = true:

function startGame(){
  gameState = "PLAYING";
  startButton.hide();
  score = 0;
  player.x = 200;
  player.y = 200;

  baseSpeedFactor = 1.0;
  player.isInvincible = false;
  spawnShieldItem();
  initEnemies();
}


function draw() {
  background(30);

  if (gameState === "START"){
    fill(255);
    textAlign(CENTER);
    textSize(30);
    text("Dodge game", width / 2, 120);

  textSize(18);
    fill(255,215,0);
    text("highScore" + highScore, width / 2, 170);

    return;
    
  }

  let isInvincible = millis() < shieldEndTime;

  if (shieldItem.isPresent){
    fill(0, 255, 100);
    noStroke();
    ellipse(shieldItem.x, shieldItem.y, shieldItem.size);

    fill(255,255,255,150);
    ellipse(shieldItem.x, shieldItem.y, shieldItem.size * 0.5);

    let itemDist = dist(player.x, player.y, shieldItem.x, shieldItem.y);
    if (itemDist < (player.size/2 + shieldItem.size/2)) {
      shieldItem.isPresent = false;
      shieldEndTime = millis() + 5000;
    }
  }
  // 玩家
  fill(0, 150, 255);
  ellipse(player.x, player.y, player.size);

  if(isInvincible) {
    noFill();
    stroke(0, 255, 100, 150);
    strokeWeight(3);
    ellipse(player.x, player.y, player.size + 15);
    noStroke();
  }

  // 控制
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= 6;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += 6;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) player.y -= 6;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) player.y += 6;

  // 限制边界
  player.x = constrain(player.x, 0, 400);
  player.y = constrain(player.y, 0, 400);

baseSpeedFactor += speedIncreaseRate
  
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
      if (isInvincible) {
        e.speedX *= -1;
        e.speedY *= -1;
        continue;
      }
      gameState = "GAMEOVER";
      
      let isNewRecord = false;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem("dodgeGameHighScore", highScore);
        isNewRecord = true;
      }

      if(isNewRecord) {
        alert("New Record! \nyour score is: " + score);
      } else{
        alert("💥 Game over! Your score is: " + score);
      }

      startButton.show ();
      gameState = "START"
      
    }
  }

  // 分数
  score++;
  fill(255);
  textSize(16);
  text("分数: " + score, 10, 20);

  fill(255,215,0);
  text("highScore: " + highScore, 10, 40);
}






