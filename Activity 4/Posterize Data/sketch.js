var img;

function preload() {

img = loadImage("Mountains.jpg");

}


function setup () {

createCanvas (750, 700);

background(240);

}

function draw() {

background(0);

image(img, 0, 0);  

var v = map(mouseX, 0, width, 2, 20);

filter(POSTERIZE, v);
}