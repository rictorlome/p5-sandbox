function setup() {
  createCanvas(displayWidth, displayHeight*2/3);
}

function draw() {
  clear()
  background(51)
  const vec = createVector(20,20)
  const col = color(40,30,30)
  const point = createVector(100,100)
  dart(point,vec,col)
}

function dart(point,vector,color) {
  fill(color)
  angleMode(DEGREES)
  const outerWingLength = 2 * vector.mag() * cos(36);

  const x2 = point.x+vector.x;
  const y2 = point.y+vector.y;

  const rightVec = vector.copy();
  rightVec.rotate(-72);
  const leftVec = vector.copy();
  leftVec.rotate(72);

  const x3 = x2 + rightVec.x
  const y3 = y2 + rightVec.y

  const x4 = x2 + leftVec.x
  const y4 = y2 + leftVec.y

  triangle(point.x,point.y,x2,y2,x3,y3)
  triangle(point.x,point.y,x2,y2,x4,y4)
}
