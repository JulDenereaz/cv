/*
|||||||||||||||||||||||||||
OBJECT PLAYER TANK CREATION
|||||||||||||||||||||||||||
*/



Tank = function(){
	if($("#username").val() == ""){
		this.name = "Guest 69"
	}else{
		this.name = $("#username").val()
	}
	this.x = 500;
	this.y = 650;
	this.angle= Math.PI*3/2;
	this.color = "yellow";
	this.ballspeed = 5;
	this.reload= 500;
	this.reloading = false;
	this.canon = 0;
	this.life = 100;
	this.xp = {current:0, nextLevel:10, levelUp:false}
	this.maxlife = 100;
	this.damage = 1;
	this.balls = [];
	this.speed = 15;
	this.state = true;
	this.actions = {u:false, r:false, d:false, l:false, m:false};
	this.level = 0;
	this.regen = 0.008 + 1;
	this.precision = 10;
	this.ismoving = false;
	this.shoot = function(){
		if(this.state && !this.reloading){
			this.balls.push(new Ball(this));
			this.reloading = true;
			var that = this;
			setTimeout(function(){
				that.reloading = false;
			}, that.reload);
		}
	};
	this.move = function(){
		if(this.actions.m){							//MOUSE CLICK
			this.shoot();
		}
		this.tanksav = [this.x, this.y, this.angle]
		if(this.actions.r){							//ARROWS
			if(!this.actions.d){
				this.angle += 0.05 * (1 + this.speed / 1000)
				if(this.angle > 2 * Math.PI){
					this.angle = 0
				}
			}else{
				this.angle -= 0.05 * (1 + this.speed / 1000)
				if(this.angle < 0){
					this.angle = 2 * Math.PI
				}
			}
		}	
		if(this.actions.l){
			if(!this.actions.d){
				this.angle -= 0.05 * (1 + this.speed / 1000)
				if(this.angle < 0){
					this.angle = 2 * Math.PI
				}
			}else{
				this.angle += 0.05 * (1 + this.speed / 1000)
				if(this.angle > 2 * Math.PI){
					this.angle = 0
				}
			}
		}
		if(this.actions.u){		
			this.x += Math.cos(this.angle) * 1.5 * (1 + this.speed / 100);
			this.y += Math.sin(this.angle) * 1.5 * (1 + this.speed / 100);	
		}
		
		if(this.actions.d){
			this.x -= Math.cos(this.angle) * (1 + this.speed / 100);
			this.y -= Math.sin(this.angle) * (1 + this.speed / 100);
		}
		this.edges = this.getEdges();
		if(this.isOutOfBounds() || this.isColliding()){
			this.x = this.tanksav[0]
			this.y = this.tanksav[1]
			this.angle = this.tanksav[2]
		}
		if(this.actions.u ||this.actions.r || this.actions.l){
			this.ismoving = true;
		}else{
			this.ismoving = false;
		}
		this.canon = Math.atan2((game.mousePos.y - this.y), (game.mousePos.x - this.x))
		if(game.mousePos.y <= this.y){
			this.canon += 2 * Math.PI
		}
		this.updateStats();
	}
	this.draw = function(){
		if(this.state){
			
			//Stats
			game.ctx.save();
			game.ctx.font = "bold 15px Arial"
			game.ctx.fillStyle = "black"
			game.ctx.fillText("Max Life :", 800, 900)
			game.ctx.fillText("Regeneration :", 800, 915)
			game.ctx.fillText("Bullet Damage :", 800, 930)
			game.ctx.fillText("Attack Speed :", 800, 945)
			game.ctx.fillText("Bullet Speed :", 800, 960)
			game.ctx.fillText("Precision :", 800, 975)
			game.ctx.fillText("Agility :", 800, 990)
			game.ctx.textAlign="end"; 
			game.ctx.fillText(this.maxlife, 990, 900)
			game.ctx.fillText(Math.round(10000 / 16 * this.regen)/10 + "/sec", 990, 915)
			game.ctx.fillText(this.damage, 990, 930)
			game.ctx.fillText(Math.round(10000 / this.reload)/10 + "/sec", 990, 945)
			game.ctx.fillText(this.ballspeed, 990, 960)
			game.ctx.fillText(100 - this.precision + "%", 990, 975)
			game.ctx.fillText("+ " + this.speed + "%", 990, 990)
			if(this.xp.levelUp) {
				game.ctx.fillText("+", 790, 900)
				game.ctx.fillText("+", 790, 915)
				game.ctx.fillText("+", 790, 930)
				game.ctx.fillText("+", 790, 945)
				game.ctx.fillText("+", 790, 960)
				game.ctx.fillText("+", 790, 975)
				game.ctx.fillText("+", 790, 990)
			}
			game.ctx.restore();
			
			//WHEELS
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.rotate(this.angle);
			game.ctx.fillStyle = "#7f7f7f";
			game.ctx.fillRect(-25,-25, 50, 50)
			game.ctx.fillStyle = "black";
			game.ctx.fillRect(-30,-20, 60, 40)
			game.ctx.shadowColor = 'black';
			game.ctx.shadowBlur = 35;
			
			//COLORED PART
			game.ctx.fillStyle = this.color;
			game.ctx.beginPath();
			game.ctx.moveTo(-25, -15);
			game.ctx.lineTo(10, -15);
			game.ctx.lineTo(30, 0);
			game.ctx.lineTo(10, 15);
			game.ctx.lineTo(-25, 15);
			game.ctx.closePath();
			game.ctx.fill();
			game.ctx.restore();
			
			//CANON
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.rotate(this.canon);
			game.ctx.fillStyle = "black";
			game.ctx.beginPath();
			game.ctx.fillRect(-5,-5, 35, 10)
			game.ctx.arc(0, 0,8,0,2*Math.PI);
			game.ctx.closePath();
			game.ctx.fill();
			game.ctx.restore();
			

		}
	}
	this.updateStats = function(){
		this.life += this.regen;
		if(this.life > this.maxlife){
			this.life = this.maxlife
		}

		if(this.xp.current >= this.xp.nextLevel){
			this.nextLevel();
			
		}
		
		
	}
	this.nextLevel = function(){
		this.level += 1;
		this.xp.nextLevel = this.xp.nextLevel + this.level * 10 
		this.xp.levelUp = true;
		this.xp.current = 0;
	}
	this.getEdges = function(){
		 return({
			a:{
				x: this.x + Math.cos(this.angle-Math.atan2(20,30))*game.hyp,
				y: this.y + Math.sin(this.angle-Math.atan2(20,30))*game.hyp
			},
			b:{
				x: this.x + Math.sin(this.angle-Math.atan2(30,20))*game.hyp,
				y: this.y - Math.cos(this.angle-Math.atan2(30,20))*game.hyp
			},
			c:{
				x: this.x - Math.cos(this.angle-Math.atan2(20,30))*game.hyp,
				y: this.y - Math.sin(this.angle-Math.atan2(20,30))*game.hyp
			},
			d:{
				x: this.x - Math.sin(this.angle-Math.atan2(30,20))*game.hyp,
				y: this.y + Math.cos(this.angle-Math.atan2(30,20))*game.hyp
			},
		});
	}
	this.isColliding = function(){
		for(var i=1;i<game.tanks.length;i++){
			if(game.tanks[i].state) {
				for(j in game.tanks[i].edges){
					if(isPointInside(this.edges[j], game.tanks[i].edges)){
						return(true);
					}
				}
			}
		}
		return(false);
	}
	this.isOutOfBounds = function(){
		if(this.x < 0){
			this.x = 995;
		}else if(this.x > 999){
			this.x = 5;
		}else if(this.y < 0){
			this.y = 995;
		}else if(this.y > 999){
			this.y = 5;
		}
	}

}

/*
||||||||||||||||||||||||
OBJECT IA TANK CREATION
||||||||||||||||||||||||
*/

IATank = function(){
	this.name = "IA";
	this.x = Math.floor((Math.random() * 940) + 60);
	this.y = Math.floor((Math.random() * 940) + 60);
	this.angle = Math.random() * 2 * Math.PI;
	this.state = true
	this.life = (1 + (game.currentlevel)) * 10
	this.maxlife = (1 + (game.currentlevel)) * 10
	this.color = getRandomColor();
	this.ballspeed = 0.5;
	this.flag = {x:0, y:0};
	this.reload = 600;
	this.reloading = false;
	this.canon = 0;
	this.damage = 5;
	this.balls = [];
	this.speed = 1.0;
	this.actions = {u:false, r:false, d:false, l:false, m:false};
	this.ismoving = false;
	this.precision = 8;
	this.newflag = function(){
		this.flag.x = Math.floor((Math.random() * 940) + 60);
		this.flag.y = Math.floor((Math.random() * 940) + 60);
	}
	this.distance2P = function(b){
		var dist = Math.sqrt((this.x - b.x)*(this.x-b.x) + (this.y - b.y)*(this.y - b.y))
        return(dist);
    };
	this.shoot = function(){
		if(this.state && !this.reloading){
			this.balls.push(new Ball(this));
			this.reloading = true;
			var that = this;
			setTimeout(function(){
				that.reloading = false;
			}, that.reload);
		}
	};
	this.move = function(){
		this.canon = getAngle(this, game.tanks[0])
		this.shoot(this);
		if(!this.ismoving){
			this.newflag();
			this.ismoving = true;
			
		}else{
			if(this.actions.d){
				this.x -= Math.cos(this.angle)/2;
				this.y -= Math.sin(this.angle)/2;
					this.angle += ((this.randomBool - 2) / 50);
				if(this.angle > 2 * Math.PI){
					this.angle = 0;
				}
				var bool = false;
				for(var i = 0; i<game.tanks.length; i++){
					if(i != game.tanks.indexOf(this) && this.distance2P(game.tanks[i]) < 80){
						bool = true;
					}
				}
				if(!bool){
					this.newflag();
					this.actions.d = false;
				}
			}else{
				if(!this.isColliding()){
					var tangle = Math.round(this.angle * 10)/10;
					var pangle = Math.round(getAngle(this, this.flag)*10)/10
					if(Math.round(this.x) != this.flag.x && Math.round(this.y) != this.flag.y){
						if(tangle >=  pangle){
							this.angle -= 0.02;
							if(this.angle < 0){
								this.angle = 2 * Math.PI;
							}
						}else{
							this.angle += 0.02;
							if(this.angle > 2 * Math.PI){
								this.angle = 0;
							}
						}
						this.actions.u = true;
					}else{
						this.actions.u = false;
						this.ismoving = false;
					}
					if(this.actions.u){
						this.x += Math.cos(this.angle);
						this.y += Math.sin(this.angle);	
					}
				}else{
					this.randomBool = Math.floor((Math.random() * 3) + 1);
					this.actions.d = true;
				
				}
			}
			this.edges = this.getEdges();		
		}
		
	}
	this.draw = function(){
		if(this.state){
			
			//WHEELS
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.rotate(this.angle);
			game.ctx.fillStyle = "#7f7f7f";
			game.ctx.fillRect(-25,-25, 50, 50)
			game.ctx.fillStyle = "black";
			game.ctx.fillRect(-30,-20, 60, 40)
			game.ctx.shadowColor = 'black';
			game.ctx.shadowBlur = 35;
			
			//COLORED PART
			game.ctx.fillStyle = this.color;
			game.ctx.beginPath();
			game.ctx.moveTo(-25, -15);
			game.ctx.lineTo(10, -15);
			game.ctx.lineTo(30, 0);
			game.ctx.lineTo(10, 15);
			game.ctx.lineTo(-25, 15);
			game.ctx.closePath();
			game.ctx.fill();
			game.ctx.restore();
			
			//CANON
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.rotate(this.canon);
			game.ctx.fillStyle = "black";
			game.ctx.beginPath();
			game.ctx.fillRect(-5,-5, 35, 10)
			game.ctx.arc(0, 0,8,0,2*Math.PI);
			game.ctx.closePath();
			game.ctx.fill();
			game.ctx.restore();
			
			//LIFE
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.fillStyle = "white"
			game.ctx.fillRect(-30,-45, 60, 5);
			game.ctx.fillStyle = "red"
			game.ctx.fillRect(-30,-45, 60 * Math.round(this.life) / this.maxlife, 5);
			game.ctx.beginPath();
			game.ctx.fillStyle = "black";
			game.ctx.rect(-30,-45, 60, 5)
			game.ctx.closePath();
			game.ctx.stroke();
			game.ctx.restore();
		}
	}
	this.getEdges = function(){
		 return({
			a:{
				x: this.x + Math.cos(this.angle-Math.atan2(20,30))*game.hyp,
				y: this.y + Math.sin(this.angle-Math.atan2(20,30))*game.hyp
			},
			b:{
				x: this.x + Math.sin(this.angle-Math.atan2(30,20))*game.hyp,
				y: this.y - Math.cos(this.angle-Math.atan2(30,20))*game.hyp
			},
			c:{
				x: this.x - Math.cos(this.angle-Math.atan2(20,30))*game.hyp,
				y: this.y - Math.sin(this.angle-Math.atan2(20,30))*game.hyp
			},
			d:{
				x: this.x - Math.sin(this.angle-Math.atan2(30,20))*game.hyp,
				y: this.y + Math.cos(this.angle-Math.atan2(30,20))*game.hyp
			},
		});
	}
	this.edges = this.getEdges();
	this.isColliding = function(){
		for(var i=0;i<game.tanks.length;i++){
			for(j in game.tanks[i].edges){
				if(isPointInside(this.edges[j], game.tanks[i].edges)){
					return(true);
				}
			}
		}
		return(false);
	}
	this.spawnable = function(){
		if(this.isColliding()){
			this.x = Math.floor((Math.random() * 940) + 60);
			this.y = Math.floor((Math.random() * 940) + 60);
			this.angle = Math.random() * 2 * Math.PI;
			this.edges = this.getEdges();
			this.spawnable();
		}
	}
	this.spawnable();
}

/*
||||||||||||||||||||||||
OBJECT BULLETS CREATION
||||||||||||||||||||||||
*/

Ball = function(tank){
	this.x = tank.x + 5 + Math.cos(tank.canon)*30;;
	this.y = tank.y + 5 + Math.sin(tank.canon)*30;;
	this.speed = tank.ballspeed;
	this.angle = getDeviation(tank.canon, tank.precision)
	this.color = tank.color;
	this.hit = function(CurrentT){
		for(var target = 0; target < game.tanks.length; target++){
			if(game.tanks[target].state && target != CurrentT && this.isPointInside(game.tanks[target].edges)){
				if(target !== 0 && CurrentT !== 0){
					return(false);
				}
				game.tanks[target].life -= tank.damage;		//ADD Here if we implemant armor
				if(game.tanks.indexOf(tank) == 0){
					game.tanks[0].xp.current += 1 * (game.currentlevel + 1);
				}
				createExplosion(this.x, this.y, "black", 5, 9, 2, this.angle);
				createExplosion(this.x, this.y, "grey", 5, 9, 2, this.angle);
				createExplosion(this.x, this.y, this.color, 5, 9, 4, this.angle);
				createExplosion(this.x, this.y, game.tanks[target].color, 5, 9, 4, this.angle);
				if(game.tanks[target].life <= 0){
					game.tanks[target].state = false;
					game.tanks.push(new IATank());
					createExplosion(game.tanks[target].x, game.tanks[target].y, game.tanks[target].color);
					createExplosion(game.tanks[target].x, game.tanks[target].y, "red");
					createExplosion(game.tanks[target].x, game.tanks[target].y, "orange");
					createExplosion(game.tanks[target].x, game.tanks[target].y, "yellow");
					clearTimeout(game.tanks[target].reloader)
				}
				return(true)
			}
		}
		
	}
	this.draw = function(){
		this.x += Math.cos(this.angle) * (1 + this.speed);
		this.y += Math.sin(this.angle) * (1 + this.speed);
		game.ctx.beginPath();
		game.ctx.fillStyle = this.color;
		game.ctx.arc(this.x - 5, this.y - 5, 5, 0, 2 * Math.PI);					//SHOTS
		game.ctx.lineWidth = 2;
		game.ctx.strokeStyle = 'black';
		game.ctx.stroke();
		game.ctx.closePath();
		game.ctx.fill();
	}
	this.isPointInside = function(edges){
		if( 
			(edges.b.x-edges.a.x)*(this.y-edges.a.y)-(edges.b.y-edges.a.y)*(this.x-edges.a.x)<=0 
			&&
			(edges.c.x-edges.b.x)*(this.y-edges.b.y)-(edges.c.y-edges.b.y)*(this.x-edges.b.x)<=0 
			&&
			(edges.d.x-edges.c.x)*(this.y-edges.c.y)-(edges.d.y-edges.c.y)*(this.x-edges.c.x)<=0 
			&&
			(edges.a.x-edges.d.x)*(this.y-edges.d.y)-(edges.a.y-edges.d.y)*(this.x-edges.d.x)<=0 
			){
			return(true)
		}else{
			return(false)
		}

}
}
