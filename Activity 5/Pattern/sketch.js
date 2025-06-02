let particles = [];
const particleCount = 180;

function setup() {
  createCanvas(700, 700);
  colorMode(HSB, 360, 100, 80, 1);
  noStroke();
  
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(10, 20),
      speedX: random(-3, 3),
      speedY: random(-4, 4),
      hue: random(360),
      life: random(150, 210),
      maxLife: random(150, 210)
    });
  }
  
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(20, 60, 10), color(450, 50, 10), inter);
    stroke(c);
    line(0, y, width, y);
  }
}

function draw() {
  fill(0, 0, 0, 0.06);
  noStroke();
  rect(0, 0, width, height);
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    
    let noiseScale = 0.02;
    let angle = noise(p.x * noiseScale, p.y * noiseScale, frameCount * 0.006) * TWO_PI * 2;
    
    if (random() < 0.02) {
      p.speedX = cos(angle) * random(0.5, 2);
      p.speedY = sin(angle) * random(0.5, 2);
    }
    
    p.x += p.speedX;
    p.y += p.speedY;
    
    if (p.x > width) p.x = 0;
    if (p.x < 0) p.x = width;
    if (p.y > height) p.y = 0;
    if (p.y < 0) p.y = height;
    
    p.life--;
    if (p.life <= 0) {
      
      if (random() > 0.4) {
        
        p.x = random() > 0.6 ? 0 : width;
        p.y = random(height);
      } else {
  
        p.x = random(width);
        p.y = random(height);
      }
      p.life = p.maxLife;
      p.hue = (p.hue + random(40, 80)) % 360;
    }
    
    let alpha = map(p.life, 0, p.maxLife, 0, 1);
    fill(p.hue, 80, 90, alpha * 0.7);
    ellipse(p.x, p.y, p.size * alpha);
    
    if (random() < 0.1) {
      for (let j = 0; j < particles.length; j++) {
        let other = particles[j];
        let d = dist(p.x, p.y, other.x, other.y);
        if (d > 0 && d < 100) {
          stroke(p.hue, 40, 80, alpha * 0.4);
          line(p.x, p.y, other.x, other.y);
          noStroke();
        }
      }
    }
  }
}