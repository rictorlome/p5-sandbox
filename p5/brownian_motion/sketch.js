// 1st sketch. Brownian motion. Based on below example.
// https://p5js.org/examples/simulate-brownian-motion.html
var num = 3000;
var range = 30;

var ax = [];
var ay = [];

function setup() {
  createCanvas(600,400);
  for (let i = 0; i < num; i++) {
    ax[i] = width / 2;
    ay[i] = height / 2;
  }
  frameRate(100)
}

function draw() {
  background(51);

  for (let i = 1; i < num; i++) {
    ax[i-1] = ax[i];
    ay[i-1] = ay[i];
  }
  ax[num-1] += random(-range,range);
  ay[num-1] += random(-range,range);

  ax[num-1] = constrain(ax[num-1],0,width);
  ay[num-1] = constrain(ay[num-1],0,height);

  for (let i = 1; i < num; i++) {
    const randomSkewedColor = i * 0.1275
    stroke(randomSkewedColor,randomSkewedColor/2,randomSkewedColor/3);
    line(ax[i-1],ay[i-1],ax[i],ay[i]);
  }
}
