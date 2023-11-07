class GameOver {
  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
    this.size = {
      width: canvas.width,
      height: canvas.height,
    };
  }

  draw() {
    c.beginPath();
    c.fillStyle = "white";
    c.font = "30px sans serif";
    c.fillText("Game Over", this.size.width / 2 - 50, this.size.height / 2);
  }
  update() {
    this.draw();
  }
}
