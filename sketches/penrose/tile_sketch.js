var center;
var vector;

function setup() {
  createCanvas(displayWidth,displayHeight*2/3)
  frameRate(2)
  center = createVector(100,100);
  vector = vectorFromMagAndAngle(10,50)

}
function draw() {
  clear()
  background(51);

  fill(50,5,150)
  const k = new Kite(center,vector)
}
