let sounds = [];
let fft;
let amp;
let waveform;
let spectrum;
let playButton, selector;
let currentSoundIndex = 2;

function preload() {
  // Load four audio files (make sure to upload them to the p5 editor)
  sounds[0] = loadSound('strike.mp3');
  sounds[1] = loadSound('zig-zag.mp3');
  sounds[2] = loadSound('pinwheel.mp3');
  sounds[3] = loadSound('piston-1.mp3');
  sounds[4] = loadSound('dotted-spiral.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  noFill();

  fft = new p5.FFT();
  amp = new p5.Amplitude();

  // Play / Pause button
  playButton = createButton('Play / Pause');
  playButton.position(50, 50);
  playButton.mousePressed(togglePlay);

  // Dropdown for selecting audio
  selector = createSelect();
  selector.position(140, 50);
  selector.option('Sound 1', 0);
  selector.option('Sound 2', 1);
  selector.option('Sound 3', 2);
  selector.option('Sound 4', 3);
  selector.changed(changeSound);
}

function draw() {
  background(0, 0.1);

  spectrum = fft.analyze();
  waveform = fft.waveform();
  let level = amp.getLevel();
  let radius = map(level, 0, 1, 200, 100);

  translate(width / 2, height / 2);

  // Draw waveform circle
  stroke(260, 180, 325);
  strokeWeight(2);
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let angle = map(i, 0, waveform.length, 0, TWO_PI);
    let r = radius + waveform[i] * 200;
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);

  // Draw frequency bars
  for (let i = 0; i < spectrum.length; i += 20) {
    let angle = map(i, 0, spectrum.length, 0, TWO_PI);
    let ampVal = spectrum[i];
    let r = map(ampVal, 0, 200, radius, radius + 160);
    let x = r * cos(angle);
    let y = r * sin(angle);
    stroke(map(i, 0, spectrum.length, 0, 300), 210, 250);
    line(0, 0, x, y);
  }
}

function togglePlay() {
  let currentSound = sounds[currentSoundIndex];
  if (currentSound.isPlaying()) {
    currentSound.pause();
  } else {
    stopAllSounds();
    currentSound.loop();
    fft.setInput(currentSound);
    amp.setInput(currentSound);
  }
}

function changeSound() {
  stopAllSounds();
  currentSoundIndex = int(selector.value());
  sounds[currentSoundIndex].loop();
  fft.setInput(sounds[currentSoundIndex]);
  amp.setInput(sounds[currentSoundIndex]);
}

function stopAllSounds() {
  for (let i = 0; i < sounds.length; i++) {
    if (sounds[i].isPlaying()) {
      sounds[i].stop();
    }
  }
}
