// AUDIO VISUALIZATION ACTIVITY | SPECTROGRAM

let song;
let fft;
let amplitude;
let bands = 360; // Number of frequency bands
let spectrogramRadius = 84; // Radius of the spectrogram
let colors = ['#f0f0f0', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']; // Color palette
let currentColorIndex = 0; // Index of the current color
let playButton; // Button to toggle play/pause
let colorButton; // Button to change colors
let volumeSlider; // Slider to control volume

function preload() {
  song = loadSound('Black Sheep.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  song.play();

  // Create a button to toggle play/pause
  playButton = createButton('PAUSE');
  playButton.position((windowWidth / 2) - 50, windowHeight - 50); // Position the button at the bottom center
  playButton.mousePressed(togglePlayPause); // Add event listener to the button
  styleButton(playButton); // Style the button

  // Create a button to change color
  colorButton = createButton('🖌️'); // Add dropper icon
  colorButton.position(10, 10); // Position the button at the top left
  colorButton.mousePressed(changeColor); // Add event listener to the button
  styleButton(colorButton); // Style the button

  // Create a volume slider
  volumeSlider = createSlider(0, 1, 0.5, 0.01); // Range from 0 to 1 with initial value 0.5
  volumeSlider.position(windowWidth - 160, 10); // Position the slider at the top right
  volumeSlider.style('width', '10rem'); // Set the width of the slider
  styleSlider(volumeSlider); // Style the slider
  volumeSlider.input(updateVolume); // Add event listener to update volume
}

function draw() {
  background(0);

  // Get the amplitude level
  let level = amplitude.getLevel();

  // Get the frequency spectrum
  let spectrum = fft.analyze();

  // Draw the radial spectrogram
  translate(width / 2, height / 2); // Move origin to the center
  for (let i = 0; i < bands; i++) {
    // Map index to angle (start from top)
    let angle = map(i, 0, bands, -HALF_PI, TWO_PI - HALF_PI);
    // Set radius of the spectrogram
    let r = spectrogramRadius;
    // Calculate coordinates of the start and end points of each segment
    let x1 = r * cos(angle);
    let y1 = r * sin(angle);
    let x2 = (r + map(spectrum[i % (spectrum.length - 1)], 0, 255, 0, height / 2 - spectrogramRadius)) * cos(angle); // Map amplitude to radius
    let y2 = (r + map(spectrum[i % (spectrum.length - 1)], 0, 255, 0, height / 2 - spectrogramRadius)) * sin(angle); // Map amplitude to radius
    // Set stroke color
    stroke(colors[currentColorIndex]);
    // Draw a line segment
    line(x1, y1, x2, y2);
  }

  // Draw a circle based on the amplitude level
  let innerCircle = map(level, 0, 1, 0, 200);
  noFill();
  stroke(colors[currentColorIndex]);
  ellipse(0, 0, innerCircle, innerCircle);
}

function windowResized() {
  // Resize the canvas when the window is resized
  resizeCanvas(windowWidth, windowHeight);
  // Reposition the play/pause button
  playButton.position((windowWidth / 2) - 50, windowHeight - 50);
  // Reposition the color change button at the top left
  colorButton.position(10, 10);
  // Reposition the volume slider at the top right
  volumeSlider.position(windowWidth - 160, 10);
}

function changeColor() {
  // Change the color palette
  currentColorIndex = (currentColorIndex + 1) % colors.length;
}

function togglePlayPause() {
  // Toggle between play and pause
  if (song.isPlaying()) {
    song.pause();
    playButton.html('PLAY');
  } else {
    song.play();
    playButton.html('PAUSE');
  }
}

function updateVolume() {
  // Update the volume based on the slider's value
  song.setVolume(volumeSlider.value());
}

function styleButton(button) {
  button.style('padding', '10px 20px');
  button.style('background-color', '#333');
  button.style('color', '#fff');
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');
  button.style('font-size', '16px');
  button.style('font-family', 'Arial, sans-serif');
  button.style('outline', 'none');
  button.mouseOver(() => button.style('background-color', '#555'));
  button.mouseOut(() => button.style('background-color', '#333'));
}

function styleSlider(slider) {
  slider.style('width', '150px');
  slider.style('height', '10px');
  slider.style('background-color', '#ddd');
  slider.style('border-radius', '5px');
  slider.style('outline', 'none');
  slider.style('opacity', '0.7');
  slider.style('transition', 'opacity .2s');
  slider.style('appearance', 'none'); // Remove default styling

  // Apply custom CSS class to the slider thumb
  slider.addClass('custom-slider-thumb');

  // Add opacity effects on hover
  slider.mouseOver(() => slider.style('opacity', '1'));
  slider.mouseOut(() => slider.style('opacity', '0.7'));
}
