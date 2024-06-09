// SNAKE GAME | ACTIVITY

// Declare variables
let cols; let rows; //number of rows & columns in grid
let size = 25; //size of each cell
let board = []; //grid

let food; //position of the food
let head; //position of the snake's head
let dir; //direction of the movement of the snake
let length = 1; //inital length of the snake

let gameOver = false; //tell if the game is over
let gameStarted = false; //tell if the game has started
let gameOverScreen = false; //tell if the game over screen is displayed
let restartButton; //restart button
let startButton; //start button
let score = 0; //store the player's score
let winScreen = false; //tell if the win screen is displayed

function setup() {
  // create a canvas of width 650 and height 500
  createCanvas(650, 450); 
  frameRate(5); //set the frame rate to 5 frames per second
  
  // number of columns and rows based on canvas and cell size
  cols = 16; 
  rows = 16;

  //nested loop for the grid
  for (let i = 0; i < cols; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      //set initial state of each cell to 0
      board[i][j] = 0;
    }
  }

  // generate initial positions for food and snake head
  food = createVector(int(random(0, cols)), int(random(0, rows)));
  head = createVector(int(random(0, cols)), int(random(0, rows)));
  
  // initialize direction vector
  dir = createVector(0, 0);

  // display start screen
  createStartScreen();
}

function draw() {
  
  // if the game is ongoing and not ended, update the game state, display the game board, food, and score
  if (gameStarted && !gameOverScreen && !winScreen) {
    background(220);
    update(); //update game state
    displayBoard(); //display the game board
    board[food.x][food.y] = -1; //display food on the board
    displayScore(); //display score during gameplay
  } 
  
  // if game is over, display the game over screen
  else if (gameOverScreen) {
    displayGameOverScreen();
  } 
  
  // if the win condition is met, display the win screen
  else if (winScreen) {
    displayWinScreen();
  }
}

// Update the game state (move snake, check collisions, etc.)
function update() {
  head.add(dir); //move snake's head in the current direction
  
  // check if snake eats food
  if (dist(head.x, head.y, food.x, food.y) == 0) {
    // if head and food are at the same position, snake eats food
    length += 1; //increase snake's length
    score += 10; //increase player's score
    generateFood(); //generate new food position
  }

  // check if the win condition is met
  if (score >= 100) {
    // if the score reaches 100, the player wins
    winScreen = true; // Display win screen
    gameStarted = false; // Stop the game
  }

  // check if game is over (collision with borders or itself)
  
  // if snake hits the border of the grid
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    gameOver = true; 
    gameOverScreen = true;
  } 
  
  // if the snake runs into itself
  else if (board[head.x][head.y] > 1) {
    gameOver = true;
    gameOverScreen = true;
    dir.set(0, 0); //stop movement of snake
  } 
  
  // if no collisions, the game is still ongoing
  else {
    // update the snake's position on the board
    board[head.x][head.y] = 1 + length; 
    // remove the tail of the snake
    removeTail(); 
  }
}

// display the game board
function displayBoard() {
  
  // calculate horizontal offset to center the grid horizontally
  let offsetX = (width - 400) / 2;
  // calculate vertical offset to center the grid vertically
  let offsetY = (height - 400) / 2;

  // nested loop to iterate through each cell in the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      // if cell is empty
      if (board[i][j] == 0) {
        fill(255); //color the cell white
      } 
      
      // if food is on the cell
      else if (board[i][j] == -1) {
        fill(255, 0, 0); //color the food red
      } 
      
      // if snake is on the cell
      else {
        fill(255, 255, 0); //color the snake yellow
      }
      
      // draw a rect on each cell
      rect(offsetX + i * size, offsetY + j * size, size, size);
    }
  }
}

// generates a new position for the food
function generateFood() {
  while (true) {
    
    // creates and positions food randomly 
    food = createVector(int(random(0, cols - 1)), int(random(0, rows - 1)));
    
    // if food position is not occupied by snake
    if (board[food.x][food.y] == 0) {
      break; //exit the loop
    }
  }
}

// remove the snake's tail
function removeTail() {
  
  // nested loop to access each cell
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      
      // if cells are occupied by the snake
      if (board[i][j] > 0) {
        board[i][j] -= 1; //decrement the value of cells occupied by the snake
      }
    }
  }
}

// handle keyboard input for controlling the snake's direction
function keyPressed() {
  // move the snake left
  if (keyCode === LEFT_ARROW) {
    dir = createVector(-1, 0);
  } 
  // move the snake right
  else if (keyCode === RIGHT_ARROW) {
    dir = createVector(1, 0);
  } 
  // move the snake down
  else if (keyCode === DOWN_ARROW) {
    dir = createVector(0, 1);
  } 
  // move the snake up
  else if (keyCode === UP_ARROW) {
    dir = createVector(0, -1);
  }
}

// display the start screen
function createStartScreen() {
  
  // text styling
  background(220);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(30);
  textFont("monospace");
  
  // display the game title
  text("Snake Game", width / 2, height / 2 - 65);
  
  // decrease font size
  textSize(18);
  
  // display instructions
  text("Use the arrow keys to navigate the snake to the food.", width / 2, height / 2 - 25);
  text("Score 100 points to win!", width / 2, height / 2);

  // create the start button
  startButton = createButton("Start");
  // position the start button
  startButton.position(width / 2 - 50, height / 2 + 30);
  
  // button styling
  startButton.size(100, 50);
  startButton.style('font-family', 'monospace');
  startButton.style('font-size', '20px');
  startButton.style('background-color', '#4CAF50');
  startButton.style('color', 'white');
  startButton.style('border', 'none');
  startButton.style('border-radius', '5px');
  
  // attach the button to the event listener
  startButton.mousePressed(startGame);
}

// start the game
function startGame() {
  gameStarted = true; //set game started to true
  startButton.remove(); //remove the start button
}

// display the game over screen
function displayGameOverScreen() {
  
  // text styling
  background(220);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(50);
  
  // display and position the game over text
  text("GAME OVER", width / 2, height / 2 - 80);
  
  // decrease font size
  textSize(20);
  
  // display the player's score
  text("Score: " + score, width / 2, height / 2 - 40); 
  
  // checks if player runs into border
  if (gameOver && head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    text("Run Into Border", width / 2, height / 2);
  } 
  // checks if player runs into itself
  else if (gameOver && board[head.x][head.y] > 1) {
    text("Run Into Itself", width / 2, height / 2);
  }
  
  // create and display the restart button
  if (!restartButton) {
    restartButton = createButton("Restart");
    // position the button
    restartButton.position(width / 2 - 50, height / 2 + 30);
    
    // button styling
    restartButton.size(100, 50);
    restartButton.style('font-family', 'monospace');
    restartButton.style('font-size', '20px');
    restartButton.style('background-color', '#f44336');
    restartButton.style('color', 'white');
    restartButton.style('border', 'none');
    restartButton.style('border-radius', '5px');
    
    // attach the button to an event listener
    restartButton.mousePressed(restartGame);
  }
}

// display the win screen
function displayWinScreen() {
  
  // styling
  background(220);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(50);
  
  // display and position the win message
  text("YOU WIN!", width / 2, height / 2 - 40);
  
  // descrease font size
  textSize(20);
  // display the score on the win screen
  text("Score: " + score, width / 2, height / 2); 

  // create and display the restart button
  if (!restartButton) {
    restartButton = createButton("Restart");
    // position the button
    restartButton.position(width / 2 - 50, height / 2 + 30);
    
    // button styling
    restartButton.size(100, 50);
    restartButton.style('font-family', 'monospace');
    restartButton.style('font-size', '20px');
    restartButton.style('background-color', '#4CAF50');
    restartButton.style('color', 'white');
    restartButton.style('border', 'none');
    restartButton.style('border-radius', '5px');
    
    // attach the button to an event listener
    restartButton.mousePressed(restartGame);
  }
}

// restart the game
function restartGame() {
  gameOverScreen = false; //hide the game over screen
  winScreen = false; //hide the game win screen
  gameOver = false; //reset game over
  gameStarted = true; //restart the game
  length = 1; //reset the snake's length
  score = 0; // reset the score
  board = []; //clear the board
  
  // nested loop to iterate through each cell
  for (let i = 0; i < cols; i++) {
    board[i] = [];
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0; //reset each cell to empty
    }
  }
  
  // generate a new random position for the snake head
  head = createVector(int(random(0, cols)), int(random(0, rows)));
  // reset the snake direction
  dir = createVector(0, 0);
  // generate a new position for the food
  generateFood();
  
  // remove the restart button if it exists
  if (restartButton) {
    restartButton.remove();
    restartButton = null;
  }
}

// display the player's score on the screen
function displayScore() {
  textAlign(RIGHT, TOP); // align text to the top right corner
  
  // text styling
  fill(0);
  textSize(20);
  
  // display the score in the top right corner
  text("Score: " + score, width - 10, 10); 
}