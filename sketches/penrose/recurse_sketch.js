var slider;
const MAX_DEPTH = 10;
const FRAME_RATE = 10;
const config = {
  1: 'green',
  2: 'blue',
  3: 'red',
  4: 'orange',
  5: 'yellow'
}
const depthToShapes = {};

function setup() {
  createCanvas(displayWidth,displayHeight)
  slider = createSlider(1,MAX_DEPTH,8);
  slider.position(250,50);

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
  const curTime = frameCount / FRAME_RATE;
  const shapes = shapesAtDepth(depthToShapes,slider.value())
  shapes.forEach(shape => {
    if (isVisible(shape.tip(),curTime)) shape.render()
  });
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
function isVisible(point, time=0) {
  const xFrontier = (width/10) * time;
  return point.x < xFrontier;
}
