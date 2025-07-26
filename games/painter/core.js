var game = function() {
	game.ctx = document.getElementById("cvs").getContext("2d");
	game.canvas = document.getElementById("cvs");
	
	game.fpsTime = Date.now();
	game.ship = {x:250, y:300, dx:0, dy:0, alpha:0, a:0.25, drag:0.985}
	game.keys = {u:false, r:false, l:false}
	game.bullets = [];
	game.asteroids = [];
	$(document).keydown(function (e){
		if(e.keyCode == 37 || e.keyCode == 65){				//left
			game.keys.l = true
			e.preventDefault();
		}else if(e.keyCode == 38 || e.keyCode == 87){		//up
			game.keys.u = true
			e.preventDefault();
		}else if(e.keyCode == 39 || e.keyCode == 68){		//right
			game.keys.r = true
			e.preventDefault();
		}else if(e.keyCode == 32){							//shoot
			game.shoot();
			e.preventDefault();
		}
	});
	$(document).keyup(function (e){
		if(e.keyCode == 37 || e.keyCode == 65){				//left
			game.keys.l = false
			e.preventDefault();
		}else if(e.keyCode == 38 || e.keyCode == 87){		//up
			game.keys.u = false
			e.preventDefault();
		}else if(e.keyCode == 39 || e.keyCode == 68){		//right
			game.keys.r = false
			e.preventDefault();
		}
	});
	
	game.start = function() {
		game.draw();
	}
	
	game.shoot = function() {
		game.bullets.push(new Bullet(game.ship.x + Math.cos(game.ship.alpha) * 20, game.ship.y + Math.sin(game.ship.alpha) * 20, game.ship.alpha))
	}
	
	game.draw = function() {
		//SHIP MOVE
		if(game.keys.r) {
			game.ship.alpha += 5 * Math.PI / 180;
		}
		if(game.keys.l) {
			game.ship.alpha -= 5 * Math.PI / 180;
		}
		if(game.keys.u) {
			game.ship.dx += Math.cos(game.ship.alpha) * game.ship.a
			game.ship.dy += Math.sin(game.ship.alpha) * game.ship.a
		}
		
		game.ship.x += game.ship.dx;
		game.ship.y += game.ship.dy;
		game.ship.dx *= game.ship.drag;
		game.ship.dy *= game.ship.drag;
		if(game.ship.x > game.ctx.canvas.width) {
			game.ship.x = 0;
		}
		if(game.ship.x < 0) {
			game.ship.x = game.ctx.canvas.width;
		}
		if(game.ship.y > game.ctx.canvas.height) {
			game.ship.y = 0;
		}
		if(game.ship.y < 0) {
			game.ship.y = game.ctx.canvas.height;
		}
		
		game.ctx.fillStyle = "black";
		game.ctx.fillRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
		
		game.ctx.save();
		game.ctx.translate(game.ship.x, game.ship.y);
		game.ctx.rotate(game.ship.alpha);
		if(game.keys.u) {
			game.ctx.strokeStyle = "orange";
			game.ctx.fillStyle = "orange";
			game.ctx.beginPath();
			game.ctx.moveTo(-5, -5);
			game.ctx.lineTo(-15, 0);
			game.ctx.lineTo(-5, 5);
			game.ctx.closePath();
			game.ctx.fill();
			game.ctx.stroke();
		}
		game.ctx.strokeStyle = "white";
		game.ctx.lineWidth = 2;
		game.ctx.beginPath();
		game.ctx.moveTo(-5, -10);
		game.ctx.lineTo(-5,10);
		game.ctx.lineTo(20,0);
		game.ctx.lineTo(-5, -10);
		game.ctx.closePath();
		game.ctx.stroke();
		
		
		
		game.ctx.restore();
		
		
		for(var i = 0; i < game.bullets.length; i++) {
			game.bullets[i].move();
			if(game.bullets[i].state) {
				game.bullets[i].draw();		
			}else {
				game.bullets.splice(i, 1);
				if(game.bullets.length > 0) {
					i--;
				};
			};
		};
		for(var i = 0; i < game.asteroids.length; i++) {
			game.asteroids[i].move();
			if(game.asteroids[i].state) {
				game.asteroids[i].draw();		
			}else {
				game.asteroids.splice(i, 1);
				if(game.asteroids.length > 0) {
					i--;
				};
			};
		};
		
		
		game.frameR = window.requestAnimationFrame(game.draw);
	}
	
}

Bullet = function(x, y, alpha) {
	this.x = x;
	this.y = y;
	this.r = 2;
	this.s = 10;
	this.state = true;
	this.a = alpha;
	this.draw = function() {
		game.ctx.strokeStyle = "white";
		game.ctx.lineWidth = 1;
		game.ctx.beginPath();
		game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		game.ctx.stroke();
	}
	this.move = function() {
		this.x += this.s * Math.cos(this.a);
		this.y += this.s * Math.sin(this.a);
		if(this.x > game.ctx.canvas.width + 50 || this.x < -50 || this.y > game.ctx.canvas.height + 50 || this.y < -50) {
			this.state = false;
		}
		
	}
}

Asteroid = function(tier = Math.floor(Math.random() * 4) + 1, x = Math.floor(Math.random() * game.ctx.canvas.width), y = Math.floor(Math.random() * game.ctx.canvas.height)) {
	this.x = x;
	this.y = y;
	this.t = tier;
	this.r = this.t * 15
	this.s = Math.floor(Math.random() * 4) + 2
	this.direction = Math.floor(Math.random() * 360) + 1;
	this.rotation = 0
	this.rotationRadian = randInt(-3, 3) * Math.PI/180
	this.random = randInt(20, 40)
	this.seed = [];
	for(var i = 0; i < this.random; i++) {
		this.seed.push(randInt(this.r * 0.8, this.r * 1.1))
	}
	
	
	this.state = true
	this.move = function() {
		this.x += this.s * Math.cos(this.direction * Math.PI / 180);
		this.y += this.s * Math.sin(this.direction * Math.PI / 180);
		this.rotation += this.rotationRadian;
		if(this.x < -50) {
			this.x = game.ctx.canvas.width + 50;
		}else if(this.x > game.ctx.canvas.width + 50) {
			this.x = -50
		}
		if(this.y < -50) {
			this.y = game.ctx.canvas.height + 50;
		}else if(this.y > game.ctx.canvas.height + 50) {
			this.y = -50
		}
		for(var i = 0; i < game.bullets.length; i++) {
			if(Math.sqrt(Math.pow(game.bullets[i].x - this.x, 2) + Math.pow(game.bullets[i].y - this.y, 2)) < this.r && game.bullets[i].state) {
				game.bullets[i].state = false;
				this.destroy();
			}
		}
	}
	
	this.draw = function() {
		game.ctx.strokeStyle = "white";
		game.ctx.lineWidth = 1;
		
		game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
		game.ctx.save()
		game.ctx.translate(this.x, this.y);
		game.ctx.rotate(this.rotation);
		game.ctx.beginPath();
		game.ctx.moveTo(this.seed[0], 0)
		for(var i = 1; i < this.random; i++) {
			game.ctx.lineTo(Math.cos(i * 2 * Math.PI / this.random) * this.seed[i], Math.sin(i * 2 * Math.PI / this.random) * this.seed[i])
		}
		game.ctx.closePath();
		game.ctx.stroke();
		game.ctx.restore();
		
		
		
		
	}
	
	this.destroy = function() {
		this.state = false;
		if(this.t > 1) {
			game.asteroids.push(new Asteroid(this.t - 1, this.x, this.y))		
			game.asteroids.push(new Asteroid(this.t - 1, this.x, this.y))		
		}
	}
	
}
function randInt(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

game();

game.start();