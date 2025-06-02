let cards = [];
let values = [];
let flippedCards = [];
let matched = 0;
let attempts = 0;
let cols = 6;
let rows = 6;
let totalPairs = (cols * rows) / 2;
let cardSize = 90;
let spacing = 12;
let gameWon = false;

function setup() {
  createCanvas((cardSize + spacing) * cols, (cardSize + spacing) * rows + 50);
  generateCards();
}

function draw() {
  background(280);
  drawCards();
  displayAttempts();

  if (matched === totalPairs) {
    fill(0, 180, 0);
    textSize(40);
    textAlign(CENTER);
    text("You Win!", width / 2, height - 12);
  }
}

function generateCards() {
  // Create pairs
  values = [];
  for (let i = 0; i < totalPairs; i++) {
    values.push(i);
    values.push(i);
  }
  shuffle(values, true);

  cards = [];
  for (let i = 0; i < rows * cols; i++) {
    let x = (i % cols) * (cardSize + spacing);
    let y = floor(i / cols) * (cardSize + spacing);
    cards.push(new Card(x, y, cardSize, values[i]));
  }
}

function drawCards() {
  for (let card of cards) {
    card.show();
  }
}

function mousePressed() {
  if (flippedCards.length < 2 && !gameWon) {
    for (let card of cards) {
      if (card.contains(mouseX, mouseY) && !card.revealed && !card.matched) {
        card.revealed = true;
        flippedCards.push(card);
        break;
      }
    }

    if (flippedCards.length === 2) {
      attempts++;
      setTimeout(checkMatch, 600);
    }
  }
}

function checkMatch() {
  let [a, b] = flippedCards;

  if (a.value === b.value) {
    a.matched = true;
    b.matched = true;
    matched++;
  } else {
    a.revealed = false;
    b.revealed = false;
  }

  flippedCards = [];
}

function displayAttempts() {
  fill(20);
  textSize(22);
  textAlign(LEFT);
  text(`Attempts: ${attempts}`, 20, height - 20);
}

class Card {
  constructor(x, y, size, value) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.revealed = false;
    this.matched = false;
  }

  contains(px, py) {
    return px > this.x && px < this.x + this.size &&
           py > this.y && py < this.y + this.size;
  }

  show() {
    stroke(0);
    fill(this.revealed || this.matched ? "#655FA58E" : "#035CD2E2");
    rect(this.x, this.y, this.size, this.size, 10);

    if (this.revealed || this.matched) {
      fill(0);
      textSize(32);
      textAlign(CENTER, CENTER);
      text(this.value, this.x + this.size / 2, this.y + this.size / 2);
    }
  }
}
