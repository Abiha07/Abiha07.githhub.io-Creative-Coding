let cherryY;
let cherryDirection = 1;
let angle = 0;

function setup() {
  createCanvas(400, 400);
  cherryY = 140;
}

function draw() {
  background(200, 240, 255); 

  // Cone
  fill(222, 184, 135); 
  stroke(150, 100, 50);
  triangle(200, 300, 170, 200, 230, 200);

  push();
  translate(200, 180);
  rotate(sin(angle) * 0.05);
  fill(255, 182, 193); 
  stroke(255, 105, 180);
  ellipse(0, 0, 80);
  pop();

  fill(255, 0, 0);
  noStroke();
  ellipse(200, cherryY, 15);

  cherryY += cherryDirection * 0.5;
  if (cherryY > 145 || cherryY < 135) {
    cherryDirection *= -1;
  }

  angle += 0.03;
}
