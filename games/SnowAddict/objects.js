

Weather = function() {
	this.choices = [{logo:'sun', sn:0}, {logo:'cloud', sn:0.5}, {logo:'snow', sn:2}]
	this.current = 0
	this.timeNext = millis() + Math.round(random(3000, 7000))
	this.next = 2
	this.change = function() {
		this.current = this.next
		game.snowStrength = this.choices[this.current].sn
		this.next = Math.floor(Math.random() * this.choices.length)
		this.timeNext = millis() + Math.round(random(3000, 7000))
	}
	this.show = function() {
		this.drawItem(width-100, 25, this.choices[this.current])
		stroke(0)
    line(width-75, 25, width-50, 25)
    fill(0)
    triangle(width-55, 20, width-50, 25, width-55, 30)
		this.drawItem(width-25, 25, this.choices[this.next])
	}
	this.drawItem = function(x, y, item) {
		switch(item.logo) {
			case 'sun':
				fill('yellow')
				ellipse(x, y, 25)
				break;
			case 'snow':
				fill('grey');
				ellipse(x, y, 25)
				fill(255)
				ellipse(x, y, 10)
				break;
			case 'cloud':
				fill('grey');
				ellipse(x, y, 25)
				break;
		}

	}
	this.update = function() {
		if(millis()- this.timeNext > 0) {
			this.change()
			console.log(123)
		}
	}
}


Area = function() {
	this.snowDepth = 0
	this.maxSnowDepth = 255
	this.trail = []
	this.show = function() {
		//draw level

		//snow drawing
		fill(255)
		rect(0, 0, width, height)

		//trail drawin
		if(this.trail.length > 0) {
			for (var i = 0; i < this.trail.length-1; i++) {
				fill(this.trail[i].snowDepth)
				stroke(this.trail[i].snowDepth)
				beginShape();
				vertex(this.trail[i].pos1.x, this.trail[i].pos1.y)
				vertex(this.trail[i+1].pos1.x, this.trail[i+1].pos1.y)
				vertex(this.trail[i+1].pos2.x, this.trail[i+1].pos2.y)
				vertex(this.trail[i].pos2.x, this.trail[i].pos2.y)
				endShape()
			}
		}

		// if(this.trail.length > 1) {
		// 	for (var i = 0; i < this.trail.length-1; i++) {
		// 		fill('red')
		// 		ellipse(this.trail[i].pos1.x, this.trail[i].pos1.y, 5)
		// 		ellipse(this.trail[i+1].pos1.x, this.trail[i+1].pos1.y, 5)
		// 		ellipse(this.trail[i].pos2.x, this.trail[i].pos2.y, 5)
		// 		ellipse(this.trail[i+1].pos2.x, this.trail[i+1].pos2.y, 5)
		// 		stroke('black')
		// 		line(this.trail[i].pos3.x, this.trail[i].pos3.y, this.trail[i+1].pos3.x, this.trail[i+1].pos3.y)
		// 		line(this.trail[i].pos1.x, this.trail[i].pos1.y, this.trail[i].pos2.x, this.trail[i].pos2.y)
		// 		stroke('blue')
		// 		line(this.trail[i].pos1.x, this.trail[i].pos1.y, this.trail[i+1].pos1.x, this.trail[i+1].pos1.y)
		// 		stroke('green')
		// 		line(this.trail[i].pos2.x, this.trail[i].pos2.y, this.trail[i+1].pos2.x, this.trail[i+1].pos2.y)
		// 	}
		// }
	}
	this.update = function() {
		if(this.trail.length > 0 && this.trail[0].snowDepth > this.snowDepth) {
			this.trail.shift()
		}
	}
}

Player = function(x, y) {
	this.pos = createVector(x, y)
	this.vel = 0
	this.acc = 0
	this.angle = 0
	this.maxVel = 8
	this.drag = 0.10

	this.show = function() {
		push()
		translate(this.pos.x + game.offSet.x, this.pos.y + game.offSet.y)
		fill(255, 0, 0)
		stroke(0)
		ellipse(0, 0, 50)
		rotate(this.angle)
		line(0, 0, 40, 0)
		line(40, -30, 40, 30)
		pop()
	}

	this.applyForce = function(force) {
		this.acc.add(force)
	}

	this.update = function() {
		if(keyIsDown(68)) {
			this.angle += 0.12*game.timeWarp
		}
		if(keyIsDown(65)) {
			this.angle -= 0.12*game.timeWarp
		}
		if(keyIsDown(87)) {
			this.acc += 1
		}
		//if(keyIsDown(83)) {
		//	this.acc -= 0.5
		//}
		this.vel += this.acc
		if(this.vel > this.maxVel) {
			this.vel = this.maxVel
		}
		this.vel -= this.vel * this.drag
		this.pos.add(p5.Vector.fromAngle(this.angle).mult(this.vel).mult(game.timeWarp));

		//update pos of pusher
		this.pos3 = createVector(this.pos.x + 40*cos(this.angle), this.pos.y + 40*sin(this.angle))


		this.pos1 = createVector(this.pos3.x + 30*cos(this.angle-PI/2), this.pos3.y + 30*sin(this.angle-PI/2))
		this.pos2 = createVector(this.pos3.x + 30*cos(this.angle+PI/2), this.pos3.y + 30*sin(this.angle+PI/2))
		if(game.area.trail.length == 0 || abs(game.area.trail[game.area.trail.length-1].pos3.dist(this.pos3)) > game.limitResTrail){
			game.area.trail.push(new Trail(this.pos1, this.pos2, this.pos3, this.angle))
		}
		this.acc = 0

	}
}

Trail = function(pos1, pos2, pos3, angle) {
	this.angle = angle
	this.pos1 = pos1
	this.pos2 = pos2
	this.pos3 = pos3
	this.t = millis()
	this.snowDepth = 0
}
