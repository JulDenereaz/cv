Ennemy = function(type) {
	this.state = true;
	this.attacking = false;
	this.pos = {x:getRandom(1600, 1800), y:getRandom(550, 650)}
	this.life = 100;
	this.maxLife = 100;
	this.speed = getRandom(15, 25)/10;
	this.armor = 10;
	this.typeOfUnit = type
	this.scale = 1;
	this.height = 50;
	this.r = 5;
	switch(this.typeOfUnit) {
		case "Soldier" :
			this.power = 1;
			this.armAngle = 1.2 *Math.PI;
			this.damage = 1;
			this.reward = 2;
			this.handPos = function() {
				return {x:this.pos.x + 15 * Math.cos(this.armAngle), y:this.pos.y + 15 + 15 * Math.sin(this.armAngle)}
			}
			this.swordAngle = (this.armAngle + Math.PI / 6);
			this.attackSpeed = 1000;
			this.range = getRandom(20, 40);
			this.type = "melee";
			this.drawSpec = function() {
				game.ctx.save();
				game.ctx.strokeStyle = "black";
				game.ctx.translate(this.pos.x, this.pos.y + 15);
				game.ctx.rotate(this.armAngle);
				game.ctx.lineWidth = 4;
				game.ctx.beginPath();
				game.ctx.moveTo(0, 0)
				game.ctx.lineTo(15, 0);
				game.ctx.stroke();
				game.ctx.restore();
				
				game.ctx.save();
				game.ctx.strokeStyle = "black";
				game.ctx.translate(this.handPos().x, this.handPos().y);
				game.ctx.rotate(this.swordAngle);
				game.ctx.lineWidth = 1;
				game.ctx.beginPath();
				game.ctx.lineTo(35, 0);
				game.ctx.lineTo(30, -2);
				game.ctx.lineTo(5, -2);
				game.ctx.lineTo(5, -6);
				game.ctx.lineTo(5, 6);
				game.ctx.lineTo(5, 2);
				game.ctx.lineTo(30, 2);
				game.ctx.lineTo(35, 0);
				game.ctx.lineTo(5, 0);
				game.ctx.stroke();
				game.ctx.lineWidth = 5;
				game.ctx.beginPath();
				game.ctx.moveTo(5, 0);
				game.ctx.lineTo(-10, 0);
				
				game.ctx.stroke();

				
				game.ctx.restore();
			}
			break;
		case "Archer" :
			this.power = 5;
			this.damage = 5;
			this.life = 50;
			this.reward = 3;
			this.maxLife = 50;
			this.angle = 30 //modify 30 in a variable relative to current WAVE
			this.attackSpeed = 2000;
			this.range = getRandom(320, 380);
			// console.log(Math.pow(this.power, 2) * Math.sin(2 * this.angle * Math.PI / 180) / game.physics.gravity)
			this.type = "ranged";
			this.drawSpec = function() {
				game.ctx.save();
				game.ctx.strokeStyle = "brown"
				game.ctx.translate(this.pos.x - 5, this.pos.y + 10);
				game.ctx.rotate(this.angle * Math.PI / 180)
				game.ctx.lineWidth = 3;
				game.ctx.beginPath();
				game.ctx.arc(0, 0, 20, 0.5 * Math.PI, 1.5 * Math.PI)
				game.ctx.stroke();
				game.ctx.lineWidth = 1;
				game.ctx.beginPath();
				game.ctx.moveTo(0, -20);
				game.ctx.lineTo(0, 20);
				game.ctx.stroke()
				game.ctx.restore();
			}
			break;
		case "Giant":
			this.scale = 3;
			this.damage = 5
			this.power = 10;
			this.reward = 5;
			this.height *= this.scale;
			this.attackSpeed = 3500;
			this.speed = getRandom(5, 10)/10
			this.range = getRandom(40, 60);
			this.pos.y -= 100;
			this.life = 300;
			this.maxLife = 300;
			this.r *= this.scale;
			this.type = "melee";
			this.armAngle = 1.2 *Math.PI;
			this.damage = 8;
			this.handPos = function() {
				return {x:this.pos.x + 15 * this.scale * Math.cos(this.armAngle), y:this.pos.y + 15 * this.scale + 15 * Math.sin(this.armAngle) * this.scale}
			}
			this.swordAngle = (this.armAngle + Math.PI / 6);
			this.drawSpec = function() {
				game.ctx.save();
				game.ctx.strokeStyle = "black";
				game.ctx.translate(this.pos.x, this.pos.y + 15 * this.scale);
				game.ctx.rotate(this.armAngle);
				game.ctx.lineWidth = 4;
				game.ctx.beginPath();
				game.ctx.moveTo(0, 0)
				game.ctx.lineTo(15 * this.scale, 0);
				game.ctx.stroke();
				game.ctx.restore();
				
				game.ctx.save();
				game.ctx.strokeStyle = "black";
				game.ctx.translate(this.handPos().x, this.handPos().y);
				game.ctx.rotate(this.swordAngle);
				game.ctx.lineWidth = 1;
				game.ctx.beginPath();
				game.ctx.lineTo(35 * this.scale, 0);
				game.ctx.lineTo(30 * this.scale, -2 * this.scale);
				game.ctx.lineTo(5 * this.scale, -2 * this.scale);
				game.ctx.lineTo(5 * this.scale, -6 * this.scale);
				game.ctx.lineTo(5 * this.scale, 6 * this.scale);
				game.ctx.lineTo(5 * this.scale, 2 * this.scale);
				game.ctx.lineTo(30 * this.scale, 2 * this.scale);
				game.ctx.lineTo(35 * this.scale, 0);
				game.ctx.lineTo(5 * this.scale, 0);
				game.ctx.stroke();
				game.ctx.lineWidth = 5;
				game.ctx.beginPath();
				game.ctx.moveTo(5 * this.scale, 0);
				game.ctx.lineTo(-10 * this.scale, 0);
				
				game.ctx.stroke();

				
				game.ctx.restore();
			}
	}
	this.strength = this.attackSpeed * this.damage
	this.draw = function() {
		if(this.state) {
			game.ctx.strokeStyle = "black";
			game.ctx.fillStyle = "black";
			game.ctx.lineWidth = 4;
			game.ctx.beginPath();
			game.ctx.moveTo(this.pos.x, this.pos.y + this.r)
			game.ctx.lineTo(this.pos.x, this.pos.y + this.r)
			game.ctx.lineTo(this.pos.x, this.pos.y + this.height)
			game.ctx.stroke();
			game.ctx.beginPath();
			game.ctx.arc(this.pos.x, this.pos.y, this.r, 2 * Math.PI, false)
			game.ctx.stroke();
			game.ctx.closePath()
			game.ctx.textAlign = "center";
			game.ctx.font = "bold 10px Arial";
			game.ctx.fillText(this.typeOfUnit, this.pos.x, this.pos.y - 5 - 20 * this.scale)
			game.ctx.fillRect(this.pos.x - 15, this.pos.y - 20 * this.scale, 30, 6)
			game.ctx.fillStyle = "red";
			game.ctx.fillRect(this.pos.x - 14, this.pos.y + 1 - 20 * this.scale, 28*this.life/this.maxLife, 4)
			
			// HITBOX SHOW IN CASE OF DEBUG
			// game.ctx.strokeStyle = "red";
			// game.ctx.lineWidth = 1;
			// game.ctx.beginPath();
			// game.ctx.rect(this.hitBox.x1, this.hitBox.y1, this.hitBox.x2 - this.hitBox.x1, this.hitBox.y2 - this.hitBox.y1)
			// game.ctx.stroke();
			
			this.drawSpec();
		}
	}

	this.hitBox = {x1: this.pos.x - this.r, x2: this.pos.x + this.r, y1: this.pos.y - this.r, y2: this.pos.y + this.height}
	this.move = function() { //MODIFIY WITH SWITCH AND CASE FOR EACH TYPE OF ENNEMY
		if(this.pos.x > game.castle.wall + this.range) {
			this.pos.x -= this.speed;					
		}else {
			this.attack()
		}
		this.hitBox = {x1: this.pos.x - this.r, x2: this.pos.x + this.r, y1: this.pos.y - this.r, y2: this.pos.y + this.height}
		for(var i = 0; i < game.projectiles.length; i++) {
			if(game.projectiles[i].isPlayer && game.projectiles[i].state && game.projectiles[i].moving && isPointInside(game.projectiles[i].posSpike, this.hitBox)) {
				this.life -= game.projectiles[i].damage;
				game.projectiles[i].state = false;
			}
		};
		if(this.life <= 0) {
			game.gold += (1 + this.reward) * game.wave.current
			this.state = false;
		}
	}
	this.attack = function() {
		if(this.state && !this.attacking){
			switch(this.type) {
				case "melee" :
					var that = this
					for(var t = 0; t < that.attackSpeed / 2; t++) {
						setTimeout(function(){
							that.armAngle -= (Math.PI/5) / (that.attackSpeed/2)
							that.swordAngle = (that.armAngle + Math.PI / 6);
							setTimeout(function(){
								that.armAngle += (Math.PI/5) / (that.attackSpeed/2)
								that.swordAngle = (that.armAngle + Math.PI / 6);
							}, t);
						}, t);
					}
					setTimeout(function(){
						game.castle.life -= that.damage;
					}, that.attackSpeed / 2);
					
					
					break;
				case "ranged" :
					game.projectiles.push(new Projectile("Arrow", {x:this.pos.x - 5, y:this.pos.y + 10}, this.angle + 180, this.power, this.damage, false));
					break;
			}
			this.attacking = true;
			var that = this;
			setTimeout(function(){
				that.attacking = false;
			}, that.attackSpeed);
		}
	};
}


Defender = function(type) {
	this.state = true;
	this.attacking = false;
	this.type = type;
	this.height = 50;
	switch(this.type) {
		case "Archer":
			this.attackSpeed = 600 * game.upgrades[this.type].attackSpeed
			this.pos = {x:getRandom(230, 270), y:550 - game.units[this.type].length * 5};
			this.precision = 10 - game.upgrades[this.type].precision; 
			this.power = 5 + game.upgrades[this.type].power;
			break;
		case "Mage":
			this.attackSpeed = 1000 * game.upgrades[this.type].attackSpeed
			this.pos = {x:getRandom(80, 170), y:500 + game.units[this.type].length * 5};
			break;
	}
	this.draw = function() {
		game.ctx.strokeStyle = "black";
		game.ctx.lineWidth = 4;
		game.ctx.beginPath();
		game.ctx.moveTo(this.pos.x, this.pos.y + 5)
		game.ctx.lineTo(this.pos.x, this.pos.y + this.height)
		game.ctx.stroke();
		game.ctx.closePath();
		game.ctx.beginPath();
		game.ctx.arc(this.pos.x, this.pos.y, 5, 2 * Math.PI, false)
		game.ctx.stroke();
		
		switch(this.type) {
			case "Archer":
				game.ctx.save();
				game.ctx.strokeStyle = "brown"
				game.ctx.translate(this.pos.x + 5, this.pos.y + 10);
				game.ctx.rotate(game.archerAngle * Math.PI / 180)
				game.ctx.lineWidth = 3;
				game.ctx.beginPath();
				game.ctx.arc(0, 0, 20, 1.5 * Math.PI, 0.5 * Math.PI)
				game.ctx.stroke();
				
				game.ctx.lineWidth = 1;
				game.ctx.beginPath();
				game.ctx.moveTo(0, -20);
				game.ctx.lineTo(0, 20);
				game.ctx.stroke()
				
				game.ctx.restore();
				break;
			case "Mage":
				game.ctx.lineWidth = 3;
				game.ctx.strokeStyle = "brown";
				game.ctx.beginPath();
				game.ctx.moveTo(this.pos.x + 5, this.pos.y + this.height);
				game.ctx.lineTo(this.pos.x + 20, this.pos.y)
				game.ctx.stroke();
				game.ctx.fillStyle = "blue"
				game.ctx.beginPath();
				game.ctx.arc(this.pos.x + 20, this.pos.y, 3, Math.PI * 2, false);
				game.ctx.fill();
				
				game.ctx.lineWidth = 4;
				game.ctx.beginPath();
				game.ctx.moveTo(this.pos.x + 16, this.pos.y + 18);
				game.ctx.lineTo(this.pos.x, this.pos.y + 12)
				game.ctx.stroke();
				
				game.ctx.lineWidth = 3;
				game.ctx.strokeStyle = "black";
				game.ctx.fillStyle = "black";
				game.ctx.beginPath();
				game.ctx.moveTo(this.pos.x - 15, this.pos.y + 3);
				game.ctx.lineTo(this.pos.x + 10, this.pos.y - 3);
				game.ctx.lineTo(this.pos.x + 7, this.pos.y - 5);
				game.ctx.lineTo(this.pos.x - 4, this.pos.y - 25);
				game.ctx.lineTo(this.pos.x - 10, this.pos.y - 30);
				game.ctx.lineTo(this.pos.x - 8, this.pos.y - 20);
				game.ctx.lineTo(this.pos.x - 7, this.pos.y - 5);
				game.ctx.lineTo(this.pos.x - 15, this.pos.y + 3);
				game.ctx.stroke();
				game.ctx.fill();
				game.ctx.lineWidth = 6;
				game.ctx.strokeStyle = "darkblue";
				for(var i = 0; i < 6; i++) {
					game.ctx.beginPath();
					game.ctx.moveTo(this.x, this.y);
					game.ctx.lineTo(this.x1[i], this.y1[i]);
					game.ctx.stroke();
					game.ctx.moveTo(this.x1[i], this.y1[i]);		
					game.ctx.lineTo(this.x2[i], this.y2[i]);
					game.ctx.stroke();
					game.ctx.moveTo(this.x2[i], this.y2[i]);		
					game.ctx.lineTo(this.x3[i], this.y3[i]);
					game.ctx.closePath();
					game.ctx.stroke();
				}
				game.ctx.lineWidth = 1;
				game.ctx.strokeStyle = "white";
				for(var i = 0; i < 6; i++) {
					game.ctx.beginPath();
					game.ctx.moveTo(this.x, this.y);
					game.ctx.lineTo(this.x1[i], this.y1[i]);
					game.ctx.stroke();
					game.ctx.moveTo(this.x1[i], this.y1[i]);		
					game.ctx.lineTo(this.x2[i], this.y2[i]);
					game.ctx.stroke();
					game.ctx.moveTo(this.x2[i], this.y2[i]);		
					game.ctx.lineTo(this.x3[i], this.y3[i]);
					game.ctx.closePath();
					game.ctx.stroke();
				}
				break;
		}
		
	}
	
	this.attack = function() { //ATTACK ONLY IF ENNEMIES IN RANGE
 		if(this.state && !this.attacking){
			switch(this.type) {
				case "Archer":
					game.projectiles.push(new Projectile(game.upgrades[this.type].projectile, {x:this.pos.x + 5, y:this.pos.y + 10}, getDeviation(game.archerAngle, this.precision), this.power, game.upgrades[this.type].damage, true))
					break;
				case "Mage":
					this.x = getRandom(630, 680);
					this.y = getRandom(575, 725);
					this.x1 = [];
					this.y1 = [];
					this.x2 = [];
					this.y2 = [];
					this.x3 = [];
					this.y3 = [];
					for(var i = 0; i < 6; i++) {
						this.y1[i] = getRandom(this.y - 30, this.y + 30)
						this.x1[i] = getRandom(this.x - 30, this.x + 30)
						this.x2[i] = getRandom(this.x1[i] - 30, this.x1[i] + 30)
						this.y2[i] = getRandom(this.y1[i] - 30, this.y1[i] + 30)			
						this.x3[i] = getRandom(this.x2[i] - 30, this.x2[i] + 30)
						this.y3[i] = getRandom(this.y2[i] - 30, this.y2[i] + 30)			
					}
					that = this;
					game.ennemies.forEach(function(ennemy){
						if(ennemy.pos.x > 600 && ennemy.pos.x < 600 + game.upgrades[that.type].splash ) {
							ennemy.life -= game.upgrades[that.type].damage;
						}
					});
				
			}
			this.attacking = true;
			var that = this;
			setTimeout(function(){
				that.attacking = false;
			}, that.attackSpeed);
		}
	}
}



Projectile = function(type, pos, angle, power, damage, isPlayer) {
	this.type = type;
	this.pos = pos;
	this.isPlayer = isPlayer;
	this.finalPos = getRandom(700, 750);
	this.power = power;
	this.damage = damage;
	this.state = true;
	this.moving = true;
	this.angle = angle * Math.PI/180
	this.posSpike = {x:this.pos.x * Math.cos(this.angle) * 30, y:this.pos.y * Math.sin(this.angle) * 30}
	this.dx = Math.cos(this.angle) * power
	this.dy = Math.sin(this.angle) * power;
	this.draw = function() {
		game.ctx.strokeStyle = "black";
		game.ctx.fillStyle = "black";
		game.ctx.lineWidth = 2;
		game.ctx.save();
		game.ctx.translate(this.pos.x, this.pos.y);
		game.ctx.rotate(this.angle);
		game.ctx.fillRect(0, -2, 4, 4);
		game.ctx.beginPath()
		game.ctx.moveTo(30, 0);
		game.ctx.lineTo(25, -4);
		game.ctx.lineTo(25, 4);
		game.ctx.lineTo(30, 0);
		game.ctx.closePath();
		game.ctx.fill();
		
		game.ctx.beginPath();
		game.ctx.moveTo(0, 0);
		game.ctx.lineTo(30, 0);
		game.ctx.closePath();
		game.ctx.stroke();
		
		game.ctx.restore()
		
		
	}
	this.move = function() {
		if(this.moving) {
			this.pos.x = this.dx + this.pos.x
			this.pos.y = this.dy + this.pos.y
			this.dy += 0.5*game.physics.gravity
			this.dx *= game.physics.drag
			this.angle = Math.atan2(this.dy, this.dx)
			this.posSpike = {x:this.pos.x + Math.cos(this.angle) * 30, y:this.pos.y + Math.sin(this.angle) * 30}
			if(this.isPlayer && this.pos.y > this.finalPos) {
				this.moving = false;
				this.time = Date.now();
				
			}
			if(!isPlayer && this.pos.x < game.castle.wall) {
				this.moving = false;
				this.state = false;
				game.castle.life -= this.damage; //ADD ARMOR PROTECTION OF CASTLE
			}
			
		}
		if(!this.moving && Date.now() - this.time > 3000) {
			this.state = false;
		}
	}
}






Button = function(x, y, text, textHover = "") {
	this.y = y;
	this.id = text;
	this.height = 50;
	this.width = this.id.length * 20;
	this.x = x - this.width / 2;
	this.state = true;
	this.hover = false;
	this.draw = function() {
		game.ctx.font = "bold 30px Arial";
		game.ctx.fillStyle = "lightblue";
		game.ctx.fillRect(this.x, this.y, this.width, this.height);
		game.ctx.strokeStyle = "blue";
		game.ctx.lineWidth = 2;
		game.ctx.strokeRect(this.x, this.y, this.width, this.height)
		game.ctx.textAlign = "center";
		game.ctx.fillStyle = "black";
		game.ctx.fillText(this.id, this.x + this.width / 2, this.y + this.height/2 + 10)
		if(this.hover && textHover.length > 0) {
			game.hover = textHover;
		}else {
			game.hover = "";
		}

	}
	this.cursorIn = function() {
		if(this.state) {
			return isPointInside(game.mousePos, {x1:this.x, x2:this.x + this.width, y1:this.y, y2:this.y + this.height})
		}else {
			return false 
		}
	}
}

ButtonBuyUnit = function(x, y, unit) {
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
	this.id = unit;
	this.hover = false
	this.state = true
	this.img = new Image();
	this.img.src = game.buttonUnits[this.id];
	this.draw = function() {
		game.ctx.fillStyle = "lightblue";
		game.ctx.fillRect(this.x, this.y, this.width, this.height);
		game.ctx.strokeStyle = "blue";
		game.ctx.lineWidth = 2;
		game.ctx.strokeRect(this.x, this.y, this.width, this.height)
		game.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		if(this.hover) {
			game.hover = "Buy " + this.id + " : " + format(game.upgrades[this.id].price) + " $"
			if(game.gold < game.upgrades[this.id].price) {
				game.hoverColor = "red";				
			}
		}
	}
	this.cursorIn = function() {
		if(this.state) {
			return isPointInside(game.mousePos, {x1:this.x, x2:this.x + this.width, y1:this.y, y2:this.y + this.height})
		}else {
			return false 
		}
	}
}