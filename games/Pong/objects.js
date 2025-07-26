Player = function() {
  this.pos = createVector(width/2, height/2)
  this.vel = createVector(0, 0)
  this.acc = createVector(0, 0)
  this.friction = 0.8
  this.gunSize = 100
  this.maxVel = 15
  this.draw = function() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, 50)
    stroke('blue')
    line(this.pos.x, this.pos.y, this.pos.x + this.gunSize*Math.cos(this.dir), this.pos.y + this.gunSize*Math.sin(this.dir))

  }
  this.update = function() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxVel)
    this.vel.mult(this.friction)
    this.pos.add(this.vel)
    this.acc.set(0, 0)
    this.dir = createVector(mouseX-this.pos.x, mouseY-this.pos.y).heading()




  }

  this.applyForce = function(force) {
    this.acc.add(force)
  }


}



Bullet = function(start, target) {

}


function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}
