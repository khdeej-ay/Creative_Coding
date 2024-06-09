/* MOUSE TRAILS ACTIVTY: Create your own mouse interaction trails with different colors that depends on your preference and has the save option. */

var canvas, count = 1;  //global variables
let mousePositions = [];  //array that stores the positions of the cursor
let colorIndex = 0;  //stores current index of palette
let colorPalette = ["#F0F0F0", "#FFC94A", "#FFAF45", "#FB6D48", "#E84F7E", "#BE47C5"]  //array containing color palette

// called once when the program starts
function setup() { 
  // creates a canvas that is responsive to screen
  canvas = createCanvas(windowWidth, windowHeight); 
  noStroke();  //removes outlines from any shapes drawn
} 

// function continuously executes the lines of code inside it (after setup is called)
function draw() { 
  background(40); //sets bg color to dark gray
  // sets the cursor color fill to the color at the current index in the array 'colorPalette'
  fill(colorPalette[colorIndex]);
  // creates a vector cursor representing the current mouse position
  let cursor = createVector(mouseX, mouseY);
  // adds the cursor vector to the mousePositions array
  mousePositions.push(cursor);
  
  // checks if the length of the 'mousePositions' array is greater than 60
  if (mousePositions.length > 84) {
    // if true, it removes the oldest/smallest mouse position from the array.
    mousePositions.shift();
  }

  // loop iterates over 'mousePositions' array and creates a mouse trail
  for (let i = 0; i < mousePositions.length; i++) {
    // draws a circle at the position of each mouse position
    const currentPosition = mousePositions[i];
    // radius of the circles drawn decrease as i increases
    ellipse(currentPosition.x, currentPosition.y, i / 2.4);
  }
}

// function is called every time the mouse is clicked
function mouseClicked() {
  // increments colorIndex by 1, and resets back to 0 if it exceeds the length of the 'colorPalette' array
  colorIndex = (colorIndex + 1) % colorPalette.length;
}

// function is called every time a key is pressed
function keyPressed() { 
  // checks if the key pressed is 'S' or 's'
  if (keyCode == (83 || 115)) { 
    // saves the canvas as an image with the file extension 'jpg'.
    saveCanvas(canvas, 'Mouse Trail | Activity - ' + count, 'jpg'); 
    count++; //increments the count
  } 
}

// function is called whenever the screen is resized
function windowResized() {
  // resizes the canvas to match the new screen size
  resizeCanvas(windowWidth, windowHeight);
}