function setup() {
  createCanvas(displayWidth, displayHeight*2/3);
}

function draw() {
  clear()
  background(51)
  const vec = createVector(10,30)
  const col = color(40,30,30)
  const point = {x: 200, y: 200}
  dart(point,vec,col)
}

function dart(point,vector,color) {
  fill(color)
  angleMode(DEGREES)
  const edgeLength = 2 * vector.mag() * cos(36)
  debugger
  const wingCoordX1 = point.x + edgeLength * cos(54)
  const wingCoordX2 = point.x - edgeLength * cos(54)
  const wingCoordY = point.y + edgeLength * sin(54)
  triangle(point.x,point.y,wingCoordX1,wingCoordY,point.x+vector.x,point.y+vector.y)
  triangle(point.x,point.y,wingCoordX2,wingCoordY,point.x+vector.x,point.y+vector.y)
  // quad(point.x,point.y,wingCoordX1, wingCoordY,point.x+vector.x,point.y+vector.y,wingCoordX2, wingCoordY)
}
