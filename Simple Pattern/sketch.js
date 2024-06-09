/* SIMPLE PATTERN ACTIVITY: Create your own  pattern with the use of for loop and if statements  that shows repetition , decision and  randomization */

// variables numX and numY to hold the number of tiles in the x and y direction
let numX, numY;
// variable tileSize to hold the size of each tile
let tileSize;
let count = 1;

function setup() {
  // creates a canvas that fills the browser window
  let canvas = createCanvas(windowWidth, windowHeight);
  // sets the color mode to HSB
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 20);  //sets bg color to white
  noStroke();  //disables stroke
  // sets the number of tiles in the x direction to 8
  numX = 16;
  // sets the number of tiles in the y direction to 16
  numY = 32;
  // calculates the size of each tile based on the window width
  tileSize = windowWidth/16;
}

function draw() {
  // clears the background on each frame
  background(0, 0, 20);
  // loops through the rows (outer)
  for (let y = 0; y < numY; y++) {
    // loops through the columns (nested)
  	for (let x = 0; x < numX; x++) {
      // pushes the current transformation matrix onto the stack
	  push();
      // translates to the center of the current tile
	  translate(x * tileSize + tileSize/2, y * tileSize + tileSize/2);
      // generates a random integer between 0 and 4
	  let n = int(random(0, 4));
      // rotates the tile by a multiple of 90 degrees
	  rotate(radians(n * 90));
      // draws the tile pattern
	  tilePattern(n);
      // restores the previous transformation matrix from the stack
	  pop();
	}
  }
  // stops the draw loop after the first frame
  noLoop();
}

function mousePressed() {
  // restarts the draw loop when the mouse is pressed
  loop();
}

function tilePattern(n) {
  if (n==0 || n==1) {
    // sets the fill color to a shade of red
    fill(0, 65, 100);
    // draws an red triangle
    triangle(-tileSize/2, 0, 0, -tileSize/2, -tileSize/2, -tileSize/2);
    // sets the fill color to a shade of blue
    fill(210, 75, 100);
    // draws an blue triangle
    triangle(tileSize/2, 0, 0, tileSize/2, tileSize/2, tileSize/2);
    }
  else {
    // sets the fill color to a shade of yellow
    fill(55, 80, 100);
    // draws an yellow rectangle
    rect(2, -tileSize/2, tileSize/2 - 2, tileSize/2 - 2);
    // sets the fill color to a shade of green
    fill(110, 60, 90);
    // draws a green rectangle
    rect(-tileSize/2, 2, tileSize/2 - 2, tileSize/2 - 2);
  }
  // disables fill for the square outline
  noFill();
  // sets the stroke color to a semi-transparent shade of black
  stroke(0, 0, 60, 10);
  // draws a square outline
  square(-tileSize/2, -tileSize/2, tileSize);
  // disables stroke for subsequent drawing operations
  noStroke();
}

// function is called every time a key is pressed
function keyPressed() { 
  // checks if the key pressed is 'S' or 's'
  if (keyCode == (83 || 115)) { 
    // saves the canvas as an image with the file extension 'jpg'.
    saveCanvas(canvas, 'RDR Pattern | Activity - ' + count, 'jpg'); 
    count++; //increments the count
  } 
}

function windowResized () {
  // resizes the canvas when the window is resized (enables responsive)
  resizeCanvas(windowWidth, windowHeight);
}