var img, x, y;

function preload() {
  img = loadImage("annie.jpg");   
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);   //resizes image
}

function draw() {
  background(220);
  x = mouseX;
  y = mouseY;
  image(img, 0, 0);
  var c = get(x, y);
  fill(c);
  rect(x, y, 30)
}