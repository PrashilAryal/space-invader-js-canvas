class Bullet {
  constructor(x = 0, y = 0) {
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      width: 15,
      height: 15,
    };
    this.velocity = {
      x: 1,
      y: -5,
    };

    this.hasHit = false;
    this.img = new Image();
    this.img.src = "./images/bullet.png";
  }

  draw() {
    c.beginPath();
    c.fillStyle = "red";
    c.drawImage(
      this.img,
      this.position.x + this.size.width + 2,
      this.position.y - this.size.height,
      this.size.width,
      this.size.height
    );
  }

  move() {
    this.position.y += this.velocity.y;
    if (this.position.y <= 0) {
      this.position.x = -200;
      this.position.y = -200;
      this.velocity.y = 0;
    }
    console.log(this.position.y);
  }

  // When bullet hit an enemy
  enemyCollision() {
    for (let i = 0; i < enemies.length; i++) {
      if (
        this.position.x + this.size.width >= enemies[i].position.x &&
        this.position.x <= enemies[i].position.x + enemies[i].size.width &&
        this.position.y + this.size.height >= enemies[i].position.y &&
        this.position.y <= enemies[i].position.y + enemies[i].size.height
      ) {
        playEnemyHitSound();

        this.hasHit = true;
        enemies[i].isHit = true;
        this.velocity.y = 0;
        this.position.x = -200;
        this.position.y = -200;
        enemies[i].velocity.y = 0;
        setTimeout(() => {
          enemies[i].position.x = -100;
          enemies[i].position.y = -100;
        }, 1000);
        gameScore += 10;
      }
    }
  }

  update() {
    if (player.isAlive) {
      if (!this.hasHit) {
        this.draw();
        this.move();
        this.enemyCollision();
      }
    }
  }
}

const bulletSound = new Audio();

function playBulletFire() {
  bulletSound.src = "./sounds/bulletFire.mp3";
  bulletSound.play();
  bulletSound.volume = 0.3;
  bulletSound.loop = false;
}
