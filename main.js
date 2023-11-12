const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

c.textBaseLine = "middle";

// Class's object
const player = new Player();
const meteor = new Meteor();

// Two background images for background movement
const bg = new Background(0, 0);
const bg2 = new Background(0, -bg.size.height);

let backgroundSound = new Audio();
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
const menuSetting = document.getElementById("menuSetting");
const menuOptionBtn = document.getElementById("menuOptionBtn");
const menuSettingBtn = document.getElementById("menuSettingBtn");
const homeButton = document.getElementById("homeButton");
const modalStart = document.getElementById("modalStart");
const modalRestart = document.getElementById("modalRestart");
const modalMenuOption = document.getElementById("modalMenuOption");
const modalMenuSetting = document.getElementById("modalMenuSetting");
const gameOverScore = document.getElementById("gameOverScore");

// Display only Menu on game start
modalRestart.style.display = "none";
modalMenuOption.style.display = "none";
modalMenuSetting.style.display = "none";
modalStart.style.display = "flex";

let gameInterval;
// Variable to determine sound
let playBackgroundSound = true;
let playFiringSound = true;
let playCollisionSound = true;
// Variables to determine sound on restart
let playBackgroundSoundState = true;
let playFiringSoundState = true;
let playCollisionSoundState = true;

// Initialization of game data - for restart option
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
  playBackgroundSound = playBackgroundSoundState;
  playFiringSound = playFiringSoundState;
  playCollisionSound = playCollisionSoundState;
  playBackgroundMusic();
}

// Game loop variable
let animate;

// Variables for tracking keyboard key press
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
    if (playFiringSound) {
      playBulletFire();
    }
    bullets.push(new Bullet(player.position.x, player.position.y));
    // To prevent continuous firing
    setTimeout(() => {
      spaceKeyPressed = false;
    }, 500);
  }
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function gameLoop() {
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Game Logic
  handlePlayerActions();
  bg.update();
  bg2.update();
  meteor.update();
  player.update();
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update(player);
  }
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
  }

  // Display game score
  c.beginPath();
  c.fillStyle = "white";
  c.font = "30px sans serif";
  c.fillText(gameScore, 15, 30);

  // Game over if player is not alive
  if (!player.isAlive) {
    clearInterval(gameInterval);
    backgroundSound.pause();
    gameOverScore.innerHTML = gameScore;
    cancelAnimationFrame(animate);
    modalRestart.style.display = "flex";
  }
  animate = window.requestAnimationFrame(gameLoop);
}

function playBackgroundMusic() {
  if (playBackgroundSound) {
    backgroundSound.play();
  } else {
    backgroundSound.pause();
  }
}

// Menu Items
start.addEventListener("click", () => {
  modalRestart.style.display = "none";
  modalStart.style.display = "none";
  modalMenuOption.style.display = "none";
  player.isAlive = true;
  init();
  gameLoop();
});

menuOption.addEventListener("click", () => {
  modalRestart.style.display = "none";
  modalMenuSetting.style.display = "none";
  modalMenuOption.style.display = "flex";
});

menuSetting.addEventListener("click", () => {
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalMenuSetting.style.display = "flex";
});

restart.addEventListener("click", () => {
  // Resetting player position and other state
  player.position.x = canvas.width / 2;
  player.position.y = canvas.height - 50;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.isAlive = true;
  bullets = [];
  enemies = [];
  gameScore = 0;
  clearInterval(gameInterval);
  cancelAnimationFrame(animate);
  init();
  gameLoop();
  modalRestart.style.display = "none";
  // addEventListeners();
});

// Buttons inside Menu Items
menuOptionBtn.addEventListener("click", () => {
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalMenuSetting.style.display = "none";
  modalStart.style.display = "flex";
});
menuSettingBtn.addEventListener("click", () => {
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalMenuSetting.style.display = "none";
  modalStart.style.display = "flex";
});

homeButton.addEventListener("click", () => {
  console.log("home");
  init();
  player.position.x = canvas.width / 2;
  player.position.y = canvas.height - 50;
  player.velocity.x = 0;
  player.velocity.y = 0;
  player.isAlive = true;
  bullets = [];
  enemies = [];
  gameScore = 0;
  clearInterval(gameInterval);
  cancelAnimationFrame(animate);
  modalRestart.style.display = "none";
  modalMenuOption.style.display = "none";
  modalMenuSetting.style.display = "none";
  modalStart.style.display = "flex";
});

// Menu setting button's on/off switch control
function toggleState(c) {
  var buttonBackgroundSound = document.getElementById("playBackgroundSoundBtn");
  var buttonFiringSound = document.getElementById("playFiringSoundBtn");
  var buttonCollisionSound = document.getElementById("playCollisionSoundBtn");

  if (c === "bgBtn") {
    buttonBackgroundSound = document.getElementById("playBackgroundSoundBtn");
    if (buttonBackgroundSound.innerHTML === "Off") {
      buttonBackgroundSound.innerHTML = "On";
      buttonBackgroundSound.classList.add("btnOn");
      buttonBackgroundSound.classList.remove("btnOff");
      playBackgroundSound = true;
      backgroundSound.play();
      playBackgroundSoundState = playBackgroundSound;
    } else {
      buttonBackgroundSound.innerHTML = "Off";
      buttonBackgroundSound.classList.remove("btnOn");
      buttonBackgroundSound.classList.add("btnOff");
      playBackgroundSound = false;
      backgroundSound.pause();
      playBackgroundSoundState = playBackgroundSound;
    }
  }
  if (c === "fBtn") {
    buttonFiringSound = document.getElementById("playFiringSoundBtn");
    if (buttonFiringSound.innerHTML === "Off") {
      buttonFiringSound.innerHTML = "On";
      buttonFiringSound.classList.add("btnOn");
      buttonFiringSound.classList.remove("btnOff");
      playFiringSound = true;
      playFiringSoundState = playFiringSound;
    } else {
      buttonFiringSound.innerHTML = "Off";
      buttonFiringSound.classList.remove("btnOn");
      buttonFiringSound.classList.add("btnOff");
      playFiringSound = false;
      playFiringSoundState = playFiringSound;
    }
  }
  if (c === "cBtn") {
    buttonCollisionSound = document.getElementById("playCollisionSoundBtn");
    if (buttonCollisionSound.innerHTML === "Off") {
      buttonCollisionSound.innerHTML = "On";
      buttonCollisionSound.classList.add("btnOn");
      buttonCollisionSound.classList.remove("btnOff");
      playCollisionSound = true;
      playCollisionSoundState = playCollisionSound;
    } else {
      buttonCollisionSound.innerHTML = "Off";
      buttonCollisionSound.classList.remove("btnOn");
      buttonCollisionSound.classList.add("btnOff");
      playCollisionSound = false;
      playCollisionSoundState = playCollisionSound;
    }
  }
}
