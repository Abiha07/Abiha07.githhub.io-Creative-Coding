let font;
let fontSize = 60;
let amplitude = 12;
let frequency = 0.04;
let shadowOffsetX = 6;
let shadowOffsetY = 6;
let words = ["BATH", "SPA", "UNIVERSITY"];
let wordColors = ["#731EC2", "#E4368C", "#F5113F"];
let pointsArray = [];
let shadowPointsArray = [];

function preload() {
    font = loadFont('Roboto.ttf');  
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    textFont(font);
    textSize(fontSize);
    textAlign(LEFT, CENTER);

    let totalTextWidth = 0;
    let wordBounds = [];

    for (let word of words) {
        let bounds = font.textBounds(word, 0, 0, fontSize);
        wordBounds.push(bounds);
        totalTextWidth += bounds.w + 34; 
    }

    totalTextWidth -= 34; 
    let startX = width / 2 - totalTextWidth / 2;
    let y = height / 2;

    for (let i = 0; i < words.length; i++) {
        let x = startX;
        for (let j = 0; j < i; j++) {
            x += wordBounds[j].w + 30;
        }

        let mainPoints = font.textToPoints(words[i], x, y, fontSize, {
            sampleFactor: 0.2,
            simplifyThreshold: 0
        });

        let shadowPoints = font.textToPoints(words[i], x + shadowOffsetX, y + shadowOffsetY, fontSize, {
            sampleFactor: 0.2,
            simplifyThreshold: 0
        });

        pointsArray.push(mainPoints);
        shadowPointsArray.push(shadowPoints);
    }
}

function draw() {
    drawDynamicBackground();

    let time = millis() / 2000;  

    for (let i = 0; i < pointsArray.length; i++) {
        // Shadow
        fill(150, 150, 150, 100);
        noStroke();
        for (let pt of shadowPointsArray[i]) {
            let wave = sin(pt.x * frequency + time) * amplitude;
            ellipse(pt.x, pt.y + wave, 5, 5);
        }

        fill(wordColors[i]);
        noStroke();
        for (let pt of pointsArray[i]) {
            let wave = sin(pt.x * frequency + time) * amplitude;
            ellipse(pt.x, pt.y + wave, 5, 5);
        }
    }
}

function drawDynamicBackground() {
    background(250, 220, 280); 
    noStroke();
    for (let i = 0; i < 50; i++) {
        let radius = sin(frameCount * 0.02 + i) * 150 + 120;
        let x = noise(i * 0.5, frameCount * 0.01) * width;
        let y = noise(i * 0.3, frameCount * 0.01 + 100) * height;

        fill(250, 200 + i, 255 - i * 5, 30);
        ellipse(x, y, radius);
    }
}
