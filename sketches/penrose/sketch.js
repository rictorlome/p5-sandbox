var i = 0;

function setup() {
  createCanvas(displayWidth, displayHeight*2/3);
}

function draw() {
  clear()
  background(51)
  const vec1 = createVector(20,20)
  const vec2 = vec1.copy()
  vec2.mult(1/(2*sin(18)))

  const col = color(40,30,30)
  const point = createVector(mouseX,mouseY)
  const point2 = createVector(300,300)
  dart(point,vec1,col)
  const col2 = color('red')
  kite(point2,vec2,col2)
  i++;
}

function dart(point,vector,color) {
  fill(color)
  angleMode(DEGREES)
  const outerWingLength = 2 * vector.mag() * cos(36);
  const innerWingLength = vector.mag()
  if (i == 0) console.log(`Dart's InnerWingLength is ${innerWingLength}`);
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

function kite(point,vector,color) {
  const x2 = point.x+vector.x;
  const y2 = point.y+vector.y;

  const tipSide = 2 * vector.mag() * sin(18)
  if (i === 0) console.log(`Kite's tipSide is ${tipSide}`)
  const rightVec = vector.copy();
  rightVec.rotate(-216);
  const leftVec = vector.copy();
  leftVec.rotate(216);

  const x3 = x2 + rightVec.x
  const y3 = y2 + rightVec.y

  const x4 = x2 + leftVec.x
  const y4 = y2 + leftVec.y

  triangle(point.x,point.y,x2,y2,x3,y3)
  triangle(point.x,point.y,x2,y2,x4,y4)
}
