const numStars = 50;
const starX = [];
const starY = [];

function setup() {
  createCanvas(displayWidth, displayHeight*2/3);
  background(20,37,66)
  for (let i = 0; i < numStars; i++) {
    starX[i] = random(0,width)
    starY[i] = random(0,height)
  }
  frameRate(14)
}
function draw() {
  for (let i = 0; i < numStars; i++) {
    fill(247, 233, 44, random(150,255))
    const randomSize = random(3,5)
    ellipse(starX[i],starY[i],randomSize,randomSize)
  }

}
