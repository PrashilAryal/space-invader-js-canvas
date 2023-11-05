class Meteor {
  constructor() {
    this.position = {
      x: Math.random() * (canvas.width - 0) + 0,
      y: 0,
    };
    this.velocity = {
      x: Math.random() * (1 - -0.5) + -0.5,
      y: Math.random() * (1 - 0.5) + 0.5,
    };
    this.size = Math.random() * (30 - 20) + 20;
    this.img = new Image();
    this.img.src = "./images/meteor.png";
  }

  draw() {
    c.beginPath();
    c.fillStyle = "red";
    c.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  move() {
    if (
      this.position.x + this.size <= 0 ||
      this.position.x >= canvas.width ||
      this.position.y + this.size <= 0 ||
      this.position.y >= canvas.height
    ) {
      this.position.x = Math.random() * (canvas.width - 50 - 0) + 0;
      this.position.y = -this.size;
      this.velocity.x = Math.random() * (1 - -0.5) + -0.5;
      this.velocity.y = Math.random() * (1 - 0.5) + 0.5;
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  update() {
    this.draw();
    if (player.isAlive) {
      this.move();
    }
  }
}
