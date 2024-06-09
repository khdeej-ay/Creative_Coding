/* TYPOGRAPHY ACTIVITY: Design the BATH SPA UNIVERSITY word using your own font , random, and with different colors (outline - based) Design the background too! */

var font;
let fontSize = 84;
let stars = [];
let spacing = 50; // Adjust this value to control spacing between stars

function preload() { 
  font = loadFont('fonts/Playfair-Display.ttf'); 
}

function setup() { 
  createCanvas(windowWidth, windowHeight);   
  background(30);  
  noFill();
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  
  // Create stars with random positions and small sizes
  for (let x = 0; x < width + spacing * 2; x += spacing) {
    let y = random(height);
    let radius = random(1, 5);
    let starSpeed = random(1, 3);
    stars.push(new Star(x, y, radius, starSpeed));
  }
}

function draw() {
  background(40); 
  fill(210);
  text("BATH SPA UNIVERSITY", width / 2.04, height / 2, fontSize);

  // Draw and update all the stars
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].display();
  }
  
  // Shift stars to the left and reset when they move out of screen
  for (let i = 0; i < stars.length; i++) {
    stars[i].x -= stars[i].starSpeed;
    if (stars[i].x < -spacing) {
      stars[i].x = width + spacing;
    }
  }
}

class Star {
  constructor(x, y, radius, starSpeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.starSpeed = starSpeed;
    this.brightness = 255;
    this.sparkleInterval = random(10, 100);
  }

  update() {
    // Make the star sparkle randomly
    if (frameCount % this.sparkleInterval === 0) {
      this.brightness = random(200, 255);
    } else {
      this.brightness = 255;
    }
  }

  display() {
    // Draw the star
    fill(255, 255, 0); // Pretty yellow color
    noStroke();
    drawStar(this.x, this.y, this.radius * 2);
  }
}

function drawStar(x, y, radius) {
  let angle = TWO_PI / 5;
  beginShape();
  for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
    let sx2 = x + cos(a + angle / 2) * (radius / 2.5);
    let sy2 = y + sin(a + angle / 2) * (radius / 2.5);
    vertex(sx2, sy2);
  }
  endShape(CLOSE);
}

// Resize the canvas when the browser's size changes.
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}