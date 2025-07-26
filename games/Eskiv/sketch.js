var game = {
	best:0
};

function setup() {
	var cont = select('.game');
	var canv = createCanvas(800, 800)
	canv.parent(cont);
	newGame();

}

function newGame() {
	game.player = new Player();
	game.balls = [];
	game.food = new Food();
	game.dir = [1, -1];
	game.balls.push(new Ball);
	if(game.score > game.best) {
		game.best = game.score;
	}
	game.score = 1;
	$('#score').html("Best : " + game.best +  " | Score : " + game.score);
}

function draw() {
	background(70);
	game.player.update();
	for(let ball of game.balls) {
		ball.update();
	}
	for(let ball of game.balls) {
		ball.show();
	}
	
	game.player.show();
	game.food.show();
	
}

	
Player = function() {
	this.pos = createVector(width / 2, height / 2);
	this.d = 30;
	this.speed = 8;
	this.show = function() {
		fill(255);
		ellipseMode(CENTER)
		ellipse(this.pos.x, this.pos.y, this.d);
	}
	
	this.update = function() {
		
		if(keyIsDown(87)) {
			this.pos.add(0, -this.speed);
			if(this.pos.y < this.d / 2) {
				this.pos.y = this.d / 2;
			}
		}
		
		if(keyIsDown(68)) {
			this.pos.add(this.speed, 0);
			if(this.pos.x + this.d / 2 > width) {
				this.pos.x = width - this.d / 2;
			}
		}
		
		if(keyIsDown(83)) {
			this.pos.add(0, this.speed);
			if(this.pos.y + this.d / 2 > height) {
				this.pos.y = height - this.d / 2;
			}
		}
		
		if(keyIsDown(65)) {
			this.pos.add(-this.speed, 0);
			if(this.pos.x < this.d / 2) {
				this.pos.x = this.d / 2;
			}
		}
		for(ball of game.balls) {
			if(collideCircleCircle(this.pos.x, this.pos.y, this.d, ball.pos.x, ball.pos.y, ball.d)) {
				newGame();
			}
		}
		if(collideRectCircle(game.food.pos.x, game.food.pos.y, game.food.size, game.food.size, this.pos.x, this.pos.y, this.d)) {
			game.food = new Food();
			game.balls.push(new Ball());
			game.score ++;
			$('#score').html("Best : " + game.best + " | Score : " + game.score);
		}
	
	}
}

Food = function() {
	this.size = 20;
	this.pos = createVector(getRandom(this.size, width - this.size), getRandom(this.size, height - this.size));
	
	this.show = function() {
		fill(0, 255, 0);
		rect(this.pos.x, this.pos.y, this.size, this.size);
	}
	
	
}

Ball = function() {
	this.d = 16;
	this.speed = 5;
	if(getRandom(0, 1)) {
		this.vel = createVector(game.dir[getRandom(0,1)], 0).setMag(this.speed);
		
	}else {
		this.vel = createVector(0, game.dir[getRandom(0,1)]).setMag(this.speed);
		
	}
	this.pos = createVector(random(this.d, width - this.d), random(this.d, height - this.d));
	this.show = function() {
		fill(255, 0, 0);
		ellipseMode(CENTER)
		ellipse(this.pos.x, this.pos.y, this.d);
	}
	
	this.update = function() {
		this.pos.add(this.vel);
		if(this.pos.y < this.d / 2) {
			this.pos.y = this.d / 2;
			this.vel.mult(-1);
		}
		if(this.pos.x + this.d / 2 > width) {
			this.pos.x = width - this.d / 2;
			this.vel.mult(-1);
		}
		if(this.pos.y + this.d / 2 > height) {
			this.pos.y = height - this.d / 2;
			this.vel.mult(-1);
		}
		if(this.pos.x < this.d / 2) {
			this.pos.x = this.d / 2;
			this.vel.mult(-1);
		}
	}
}

function keyPressed() {
	if(keyCode == 32) {
		newGame();
	}
}


function getRandom(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}