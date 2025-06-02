var img, x, y;

function preload() {

img = loadImage("Mountains.jpg");

}


function setup() {

createCanvas (800, 700);

background(220);

noStroke();

}


function draw() {

background(0);

x = mouseX;

y = mouseY;

image( img, 0, 0);

var c = get(x, y); 

fill(c); 

rect (x, y, 110, 100); 

}

