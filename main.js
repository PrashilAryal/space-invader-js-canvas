const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const player = new Player();
const meteor = new Meteor();
const gameOver = new GameOver();

const bg = new Background(0, 0);
const bg2 = new Background(0, -bg.size.height);

const backgroundSound = new Audio();

let allBg = [];

let bullets = [];
let enemies = [];

let gameScore = 0;
const start = document.getElementById("startGame");
const restart = document.getElementById("restartGame");
const modalStart = document.getElementById("modalStart");
const modalRestart = document.getElementById("modalRestart");
const gameOverScore = document.getElementById("gameOverScore");

modalRestart.style.display = "none";
function init() {
  bullets = [];
  enemies = [];
  gameScore = 0;
  gameInterval = setInterval(() => {
    const enemy = new Enemy();
    enemies.push(enemy);
    gameScore++;
  }, 1000);
}

let animate;

// const totalEnemies = 1;

let gameInterval = setInterval(() => {
  const enemy = new Enemy();
  enemies.push(enemy);
  gameScore++;
}, 1000);

// playBackgroundMusic();

function gameLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  // game logic
  bg.update();
  bg2.update();
  meteor.update();
  player.update();
  for (let i = 0; i < enemies.length; i++) {
    // enemies[i].update(player.position.x, player.position.y);
    enemies[i].update(player);
    // if (!enemies[i].isHit) {
    // enemies[i].playerCollision(player);
    // enemies[i].bulletCollision(bullets);
    // }
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
  }
  console.log("is Alive: ", player.isAlive);

  // c.clearRect(0, 0, 50, 60);
  c.beginPath();
  c.fillStyle = "white";
  c.font = "30px sans serif";
  c.fillText(gameScore, 15, 30);

  if (!player.isAlive) {
    clearInterval(gameInterval);
    backgroundSound.pause();
    gameOver.update();
    gameOverScore.innerHTML = gameScore;
    // modalStart.style.display = "flex";
    cancelAnimationFrame(animate);
    modalRestart.style.display = "flex";
  }
  animate = requestAnimationFrame(gameLoop);
}
// gameLoop();

function playBackgroundMusic() {
  backgroundSound.src = "./sounds/backgroundMusic.ogg";
  backgroundSound.play();
  backgroundSound.volume = 0.2;
  backgroundSound.loop = true;
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    // console.log("Space");
    bullets.push(new Bullet(player.position.x, player.position.y));
    playBulletFire();
  }
  if (event.code === "ArrowUp") {
    player.velocity.y = -5;
  }
  if (event.code === "ArrowDown") {
    player.velocity.y = 5;
  }
  if (event.code === "ArrowRight") {
    player.velocity.x = 5;
  }
  if (event.code === "ArrowLeft") {
    player.velocity.x = -5;
  }
  if (event.code === "KeyM") playBackgroundMusic();
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    console.log("Space");
  }
  if (event.code === "ArrowUp") {
    player.velocity.y = 0;
  }
  if (event.code === "ArrowDown") {
    player.velocity.y = 0;
  }
  if (event.code === "ArrowRight") {
    player.velocity.x = 0;
  }
  if (event.code === "ArrowLeft") {
    player.velocity.x = 0;
  }
});

start.addEventListener("click", () => {
  console.log("start");
  // init();
  gameLoop();
  modalStart.style.display = "none";
});
restart.addEventListener("click", () => {
  console.log("restart");
  player.isAlive = true;
  init();
  gameLoop();
  modalRestart.style.display = "none";
});
