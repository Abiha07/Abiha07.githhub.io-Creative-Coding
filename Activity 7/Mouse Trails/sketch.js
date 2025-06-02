let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  colorMode(HSB, 360, 100, 100, 200);
}

function draw() {
  background(0,80);
  
  particles.push(new Particle(mouseX, mouseY));
  
  for (let i= particles.length - 4; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].alpha <= 0) {
      particles.splice(i,1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(50, 70);
    this.alpha = 255;
    this.hue = frameCount % 360; // Animate hue over time
    this.shapeType = random(['circle', 'square', 'triangle', 'star' ,]);
}

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 6;
}

 show() {
    push();
    translate(this.x, this.y);
    fill(this.hue, 100, 100, this.alpha);
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(this.hue, 100, 100);

    switch (this.shapeType) {
      case 'circle':
        ellipse(0, 0, this.size);
        break;
      case 'square':
        rectMode(CENTER);
        rect(0, 0, this.size, this.size);
        break;
      case 'triangle':
        triangle(
          -this.size / 2, this.size / 2,
           0, -this.size / 2,
           this.size / 2, this.size / 2
        );
        break;
      case 'star':
        drawStar(0, 0, this.size * 0.4, this.size * 0.8, 5);
        break;
    }
    pop();
  }
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
 