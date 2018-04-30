var slider;
var config;
var curTime;
var TIME_OFFSET = 0;

const MAX_DEPTH = 9;
const FRAME_RATE = 12;
const SECS_TO_FILL = 5;
const depthToShapes = {};

p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(displayWidth,displayHeight)
  slider = createSlider(3,MAX_DEPTH,8);
  slider.position(250,50);
  button = createButton('Reset');
  button.position(250,80)
  button.mousePressed( () => TIME_OFFSET = curTime)

  config = {
    1: color('white'),
    2: color('grey'),
    3: color('grey'),
    4: color('white'),
    5: color('pink')
  }
  frameRate(FRAME_RATE)

  const center = createVector(width/2,height/2);
  const length = width;
  const halves = halfShapes(initializeSun(center,length));
  depthToShapes[0] = halves;
}
function draw() {
  clear()
  background(51);

  fill(50,5,150)
  strokeWeight(1/(2*slider.value()))
  curTime = frameCount / FRAME_RATE;
  const shapes = shapesAtDepth(depthToShapes,slider.value())
  const length = shapes.length;
  for (let i = 0; i < length; i++) {
    const shape = shapes[i];
    if (isVisible(shape.tip(),curTime-TIME_OFFSET)) shape.render()
  }
}

function initializeStar(center,length) {
  angleMode(DEGREES);
  const shapes = [];
  for (let i = 1; i <= 5; i++) {
    const angle = (360 / 5) * i;
    const newVec = vectorFromMagAndAngle(length,angle)
    newVec.rotate(angle)
    shapes.push(new Dart(center,newVec));
  }
  return shapes;
}
function initializeSun(center,length) {
  angleMode(DEGREES);
  const shapes = [];
  for (let i = 1; i <= 5; i++) {
    const angle = (360 / 5) * i;
    const newVec = vectorFromMagAndAngle(length,angle)
    newVec.rotate(angle)
    shapes.push(new Kite(p5.Vector.add(center,newVec),p5.Vector.mult(newVec,-1)));
  }
  return shapes;
}
function initializeKing(center,length) {
  angleMode(DEGREES);
}
function halfShapes(shapes) {
  const arr = [];
  shapes.forEach( (shape) => {
    arr.push(shape.half(LEFT));
    arr.push(shape.half(RIGHT));
  })
  return arr;
}
function shapesAtDepth(map, depth) {
  if (Boolean(map[depth])) return map[depth];
  const prevShapes = shapesAtDepth(map,depth-1);
  const newDepth = [];
  prevShapes.forEach( (shape) => {
    shape.subdivide().forEach( (subShape) => {
      newDepth.push(subShape);
    });
  });
  map[depth] = newDepth;
  return newDepth;
}
function timeSubmerged(point,func) {
  const newPoint = createVector(point.x/width,point.y/height);
  const fracTime = func(newPoint);
  return fracTime * SECS_TO_FILL;
}
function paraboloid(point) {
  var x = point.x;
  var y = point.y;
  // x = Math.pow(x - 0.5,2)
  // y = Math.pow(y - 0.5,2)
  return x + y * Math.sin(3 * x);
  // return Math.sin(x) + 2 * y * Math.cos(6 * Math.PI * y );
  // return Math.sin(x) + Math.sin(y);
  // return Math.pow(Math.abs(point.x-0.5),2) + Math.abs(Math.sin(point.y-0.5))*3;
  // return Math.pow(x, 2) + 0.5 * (x + Math.sin(y));
}
function isVisible(point, time=0) {
  // const xFrontier = width * time;
  // const z = sin(point.x+point.y) + point.x;
  // return z < xFrontier;
  return timeSubmerged(point,paraboloid) < time;
}
