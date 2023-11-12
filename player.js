class Player {
  constructor() {
    this.size = {
      width: 50,
      height: 50,
    };
    this.position = {
      x: canvas.width / 2,
      y: canvas.height,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.isAlive = true;
    this.img = new Image();
    this.img.src = "./images/player.png";
  }

  draw() {
    c.beginPath();
    c.fillStyle = "blue";
    c.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  borderCollision() {
    if (this.position.x <= 0) this.position.x = 0;
    if (this.position.x + this.size.width >= canvas.width)
      this.position.x = canvas.width - this.size.width;
    if (this.position.y <= 0) this.position.y = 0;
    if (this.position.y + this.size.height >= canvas.height)
      this.position.y = canvas.height - this.size.height;
  }

  update() {
    this.draw();
    if (this.isAlive) {
      this.move();
      this.borderCollision();
    }
  }
}
