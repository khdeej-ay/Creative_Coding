var img; 

function preload() {
  img = loadImage("quanxi-2.jpeg")
}

function setup() {
  createCanvas(400, 400);
  img.resize(400, 400);
}

function draw() {
  background(220);
  image(img, 0, 0);
  var v = map(mouseX, 0, width, 0, 1); 
  //   var v = map(mouseY, 0, height, 0, 1); 
  filter(THRESHOLD, v);
}