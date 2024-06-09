/* INTERACTIVE ART ACTIVITY | WELCOME TO BATH SPA UNIVERSITY */

// creates a variable for display text
let displayText;

// fetches element with the id "display-text"
let textColor = document.getElementById("display-text");

// creates a cursor variable
let circularCursor;

// creates an empty array for squares in the bg
let blocks = []; 

// creates variables for rows and columns
let cols; 
let rows; 

let size = 12; // sets the size of each block
let offset = 5; // sets the offset for each blocks
let d = 18; // sets the threshold distance for the mouse hover effect

// THIS FUNCTION IS EXECUTED ONCE THE PROGRAM STARTS
function setup() {
  // create a canvas relative to screen size
  createCanvas(windowWidth, windowHeight);
  // align the text vertically and horizontally
  textAlign(CENTER, CENTER);
  
  // assign a variable to "#display-text" element
  displayText = select("#display-text");
  // disables user from editing text
  displayText.attribute("contentEditable", "false");
  // assign a variable to the cursor
  circularCursor = select("#scroll-cursor");
  
  // declare column and row sizes (for the bg)
  cols = width/size;
  rows = height/size;
  
  // outer loop to create the grid background
  for (let i = 0; i < cols; i++) {
    // creates an empty array for rows
    blocks[i] = [];
    // inner loop for the grid background
    for (let j = 0; j < rows; j++) {
      // create the block grid using the createBlock function (with 2 arguments)
      blocks[i][j] = createBlock(size/2 + i*size, size/2 + j*size);
    }
  }
  // set the rectangle blocks mode to center
  rectMode(CENTER);
}

// FUNCTION EXECUTES REPEATEDLY, AS IF IN A LOOP (~60 times per second)
function draw() {
  // clear the canvas
  clear();
  
  // background color
  background(0);
  
  // updates the cursor's position 
  circularCursor.style("left", mouseX + "px");
  circularCursor.style("top", mouseY + "px");

  // enables mouse interaction with text width
  // the horizontal (along x-axis) movement of the mouse controls the weight of the display text
  let textWeight = map(mouseX, 0, width, 100, 700);
  displayText.style("font-weight", textWeight);
  
  // loop iterates through rows and columns and calls the displayBlock function
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      displayBlock(blocks[i][j], offset, d);
    }
  }
}
 
// FUNCTION THAT CREATES A BLOCK OBJECT FOR THE BG
function createBlock(x, y) {
  
  // this return function returns an object
  return {
    x: x, //x-co-ordinates
    y: y, //y-co-ordinates
    angle: 0, //initial angle of each block
    color: 70, //initial color fil for each block
    
    // method that displays the block
    display: function(offset, d) {
      push(); //saves current sketch styles
      noFill(); //disables the block fill
      stroke(this.color); //sets the block's stroke
      translate(this.x, this.y);  //translates the origin of block's position
      this.mouseHover(d); //calls the mouseHover() method to handle mouse hover effect (defined on line 103)
      rotate(this.angle); //rotates the block
      rect(0, 0, size - offset, size - offset); //rectangle drawn at the translated position
      pop(); //restores the previous sketch styles
    },
    
    // method that handles the mouse hover effects
    mouseHover: function(d) { //d is the threshold distance for mouse hover effect - area that will be affected
      // calculates distance between the mouse pointer and the block's position
      let distance = dist(mouseX, mouseY, this.x, this.y);
      
      // checks if the distance is less than the threshold distance d for the hover effect
      if (distance < d) {
        // increses the angle of rotation when mouse hovers on block
        this.angle += 0.1; 
        // changes block color to white when mouse hovers on block
        this.color = 255;
      } 
      
      // otherwise if the distance is more than threshold distance d
      else {
        
        // checks if the angle is more than 0 but less than or equal to 10
        if (this.angle > 0 && this.angle <= 10) {
          // increases the angle further
          this.angle += 0.1;
          // otherwise if the angle is greater than 10
        } else if (this.angle > 10) {
          // resets the angle to zero
          this.angle = 0;
        }
        
        // checks if the color value is greater than its default value
        if (this.color > 70) {
          // decreases the color value by 3
          this.color -= 3; 
          // else the value is reset to the default value
        } else {
          this.color = 70;
        }
      }
    }
  };
}

// FUNCTION DISPLAYS BLOCKS IN THE BG
// displays each block with specified offset and threshold distance
function displayBlock(block, offset, d) {
  // calls the display() method of the block object
  block.display(offset, d); 
}

//color interaction when mouse button is clicked
// Define a colors array with colors for the text
let colors = ["#F6F1F1", "#D2D4FF", "#8E92FF", "#6166FF"];

// Variable to store the index of the current color in the palette 
let currentColorIndex = 0;

// FUNCTION EXECUTES WHENEVER USER CLICKS MOUSE 
function mouseClicked() {
  // when the mouse is clicked, text color changes to the next color in the palette (array)
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  let selectedColor = colors[currentColorIndex];
  displayText.style("color", selectedColor);
}