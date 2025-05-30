function setup() {
  createCanvas(600, 500);
}

function draw() {
  background(200);
 
  fill(255, 20, 0);
  rect(150, 200, 300, 100, 20);
  rect(190, 150, 220, 60, 10);
  rect(150, 200, 100, 30, 10);
  fill(255);
  rect(200, 160, 80, 40, 5);
  rect(320, 160, 80, 40, 5);
  fill(0);
  ellipse(180, 300, 60, 60);
  ellipse(420, 300, 60, 60);
  fill(180);
  ellipse(180, 300, 30, 30);
  ellipse(420, 300, 30, 30);
  stroke(0);
  strokeWeight(2);
  line(180, 285, 180, 315);
  line(165, 300, 195, 300);
  line(420, 285, 420, 315);
  line(405, 300, 435, 300);

  noStroke();
}