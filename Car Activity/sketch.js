// CAR ACTIVITY | USE BASIC SHAPES TO CREATE A CAR

function setup() {
  // don't change function names, changecanvas won't work
  createCanvas(400, 400);
}

function draw() {
  background(255, 255, 255);
  
  // car hood
  fill(192, 192, 192);
  ellipse(200, 200, 200, 10)
  
  // roof
  ellipse(205, 165, 150, 15)
  
  // car body
  // rect(x-axis, y-axis, width(x), height(y))
  rect(130, 165, 150, 35);
  rect(100, 200, 105, 40);
  rect(205, 200, 95, 40);
  
  // car windows
  fill(240, 240, 240)
  rect(150, 170, 40, 25)
  rect(220, 170, 40, 25)
  
  // door handles
  fill(135, 206, 235)
  rect(220, 205, 15, 5)
  rect(175, 205, 15, 5)
  
  // wheels
  // ellipse(x-axis, y-axis, width, height)
  // to make a circle, width and height should be equal
  fill(50, 80, 80)
  ellipse(135, 245, 35, 35);
  ellipse(265, 245, 35, 35);  
  fill(240, 240, 240)
  ellipse(135, 245, 24, 24);
  ellipse(265, 245, 24, 24);
  
  // head lights and tail lights
  // triangle(x1, y1, x2, y2, x3, y3) 
  // x and y values for each point of the triangle
  fill(255, 215, 0)
  triangle(100, 210, 100, 200, 110, 198);
  triangle(300, 210, 300, 200, 290, 198); 
}