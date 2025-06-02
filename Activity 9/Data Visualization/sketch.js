let hobbies = ["Painting", "Gaming", "Traveling", "Cooking", "Fishing", "Shopping", "Baking", "Cycling", "Gardening", "Music", "Swimming",];
let values = [50, 65, 90, 70, 60, 50, 75, 85, 55, 40, 35];
let barColors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#9789CF');
  generatePastelColors();
}

function draw() {
  drawBarChart();
  noLoop(); 
}

function generatePastelColors() {
  for (let i = 0; i < hobbies.length; i++) {
    let r = random(100, 255);
    let g = random(100, 255);
    let b = random(200, 255);
    barColors.push(color(r, g, b));
  }
}

function drawBarChart() {
  let barWidth = (width - 100) / hobbies.length - 10;
  let startX = 50;
  let startY = height;
  let cornerRadius = 6;

  // Title
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(32);
  text("Most Loved Hobbies", width / 2, 50);

  for (let i = 0; i < hobbies.length; i++) {
    let barHeight = map(values[i], 0, 100, 0, height - 100);

    // Shadow
    fill(340);
    stroke(1);
    rect(startX + i * (barWidth + 10) + 5, startY - barHeight + 1, barWidth, barHeight, cornerRadius);

    // Bar
    noStroke();
    fill(barColors[i]);
    rect(startX + i * (barWidth + 10), startY - barHeight, barWidth, barHeight, cornerRadius);

    // Value label
    textSize(11);
    textAlign(CENTER);
    fill(0);
    text(values[i] + "%", startX + i * (barWidth + 10) + barWidth / 2, startY - barHeight - 10);

    // Hobby label
    textSize(12);
    textAlign(CENTER, BOTTOM);
    fill(0);
    text(hobbies[i], startX + i * (barWidth + 10) + barWidth / 2, startY - barHeight - 30);
  }
}
