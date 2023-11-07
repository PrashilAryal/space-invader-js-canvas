class Enemy {
  constructor() {
    this.size = {
      width: 40,
      height: 40,
    };
    this.position = {
      x: Math.random() * (canvas.width - this.size.width - 0) + 0,
      // y: Math.random() * (50 - 0) + 0,
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
      this.img.src = "./images/damageEnemy1.png";
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

  // bulletCollision(bullets) {

  //   for (let i = 0; i < bullets.length; i++) {
  //     if (
  //       this.position.x + this.size.width >= bullets[i].position.x &&
  //       this.position.x <= bullets[i].position.x + bullets[i].size.width &&
  //       this.position.y + this.size.height >= bullets[i].position.y &&
  //       this.position.y <= bullets[i].position.y + bullets[i].size.height
  //     ) {
  //       bullets[i].hasHit = true;
  //       this.isHit = true;
  //       this.velocity.y = 0;
  //       this.position.x = -100;
  //       this.position.y = -100;
  //       console.log("bullet collision");
  //       if (bullets[i].position.y <= 0) {
  //         bullets[i].velocity.y = 0;
  //         bullets[i].position.x = -200;
  //         bullets[i].position.y = -200;
  //       }
  //     }
  //   }
  // }

  playerCollision(player) {
    if (
      this.position.x + this.size.width >= player.position.x &&
      this.position.x <= player.position.x + player.size.width &&
      this.position.y + this.size.height >= player.position.y &&
      this.position.y <= player.position.y + player.size.height
    ) {
      console.log("player collision");
      player.isAlive = false;
      this.velocity.y = 0;
      // this.position.x = -100;
      // this.position.y = -100;
    }
  }

  update(player) {
    this.draw();
    if (player.isAlive) {
      // if (!this.isHit) {
      // this.bulletCollision(bullets);
      this.playerCollision(player);
      this.move();
      // }
    }
  }
}

const enemyHitSound = new Audio();

function playEnemyHitSound() {
  enemyHitSound.src = "./sounds/enemyHit.mp3";
  enemyHitSound.play();
  enemyHitSound.volume = 0.1;
  enemyHitSound.loop = false;
}
