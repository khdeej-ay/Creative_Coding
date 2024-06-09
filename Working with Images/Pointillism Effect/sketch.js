var img, x ,y;

function preload() {
  img = loadImage("kitty.jpeg");
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);
  background(220);
  noStroke();
}

function draw() {
  x = random(width);
  y = random(height);
  var c = img.get(x, y);
  fill(c[0], c[1], c[2], 100);
  rect (x, y, 30, 30);
}