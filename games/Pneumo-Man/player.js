Pacman = function(x, y) {
	this.pos = createVector(x, y);
	this.curDir = createVector(-1, 0);
	this.speed = game.baseSpeed;
	this.targetCell = undefined;
	this.chomping = true;
	this.walkAnim = 0;
	this.newDir = true;
	this.state = false;
	this.tunnel = false;
	this.stop = 0;
	this.pacmanSpeed = {
		norm:[0.8, 0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.9],
		fright:[0.9, 0.95, 0.95, 0.95, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
	},
	this.show = function(x, y, bool) {
		if(game.human) {
			if(bool) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, 0, 7 * 40, 40, 40)
			}else if(this.curDir.x == 1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 10 * 40, 40, 40)
			}else if(this.curDir.x == -1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 9 * 40, 40, 40)
			}else if(this.curDir.y == 1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 7 * 40, 40, 40)
			}else if(this.curDir.y == -1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 8 * 40, 40, 40)
			}
		}else {
			if(bool) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, 0, 0, 40, 40)
			}else if(this.curDir.x == 1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 0 * 40, 40, 40)
			}else if(this.curDir.x == -1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 2 * 40, 40, 40)
			}else if(this.curDir.y == 1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 3 * 40, 40, 40)
			}else if(this.curDir.y == -1) {
				image(game.sprites, x- game.tS, y-game.tS, 40, 40, this.walkAnim * 40, 1 * 40, 40, 40)
			}
		}

	}
	this.getCellX = function() {
		x = Math.floor(this.pos.x / game.tS - 1)
		return(x)
	}
	this.eat = function() {
		center = createVector(centerX(this.currentCell.x), centerY(this.currentCell.y))
		if(center.dist(this.pos) < game.tS2) {
			if(this.cellValue(this.currentCell) == 2) {
				this.stop = 1;
				game.eaten += 1;
				game.pelletsRemaining --;
				game.score += 10;
				game.map[this.currentCell.y][this.currentCell.x] = 1
				checkExit()
			}else if(this.cellValue(this.currentCell) == 3) {
				this.stop = 3;
				game.eaten += 1;
				game.score += 50;
				game.ais.forEach(function(ai) {
					if(!ai.frightened && !ai.eaten && !ai.reseting) {
						ai.reverse = true;
					}
					if(!ai.eaten && !ai.reseting) {
						ai.frightened = true
						ai.timerF = millis() + game.frightenedTime[game.level]
					}
				});
				game.map[this.currentCell.y][this.currentCell.x] = 1
				game.timeLeft += game.frightenedTime[game.level]
			}
		}
	}
	this.getCellY = function() {
		y = Math.floor(this.pos.y / game.tS - 3)
		return(y)
	}
	this.cellValue = function(vector) {
		return(game.map[vector.y][vector.x])
	}
	this.getSpeed = function() {
		perc = this.pacmanSpeed.norm[game.level];
		bool = false
		game.ais.forEach(function(ai) {
			if(ai.frightened) {
				bool = true
			}
		})
		if(bool) {
			perc = this.pacmanSpeed.fright[game.level];

		}
		if(this.eaten || this.reseting) {
			perc = 10
		}
		return(perc * game.baseSpeed)
	}
	this.continue = function() {
		if(this.newDir) {
			this.targetCell = this.currentCell.copy().add(this.curDir)
			while(this.cellValue(this.targetCell)) {
				this.targetCell = this.targetCell.copy().add(this.curDir)
			}
			this.targetCell = this.targetCell.copy().sub(this.curDir)
			this.newDir = false
		}
		this.speed = this.getSpeed();
		this.nextPos = this.pos.copy().add(this.curDir.copy().mult(this.speed));
		//x
		if(this.curDir.x * (this.nextPos.x - centerX(this.targetCell.x)) < 0) {
			this.pos.add(this.curDir.copy().mult(this.speed))
			if(this.tunnel && this.cellValue(this.currentCell) == 4 && this.curDir.x < 0 && 560 < this.nextPos.x && this.nextPos.x < 590) {
				this.tunnel = false
				this.newDir = true
			}else if(this.tunnel && this.cellValue(this.currentCell) == 4 && this.curDir.x > 0 && 10 < this.nextPos.x && this.nextPos.x < 40){
				this.tunnel = false
				this.newDir = true
			}
		}else if(this.cellValue(this.targetCell) == 4) {
			this.tunnel = true
			if(this.curDir.x > 0 && this.nextPos.x > 600){
				this.pos.x = 0
			}else if(this.curDir.x < 0 && this.nextPos.x < 0) {
				this.pos.x = 600
			}else {
				this.pos.add(this.curDir.copy().mult(this.speed))
			}
		}else if(this.curDir.x && !this.tunnel){
			this.pos.x = centerX(this.targetCell.x)
		}
		//y
		if(this.curDir.y * (this.nextPos.y - centerY(this.targetCell.y)) < 0) {
			this.pos.add(this.curDir.copy().mult(this.speed))
		}else if(this.curDir.y) {
			this.pos.y = centerY(this.targetCell.y)
		}
	}
	this.move = function() {
		if(this.stop) {
			this.stop --
		}else {
			if(this.chomping && frameCount % 4 == 0) {
				this.walkAnim ++
				if(this.walkAnim > 3) {
					this.walkAnim = 0
				}
			}
			this.currentCell = createVector(this.getCellX(), this.getCellY())
			if(!this.curDir.x && !this.curDir.y) {
				this.curDir = game.nextKey.copy()
			}else {
				if(this.curDir.equals(game.nextKey)) {
					this.continue()
				}else {
					this.nextCell = this.currentCell.copy().add(game.nextKey)
					//nextCell based on new direction, is not a wall
					if(game.map[this.nextCell.y][this.nextCell.x]) {
						//opposite direction
						if(this.curDir.x && game.nextKey.x) {
							this.curDir = game.nextKey.copy()
							this.newDir = true
						}else if(this.curDir.y && game.nextKey.y) {
							this.curDir = game.nextKey.copy()
							this.newDir = true
							//change direction from x to y or y to x
						}else {
							this.nextPos = this.pos.copy().add(this.curDir.copy().mult(this.getSpeed()));
							if(this.curDir.x * (this.nextPos.x - centerX(this.currentCell.x)) < 0) {
								this.pos = this.nextPos.copy()
							}else if((this.curDir.x < 0 && this.pos.x - centerX(this.currentCell.x) >= 0) || (this.curDir.x > 0 && this.pos.x - centerX(this.currentCell.x) <= 0)) {
								this.pos.x = centerX(this.currentCell.x)
								this.curDir = game.nextKey.copy()
								this.newDir = true
							}else if(this.curDir.y * (this.nextPos.y - centerY(this.currentCell.y)) < 0) {
								this.pos = this.nextPos.copy()
							}else if((this.curDir.y < 0 && this.pos.y - centerY(this.currentCell.y) >= 0) || (this.curDir.y > 0 && this.pos.y - centerY(this.currentCell.y) <= 0)){
								this.pos.y = centerY(this.currentCell.y)
								this.curDir = game.nextKey.copy()
								this.newDir = true
							}else {
								this.continue()
							}
						}
					}else{
						this.continue()
					}
				}
			}
			this.eat()
		}
	}
}
