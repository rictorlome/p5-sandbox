// 1st sketch. Brownian motion. Based on below example.
// https://p5js.org/examples/simulate-brownian-motion.html
var num = 2000;
var range = 30;

var ax = [];
var ay = [];
var colors = [];
var strokeWeights = [];

function setup() {
  createCanvas(displayWidth, displayHeight*2/3);
  colorMode(RGB,100)
  for (let i = 0; i < num; i++) {
    ax[i] = width / 2;
    ay[i] = height / 2;
    colors[i] = 50;
    strokeWeights[i] = 2;
  }
  frameRate(30)
}

function draw() {
  background(51);

  for (let i = 1; i < num; i++) {
    ax[i-1] = ax[i];
    ay[i-1] = ay[i];
    colors[i-1] = colors[i]
    strokeWeights[i-1] = strokeWeights[i]
  }
  ax[num-1] += random(-range,range);
  ay[num-1] += random(-range,range);
  colors[num-1] += random(-1,1)
  strokeWeights[num-1] += random(0,1.5)

  ax[num-1] = constrain(ax[num-1],0,width);
  ay[num-1] = constrain(ay[num-1],0,height);
  colors[num-1] = constrain(colors[num-1],0,100)
  strokeWeights[num-1] = constrain(strokeWeight[num-1],2,3.5)

  for (let i = 1; i < num; i++) {
    stroke(colors[i], colors[i]/2, colors[i]/4);
    strokeWeight(strokeWeights[i])
    line(ax[i-1],ay[i-1],ax[i],ay[i]);
  }
}
