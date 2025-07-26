Case = function(x, y) {
  this.pos = createVector()
  this.n = createVector(x, y)
  this.val = Math.random() > 0.8 ? 2 : 1
  this.draw = function() {
    fill(game.tileColor[this.val-1].b)
    rect(game.offX + getPos(this.n.x), game.offY + getPos(this.n.y), game.rsize, game.rsize, 5)
    textAlign(CENTER, CENTER)
    textSize(game.rsize/2)
    fill(game.tileColor[this.val-1].c)
    strokeWeight(1)
    text(game.tileColor[this.val-1].n, game.offX + getPos(this.n.x) + game.rsize/2 ,game.offY + getPos(this.n.y) + game.rsize/2)

  }
  this.update = function() {

  }
}
