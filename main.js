const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

c.textBaseLine = "middle";

const player = new Player();
const meteor = new Meteor();
const gameOver = new GameOver();

const bg = new Background(0, 0);
const bg2 = new Background(0, -bg.size.height);

let backgroundSound = new Audio();
let isMusicPlaying = false;
backgroundSound.src = "./sounds/backgroundMusic.ogg";
backgroundSound.volume = 0.2;
backgroundSound.loop = true;

let allBg = [];

let bullets = [];
let enemies = [];

let gameScore = 0;
const start = document.getElementById("startGame");
const restart = document.getElementById("restartGame");
const menuOption = document.getElementById("menuOption");
const menuOptionBtn = document.getElementById("menuOptionBtn");
const homeButton = document.getElementById("homeButton");
const modalStart = document.getElementById("modalStart");
const modalRestart = document.getElementById("modalRestart");
const modalMenuOption = document.getElementById("modalMenuOption");

const gameOverScore = document.getElementById("gameOverScore");

modalRestart.style.display = "none";
modalMenuOption.style.display = "none";
modalStart.style.display = "flex";
let gameInterval;

function init() {
  bullets = [];
  enemies = [];
  gameScore = 0;
  gameInterval = setInterval(() => {
    const enemy = new Enemy();
    enemies.push(enemy);
    gameScore++;
  }, 1000);
  modalRestart.style.display = "none";
}

let animate;

// const totalEnemies = 1;

// = setInterval(() => {
// const enemy = new Enemy();
// enemies.push(enemy);
// gameScore++;
// }, 1000);

// playBackgroundMusic();

let keys = {};
let spaceKeyPressed = false;

function handleKeyDown(event) {
  keys[event.code] = true;
}

function handleKeyUp(event) {
  keys[event.code] = false;
}

function handlePlayerActions() {
  if (keys["ArrowUp"]) {
    player.velocity.y = -5;
  } else if (keys["ArrowDown"]) {
    player.velocity.y = 5;
  } else {
    player.velocity.y = 0;
  }

  if (keys["ArrowRight"]) {
    player.velocity.x = 5;
  } else if (keys["ArrowLeft"]) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
  }

  if (keys["Space"] && !spaceKeyPressed) {
    spaceKeyPressed = true;
    bullets.push(new Bullet(player.position.x, player.position.y));
    playBulletFire();
    // To prevent continuous firing, consider adding a brief delay or limit
    // the number of bullets fired in a given time frame.
    setTimeout(() => {
      spaceKeyPressed = false;
    }, 500);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// document.addEventListener("keydown", (event) => {
//   handleKeyDown(event);

//   if (event.code === "Space") {
//     spaceKeyPressed = true;
//   }
// });

// document.addEventListener("keyup", (event) => {
//   handleKeyUp(event);

//   if (event.code === "Space") {
//     spaceKeyPressed = false;
//   }
// });

function gameLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  // game logic
  handlePlayerActions();
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
  animate = window.requestAnimationFrame(gameLoop);
}
// gameLoop();

function playBackgroundMusic() {
  if (!isMusicPlaying) {
    backgroundSound.play();
    isMusicPlaying = true;
  } else {
    backgroundSound.pause();
    isMusicPlaying = false;
  }
}

// document.addEventListener("keydown", (event) => {
//   if (event.code === "Space") {
//     // console.log("Space");
//     bullets.push(new Bullet(player.position.x, player.position.y));
//     playBulletFire();
//   }
//   if (event.code === "ArrowUp") {
//     player.velocity.y = -5;
//   }
//   if (event.code === "ArrowDown") {
//     player.velocity.y = 5;
//   }
//   if (event.code === "ArrowRight") {
//     player.velocity.x = 5;
//   }
//   if (event.code === "ArrowLeft") {
//     player.velocity.x = -5;
//   }
//   if (event.code === "KeyM") playBackgroundMusic();
// });

// document.addEventListener("keyup", (event) => {
//   if (event.code === "Space") {
//     console.log("Space");
//   }
//   if (event.code === "ArrowUp") {
//     player.velocity.y = 0;
//   }
//   if (event.code === "ArrowDown") {
//     player.velocity.y = 0;
//   }
//   if (event.code === "ArrowRight") {
//     player.velocity.x = 0;
//   }
//   if (event.code === "ArrowLeft") {
//     player.velocity.x = 0;
//   }
// });

// function addEventListeners() {
//   document.addEventListener("keydown", handleKeyDown);
//   document.addEventListener("keyup", handleKeyUp);
// }
// function removeEventListeners() {
//   document.removeEventListener("keydown", handleKeyDown);
//   document.removeEventListener("keyup", handleKeyUp);
// }

// function handleKeyDown(event) {
//   // document.addEventListener("keydown", (event) => {
//   if (event.code === "Space") {
//     // console.log("Space");
//     bullets.push(new Bullet(player.position.x, player.position.y));
//     playBulletFire();
//   }
//   if (event.code === "ArrowUp") {
//     player.velocity.y = -5;
//   }
//   if (event.code === "ArrowDown") {
//     player.velocity.y = 5;
//   }
//   if (event.code === "ArrowRight") {
//     player.velocity.x = 5;
//   }
//   if (event.code === "ArrowLeft") {
//     player.velocity.x = -5;
//   }
//   if (event.code === "KeyM") playBackgroundMusic();
//   // });
// }

// function handleKeyUp(event) {
//   if (event.code === "Space") {
//     console.log("Space");
//   }
//   if (event.code === "ArrowUp") {
//     player.velocity.y = 0;
//   }
//   if (event.code === "ArrowDown") {
//     player.velocity.y = 0;
//   }
//   if (event.code === "ArrowRight") {
//     player.velocity.x = 0;
//   }
//   if (event.code === "ArrowLeft") {
//     player.velocity.x = 0;
//   }
// }

document.addEventListener("keydown", (event) => {
  if (event.code === "KeyM") {
    playBackgroundMusic();
  }
});

start.addEventListener("click", () => {
  console.log("start");
  // init();
  // gameLoop();
  modalRestart.style.display = "none";
  modalStart.style.display = "none";
  modalMenuOption.style.display = "none";
  player.isAlive = true;

  // addEventListeners();
  init();

  gameLoop();
  // modalStart.style.display = "none";
  // removeEventListeners();
});
restart.addEventListener("click", () => {
  // console.log("restart");
  // player.isAlive = true;
  // init();
  // // addEventListeners();
  // gameLoop();
  // modalRestart.style.display = "none";
  // // removeEventListeners();

  // Reset player position and state
  player.position.x = canvas.width / 2; // Set the initial X position
  player.position.y = canvas.height - 50; // Set the initial Y position
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.isAlive = true;

  // Clear bullets and enemies
  bullets = [];
  enemies = [];

  // Reset game score
  gameScore = 0;

  // Stop game interval if it's used for enemy creation
  clearInterval(gameInterval);

  // Clear any running animations
  cancelAnimationFrame(animate);

  // Initialize the game again
  init();

  // Restart the game loop
  gameLoop();

  // Hide the restart modal
  modalRestart.style.display = "none";

  // Add event listeners again
  addEventListeners();
});

menuOption.addEventListener("click", () => {
  console.log("options");
  // init();
  // gameLoop();
  modalRestart.style.display = "none";
  // modalStart.style.display = "none";
  modalMenuOption.style.display = "flex";

  // addEventListeners();
  // init();

  // gameLoop();
  // modalStart.style.display = "none";
  // removeEventListeners();
});
menuOptionBtn.addEventListener("click", () => {
  console.log("option btn");
  // init();
  // gameLoop();
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalStart.style.display = "flex";

  // addEventListeners();
  // init();

  // gameLoop();
  // modalStart.style.display = "none";
  // removeEventListeners();
});

homeButton.addEventListener("click", () => {
  console.log("home");
  init();
  // removeEventListener();
  player.position.x = canvas.width / 2; // Set the initial X position
  player.position.y = canvas.height - 50; // Set the initial Y position
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.isAlive = true;

  // Clear bullets and enemies
  bullets = [];
  enemies = [];

  // Reset game score
  gameScore = 0;
  clearInterval(gameInterval);

  cancelAnimationFrame(animate);
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalStart.style.display = "flex";
});
