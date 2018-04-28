var checkbox;
var shapes = [];
var curVec;

function setup() {
  cnv = createCanvas(displayWidth, displayHeight*2/3);
  cnv.mousePressed(createShape)
  checkbox = createCheckbox('Kite', false)

  curVec = createVector(0, 20)
}

function draw() {
  clear()
  background(51)

  renderAngle(curVec)
  renderTestShape()

  for (let i = 0; i < shapes.length; i++) {
    let shape = shapes[i];
    if (shape.type === 'Kite') {
      kite(shape.point,shape.vector,shape.color)
    } else {
      dart(shape.point,shape.vector,shape.color)
    }
  }
}

function createShape() {
  let copy = curVec.copy()
  var defaultDartVec = copy.mult(2)
  let dartCopy = defaultDartVec.copy()
  var defaultKiteVec = dartCopy.mult(1/(2*sin(18)))
  //Dart
  let shape = {};
  shape.point = createVector(mouseX,mouseY)
  if (!checkbox.checked()) {
    shape.type = 'Dart'
    shape.vector = defaultDartVec;
    shape.color = color(40,30,30)
  } else {
    shape.type = 'Kite';
    shape.vector = defaultKiteVec;
    shape.color = color(200,200,200)
  }
  shapes.push(shape)
}
function renderTestShape() {
  let copy = curVec.copy()
  var defaultDartVec = copy.mult(2)
  let dartCopy = defaultDartVec.copy()
  var defaultKiteVec = dartCopy.mult(1/(2*sin(18)))
  //Dart
  let point = createVector(mouseX,mouseY)
  if (!checkbox.checked()) {
    dart(point, defaultDartVec, color(40,30,30))
  } else {
    kite(point,defaultKiteVec,color(200,200,200))
  }
}

function dart(point,vector,color) {
  fill(color)
  angleMode(DEGREES)
  const outerWingLength = 2 * vector.mag() * cos(36);
  const innerWingLength = vector.mag()

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
  fill(color)
  const x2 = point.x+vector.x;
  const y2 = point.y+vector.y;

  const tipSide = 2 * vector.mag() * sin(18);
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

function renderAngle(curVec) {
  stroke(230,230,230)
  strokeWeight(2)
  line(30,30,30+curVec.x,30+curVec.y)
  stroke(0,0,0)
  strokeWeight(1)
}
function keyPressed() {
  angleMode(DEGREES)
  if (keyCode === LEFT_ARROW) {
    curVec.rotate(5);
  } else if (keyCode === RIGHT_ARROW) {
    curVec.rotate(-5)
  }
}
