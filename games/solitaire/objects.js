Card = function(id, suit) {
	this.id = id
	this.suit = suit
	this.flipped = false
	this.pos = createVector(0, 0)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.target = createVector(0, 0)
	this.show = function() {
		push()
		translate(this.pos.x, this.pos.y)
		this.drawSide()
		pop()

	}
	this.update = function(s, n, offX, c = 0) {
		switch (s) {
			case 'deck':
				this.pos.set(game.padding.x + game.padding.x * offX + Math.floor(n/4) + game.dim.x * offX, game.padding.y + Math.floor(n/4))
				break;
			case 'col':
				if(this.flipped) {
					this.pos.set(game.padding.x + game.padding.x * offX + game.dim.x * offX, game.padding.y * 2 + game.dim.y + game.padding.y*c + game.padding.y*(n-c)*3)
				}else {
					this.pos.set(game.padding.x + game.padding.x * offX + game.dim.x * offX, game.padding.y * 2 + game.dim.y + game.padding.y*n)
				}
				break;
			case 'sorted':
				this.pos.set(game.padding.x + game.dim.x * 3 + game.padding.x * 3 + game.padding.x * offX + Math.floor(n/4) + game.dim.x * offX, game.padding.y + Math.floor(n/4))
				break;
			case 'selected':
				this.pos.add(mouseX-pmouseX, mouseY-pmouseY)
				break;
			case 'endAnim':
				if(this.pos.x > -game.dim.x && this.pos.x < width + game.dim.x) {
					this.applyForce(createVector(0, game.gravity));
					this.vel.add(this.acc);
					this.pos.add(this.vel);
					this.acc.mult(0);

					if(this.pos.y + game.dim.y > height - 20) {
						this.pos.y = height - game.dim.y - 20
						this.vel.y *= -0.8;
					}
				}

				break;
			default:
				break;

		}
	}
	this.applyForce = function(force) {
		this.acc.add(force)
	}
	this.drawSide = function() {
		if(this.flipped) {
			image(game.imgs[game.ids[this.id] + game.suits[this.suit]], 0, 0, game.dim.x, game.dim.y)
		}else {
			fill(65,105,225)
			rect(0, 0, game.dim.x, game.dim.y, 10)
			noFill()
			stroke(0)
			strokeWeight(1)
			rect(0, 0, game.dim.x, game.dim.y, 10)
			fill('grey')
			rect(game.padding.y, game.padding.y, game.dim.x - game.padding.y*2, game.dim.y - game.padding.y*2, 10)
		}
	}
	this.flip = function() {
		this.flipped = !this.flipped
	}

}


Sector = function(type) {
	this.cards = []

	this.update = "fds"

}
