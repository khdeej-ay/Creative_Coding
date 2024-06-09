// CLIP W/ TEXT ACTIVITY

function setup() {
  createCanvas(400, 400);
  background(200);
      
  // behind text
  cnvs1 = createGraphics(width, height);
  cntx = cnvs1.canvas.getContext("2d");
  cnvs1.rect(110, 160, 180, 75);
  cntx.clip();
  cnvs1.fill(40);
  cnvs1.circle(195, 200, 200);
  image(cnvs1, 0, 0);
  
  // text part
  cnvs2 = createGraphics(width, height);
  cnvs2.fill(200);
  cnvs2.rect(110, 160, 180, 75);
  cnvs2.erase();
  cnvs2.textSize(60);
  cnvs2.text('Found', 114, 220);
  image(cnvs2, 0, 0);
}