// ALIEN ACTIVITY | USE BEZIER CURVES AND SHAPES TO CREATE AN ALIEN

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // body
  fill(255, 0, 0);
  strokeWeight(1.5);
  ellipse(200, 200, 200);
  
  // eye
  strokeWeight(1)
  fill(255, 255, 120)
  ellipse(200, 180, 80, 78);
  noStroke();
  fill(255, 150, 50);
  ellipse(200, 180, 45);
  fill(0);
  ellipse(200, 180, 25);
  fill(255);
  ellipse(210, 170, 10);
  
  // teeth
  stroke(0);
  strokeWeight(1.2);
  fill(255, 255, 120, 220);
  beginShape();
  // line(180, 250, 185, 260);
  vertex(181, 251);
  vertex(185, 260);
  // line(185, 260, 188, 255);
  vertex(185, 260);
  vertex(188, 255);
  endShape();
  beginShape();
  // line(200, 257, 204, 263);
  vertex(200, 257);
  vertex(204, 263);
  // line(204, 263, 207, 255);
  vertex(204, 263); 
  vertex(207, 255);
  endShape();
  
  // smile
  noFill();
  strokeWeight(1.2);
  stroke(0);
  beginShape();
  vertex(175, 245);   // (x1, y1)
  // (x2, y2, x3, y3, coordinate[x4, y4])
  bezierVertex(190, 260, 200, 260, 215, 250);
  endShape();
  
  // patterns
  // hands
  // feet
  // antenna??
}