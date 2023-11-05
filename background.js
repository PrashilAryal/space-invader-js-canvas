class Background {
  constructor(x = 0, y = 0) {
    this.position = {
      x: x,
      y: y,
    };
    this.size = {
      width: canvas.width,
      height: canvas.height,
    };
    this.velocity = {
      x: 0,
      y: 0.1,
    };
    this.img = new Image();
    this.img.src = "./images/background.png";
  }

  draw() {
    c.beginPath();
    c.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
  }

  move() {
    if (this.position.y >= canvas.height) {
      this.position.y = -this.size.height;
    }
    this.position.y += this.velocity.y + 0.9;
  }

  update() {
    this.draw();
    if (player.isAlive) {
      this.move();
    }
  }
}
