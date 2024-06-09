// DATA VISUALIZATION ACTIVITY | CO2 EMISSIONS IN 2022

let data;
let countries = [];
let emissions = [];
let maxEmission;

function preload() {
  data = loadTable('emissions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100); // Use HSB color mode for more control over colors
  noLoop();
  noStroke();

  if (data) {
    let emissionsColumn = data.getColumn('CO₂ Emissions(Mt)');
    emissions = emissionsColumn.map(e => float(e));
    maxEmission = max(emissions);
  }
}

function draw() {
  background('#242424'); // Set background color to #242424
  
  // Draw the heading
  fill('#FCFCFC'); // Set text color to #FCFCFC
  textSize(32);
  textAlign(CENTER, CENTER);
  textStyle(BOLD); // Make heading bold
  let headingY = 60;
  text("CO₂ Emissions in 2022", windowWidth / 2, headingY);
  let headingWidth = textWidth("CO₂ Emissions in 2022"); // Get the width of the heading text
  let lineY = headingY + textSize() / 2 + 5; // Calculate the Y position of the line
  line(windowWidth / 2 - headingWidth / 2, lineY, windowWidth / 2 + headingWidth / 2, lineY); // Draw the line below the heading

  if (data) {
    let numRows = data.getRowCount();
    let country = data.getColumn('Country');
    let availableHeight = windowHeight - 100; // Reduce available height for bars to account for the heading
    let barHeight = availableHeight / (numRows + 1); // Dynamically adjust bar height based on available height
    let maxBarWidth = windowWidth * 0.6; // Maximum width for bars

    for (let i = 0; i < numRows; i++) {
      let x = windowWidth * 0.2; // Start bars at 20% of the window width
      let y = 100 + barHeight * (i + 0.24); // Position bars with dynamic spacing below the heading
      let w = map(emissions[i], 0, maxEmission, 0, maxBarWidth); // Dynamically scale bar width
      let h = barHeight * 0.8; // Bar height is 80% of the dynamic bar height

      let c = map(emissions[i], 0, maxEmission, 180, 240); // Map colors to a range of blue hues
      fill(c, 100, 100); // Set the fill color using HSB

      rect(x, y, w, h);

      // Display country names
      fill('#FCFCFC'); // Set text color to #FCFCFC
      textSize(13.5);
      textStyle(NORMAL);
      textAlign(RIGHT, CENTER);
      text(country[i], x - 10, y + h / 2);

      // Display emission values
      textAlign(LEFT, CENTER);
      text(emissions[i], x + w + 10, y + h / 2);
    }

    // Draw x-axis label
    fill('#FCFCFC'); // Set text color to #FCFCFC
    textSize(17.4);
    textAlign(CENTER, TOP);
    text("Emissions (Mt)", windowWidth / 2, windowHeight - 24);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
