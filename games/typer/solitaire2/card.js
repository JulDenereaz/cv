function Card(suit, id) {
	this.vel = createVector();
	this.acc = createVector();
	this.pos = createVector(padding.x + dim.x / 2, padding.y + dim.y / 2);
	this.flip = true;
	this.suit = suit;
	this.id = id;
	this.oldPos = createVector();
	this.oldIndex = null;
	this.selected = false;
	this.behind = false;
	this.img = imgs[ids[this.id] + suits[this.suit]];

	this.mouseP = createVector();	
		
	this.show = function() {
		if(this.suit !== null) {
			if(this.flip) {
				push();
				fill(255);
				stroke(0)
				translate(this.pos.x, this.pos.y);
				rect(- dim.x / 2, - dim.y / 2, dim.x, dim.y, 10);
				fill(0, 0, 128);
				rect(- dim.x / 2 + padding.x / 4, - dim.y / 2 + padding.y / 4, dim.x - padding.x / 2, dim.y - padding.y / 2, 10);

				pop();
			}else{
				image(this.img, this.pos.x - dim.x / 2, this.pos.y - dim.y / 2, dim.x, dim.y)
			}
		}else{
			push();
			noStroke();
			fill(255, 0, 0);
			translate(this.pos.x, this.pos.y);
			rotate(PI / 4)
			rect(-30, -4, 60, 8, 5);
			rotate(PI / 2)
			rect(-30, -4, 60, 8, 5);
			pop();
		}
	}
	
	this.update = function() {
		if(won) {
			this.applyForce(createVector(0, this.gravity));
			this.vel.add(this.acc);
			this.pos.add(this.vel);
			this.acc.mult(0);
			
			if(this.pos.y + dim.y / 2 > height - 20) {
				this.pos.y = height - dim.y / 2 - 20
				this.vel.y *= -0.8;
			}
		}
		if(this.selected) {
			this.pos.add(p5.Vector.sub(createVector(mouseX, mouseY), this.mouseP))
			this.mouseP = createVector(mouseX, mouseY);
		}
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	}
	
	this.mouseInside = function() {
		if(!this.behind) {
			if(collidePointRect(mouseX, mouseY, this.pos.x - dim.x / 2, this.pos.y - dim.y / 2, dim.x, dim.y)) {
				return(true);
			}
		}else {
			if(collidePointRect(mouseX, mouseY, this.pos.x - dim.x / 2, this.pos.y - dim.y / 2, dim.x, padding.y)) {
				return(true);
			}
		}
	}
}