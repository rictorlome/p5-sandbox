const LEFT = true;
const RIGHT = false;

function setup() {
  createCanvas(displayWidth,displayHeight*2/3)
}
function draw() {
  clear()
  background(51);

  fill(50,5,150)
  const kite = new Kite(createVector(100,100),createVector(200,200));
  kite.render()
  const halfK = kite.half(LEFT);
  fill('yellow')
  const children = halfK.subdivide();
  children.forEach( (child) => {
    child.subdivide().forEach((subchild) => {
      fill('orange')
      subchild.render()
    });
  });
}
function vectorBetween(a,b) {
  return createVector(b.x-a.x, b.y - a.y);
}
function midpoint(a,b) {
  // return createVector((a.x+b.x)/2,(a.y+b.y)/2);
  return p5.Vector.lerp(a,b,0.5);
}
function opposite(side) {
  return !side;
}
//pass point in as vector.
class Kite {
  constructor(point,vector) {
    this.tip = point;
    this.tail = p5.Vector.add(point,vector);
    this.vector = vector;
    const ratio = 2*sin(18);
    this.center = p5.Vector.lerp(this.tail,this.tip,ratio)
  }
  half(side) {
    return new HalfKite(this,side);
  }
  pointFromSide(side) {
    const copyVec = this.vector.copy();
    angleMode(DEGREES);
    side === RIGHT ? copyVec.rotate(216) : copyVec.rotate(-216);
    return copyVec.add(this.tail);
  }
  pointFromOtherSide(side) {
    return this.pointFromSide(!side);
  }
  render() {
    const rightVec = this.vector.copy();
    rightVec.rotate(-216);
    const leftVec = this.vector.copy();
    leftVec.rotate(216);

    const x3 = this.tail.x + rightVec.x
    const y3 = this.tail.y + rightVec.y

    const x4 = this.tail.x + leftVec.x
    const y4 = this.tail.y + leftVec.y

    triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,x3,y3)
    triangle(this.tip.x,this.tip.y,this.tail.x,this.tail.y,x4,y4)
  }
}
class Dart {
  constructor(point,vector) {
    this.tip = point;
    this.tail = p5.Vector.add(point,vector);
    this.vector = vector;
  }
  half(side) {
    return new HalfDart(this,side);
  }
  pointFromSide(side) {
    const copyVec = this.vector.copy();
    angleMode(DEGREES);
    side === RIGHT ? copyVec.rotate(72) : copyVec.rotate(-72);
    return copyVec.add(this.tail);
  }
  pointFromMidSide(side) {
    const ratio = 2*sin(18);
    return p5.Vector.lerp(this.tip,this.pointFromSide(side),ratio);
  }
}

class HalfKite {
  constructor(kite,side) {
    this.kite = kite;
    this.side = side;
  }
  subdivide() {
    const parentKite = this.kite;
    const babyKite = new Kite(parentKite.center,vectorBetween(parentKite.center,parentKite.pointFromSide(this.side)));
    const dart = new Dart(parentKite.tail,vectorBetween(parentKite.tail,babyKite.pointFromOtherSide(this.side)));
    return [new HalfKite(babyKite,LEFT), new HalfKite(babyKite,RIGHT), new HalfDart(dart,opposite(this.side))];
  }
  render(config) {
    const parentKite = this.kite;
    const pointFromSide = parentKite.pointFromSide(this.side);
    triangle(parentKite.tip.x,parentKite.tip.y,pointFromSide.x,pointFromSide.y,parentKite.tail.x,parentKite.tail.y);
  }
}
class HalfDart {
  constructor(dart,side) {
    this.dart = dart;
    this.side = side;
  }
  subdivide() {
    const parentDart = this.dart;
    const sidePoint = parentDart.pointFromSide(this.side);
    const pointFromMidSide = parentDart.pointFromMidSide(this.side);
    const babyKite = new Kite(pointFromMidSide,vectorBetween(pointFromMidSide,parentDart.tip))
    const babyDart = new Dart(sidePoint,vectorBetween(sidePoint,pointFromMidSide));
    return [new HalfKite(babyKite,opposite(this.side)), new HalfDart(babyDart,this.side)]
  }
  render(config) {
    const parentDart = this.dart;
    const pointFromSide = parentDart.pointFromSide(this.side);
    triangle(parentDart.tip.x,parentDart.tip.y,pointFromSide.x,pointFromSide.y,parentDart.tail.x,parentDart.tail.y);
  }












}
