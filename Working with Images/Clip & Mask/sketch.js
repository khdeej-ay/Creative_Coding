let img;

function preload() {
  img = loadImage("fish.jpg");
}

function setup() {
  createCanvas(400, 400);
  background(50);
  
  // clip activity
  
  img.resize(300, 200);
  
  let cnvs1 = createGraphics(200, 200);
  
  cnvs1.circle(100, 100, 150);
  cnvs1.canvas.getContext("2d").clip();
  cnvs1.image(img, 0, 0);
  image(cnvs1, 30, 30);
  
  // mask activity
    
  let cnvs2 = createGraphics(300, 200);
  cnvs2.rect(50, 70, 140, 100);
  cnvs2.circle(120, 80, 120);
  
  img.mask(cnvs2);
  
  image(img, 150, 170);
}