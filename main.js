const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

const player = new Player();
const meteor = new Meteor();

const bg = new Background(0, 0);
const bg2 = new Background(0, -bg.size.height);

const backgroundSound = new Audio();

let allBg = [];

let bullets = [];
let enemies = [];

let gameScore = 0;

// const totalEnemies = 1;

const gameInterval = setInterval(() => {
  const enemy = new Enemy();
  enemies.push(enemy);
  gameScore++;
}, 1000);

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
  }
  requestAnimationFrame(gameLoop);
}
gameLoop();

function playBackgroundMusic() {
  backgroundSound.src = "./sounds/bulletFire.ogg";
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
