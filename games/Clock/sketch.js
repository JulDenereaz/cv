Clock = function(posX, posY, d) {
	this.center = createVector(posX, posY)
	this.d = d
	this.f = this.d / 105
	this.draw = function() {
		noStroke()
		fill('grey')
		ellipse(this.center.x, this.center.y, this.d)
		fill(255)
		ellipse(this.center.x, this.center.y, 100*this.f)
		stroke(0)
		strokeCap(SQUARE)
		for(i = 1; i <= 60; i ++) {
			a = 2*PI/60 * i
			if(i % 5) {
				strokeWeight(1.4*this.f)
				line(this.center.x+cos(a)*90*this.f/2, this.center.y+sin(a)*90*this.f/2, this.center.x+cos(a)*97*this.f/2, this.center.y+sin(a)*97*this.f/2)
			}else {
				strokeWeight(3.5*this.f)
				line(this.center.x+cos(a)*73*this.f/2, this.center.y+sin(a)*73*this.f/2, this.center.x+cos(a)*97*this.f/2, this.center.y+sin(a)*97*this.f/2)
			}
		}
		//hours
		push()
		fill(0)
		noStroke()
		a = 2*PI/12 * (hour() % 12) - PI/2 + 2*PI/720 * minute()
		translate(this.center.x, this.center.y)
		rotate(a)
		quad(-12*this.f, -3.2*this.f, 32*this.f, -2.6*this.f, 32*this.f, 2.6*this.f, -12*this.f, 3.2*this.f)
		pop()

		//minutes
		push()
		fill(0)
		noStroke()
		a = 2*PI/60 * minute() - PI/2 //+ 2*PI/3600 * second() + 2*PI/3600000 * new Date().getUTCMilliseconds();
		translate(this.center.x, this.center.y)
		rotate(a)
		quad(-12*this.f, -2.6*this.f, 46*this.f, -1.8*this.f, 46*this.f, 1.8*this.f, -12*this.f, 2.6*this.f)
		pop()

		//sec
		push()
		fill("red")
		noStroke()
		a = 2*PI/60 * second() - PI/2 + 2*PI/60000 * new Date().getUTCMilliseconds(); 
		a += 2*PI/2400 * second()
		if(a > 2*PI - PI/2) {
			a = 2*PI - PI/2
		}
		
		
		translate(this.center.x, this.center.y)
		rotate(a)
		rect(-16.5*this.f,-0.7*this.f, 47.7*this.f, 1.4*this.f)
		ellipse(31.2*this.f, 0, 10.5*this.f)
		pop()
	}
}

function setup() {
	createCanvas(windowWidth-20, windowHeight-20)
	offY = 0.2 * height
	width < height-offY ? d = width: d = height-offY
	clock = new Clock(width/2, height/2-offY/2, d)
}



function draw() {
	background(255)
	clock.draw()
	stroke(0)
	strokeWeight(0.5*clock.f)
	fill(0)
	textAlign(CENTER)
	textSize(8*clock.f)
	d = new Date()
	t = ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2)
	text(t, width/2, height/2-offY/2 + 75*clock.f)
	strokeWeight(0.7*clock.f)
	textSize(15*clock.f)
	t = day() + '.' + month() + '.' + year()
	text(t, width/2, height/2-offY/2 + 65*clock.f)

}

function windowResized() {
  resizeCanvas(windowWidth-20, windowHeight-20)
	offY = 0.2 * height
	width < height-offY ? d = width: d = height-offY
	clock = new Clock(width/2, height/2-offY/2, d)
}
