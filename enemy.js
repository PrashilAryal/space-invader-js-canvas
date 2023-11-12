class Enemy {
  constructor() {
    this.size = {
      width: 40,
      height: 40,
    };
    this.position = {
      x: Math.random() * (canvas.width - this.size.width - 0) + 0,
      y: -this.size.height,
    };
    this.velocity = {
      x: 0,
      y: 1.5,
    };
    this.isHit = false;
    this.img = new Image();
    this.img.src = "./images/enemy.png";
  }

  draw() {
    c.beginPath();
    c.fillStyle = "red";
    if (this.isHit) {
      this.size = {
        width: 50,
        height: 50,
      };
      this.img.src = "./images/damageEnemy.png";
    }
    c.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }
  move() {
    if (this.position.y >= canvas.height && gameScore >= 5) {
      this.velocity.y = 0;
      this.position.x = -100;
      this.position.y = -100;
      gameScore -= 5;
    }
    if (gameScore < 0) {
      gameScore = 0;
    }
    this.position.y += this.velocity.y;
  }

  // When enemy collide with the player
  playerCollision(player) {
    if (
      this.position.x + this.size.width >= player.position.x &&
      this.position.x <= player.position.x + player.size.width &&
      this.position.y + this.size.height >= player.position.y &&
      this.position.y <= player.position.y + player.size.height
    ) {
      player.isAlive = false;
      this.velocity.y = 0;
    }
  }

  update(player) {
    this.draw();
    if (player.isAlive) {
      this.playerCollision(player);
      this.move();
    }
  }
}

const enemyHitSound = new Audio();

function playEnemyHitSound() {
  if (playCollisionSound) {
    enemyHitSound.src = "./sounds/enemyHit.mp3";
    enemyHitSound.volume = 0.3;
    enemyHitSound.loop = false;
    enemyHitSound.play();
  }
}
