Blood = function(x, y, end) {
    this.pos = createVector(x, y)
    this.end = frameCount + end
    this.col = color(150 + random(-60, 60), 0, 0)
    this.r = 3 + random(-2, 5)
    this.show = function() {
        fill(this.col);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r);
        this.r += 0.05
    }
}
