function drawAnimationsBackPlan(){


	new trail();
	drawTrail();
}

function drawAnimationsFrontPlan(){
	for (var i=0; i<game.particles.length; i++){
		game.particles[i].update(game.mainclock);
		if(game.particles[i].toremove){
			game.particles.splice(i, 1);
			if(game.particles.length > 0){
				i--;
			}
		}
	}
}
function randomFloat (min, max)
{
	return min + Math.random()*(max-min);
}
function Particle (){
	this.scale = 1.0;
	this.x = 0;
	this.y = 0;
	this.toremove = false;
	this.radius = 20;
	this.color = "#000";
	this.velocityX = 0;
	this.velocityY = 0;
	this.scaleSpeed = 0.5;
	
	this.update = function(ms)
	{
		// shrinking
		this.scale -= this.scaleSpeed * ms / 1000.0;
		
		if (this.scale <= 0){
			this.toremove = true;
		}else{
			// moving away from explosion center
			this.x += this.velocityX * ms/1000.0;
			this.y += this.velocityY * ms/1000.0;			
			// translating the 2D context to the particle coordinates
			game.ctx.save();
			game.ctx.translate(this.x, this.y);
			game.ctx.scale(this.scale, this.scale);
			
			// drawing a filled circle in the particle's local space
			game.ctx.beginPath();
			game.ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
			game.ctx.closePath();
			game.ctx.fillStyle = this.color;
			game.ctx.fill();
			game.ctx.restore();
		}
		
	}
	
	
};
function createExplosion(x, y, color, minSize=10, maxSize=30, count=10, projAngle = 0){
	var minSpeed = 60.0;
	var maxSpeed = 200.0;
	var minScaleSpeed = 1.0;
	var maxScaleSpeed = 4.0;
	
	if(projAngle === 0){
		for (var angle=0; angle<360; angle += Math.round(360/count))
		{
			var particle = new Particle();
			
			particle.x = x;
			particle.y = y;
			particle.radius = randomFloat(minSize, maxSize);
			particle.color = color;
			particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
			var speed = randomFloat(minSpeed, maxSpeed);
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
			
			game.particles.push(particle);
		}
	}else{
		projAngle = Math.round(projAngle * 180 / Math.PI) + 360;
		var angle = projAngle - 10;
		var toangle = projAngle + 10;
		for (angle; angle < toangle + 60; angle += Math.round(60/count))
		{
			var particle = new Particle();
			
			particle.x = x;
			particle.y = y;
			particle.radius = randomFloat(minSize, maxSize);
			particle.color = color;
			particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
			var speed = randomFloat(minSpeed, maxSpeed);
			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);
			
			game.particles.push(particle);
		}
	}
}

trail = function(){

	for(var i = 0; i<game.tanks.length; i++){
		if(game.tanks[i].state && game.tanks[i].ismoving){
			for(var j = 0; j < 3; j++){
				var nx = game.tanks[i].edges.c.x + Math.floor((Math.random() * 10) + 0) - 5;
				var ny = game.tanks[i].edges.c.y + Math.floor((Math.random() * 10) + 0) - 5;
				game.trails.push({x:nx, y:ny, l:50})			
				nx = game.tanks[i].edges.b.x + Math.floor((Math.random() * 10) + 0) - 5;
				ny = game.tanks[i].edges.b.y + Math.floor((Math.random() * 10) + 0) - 5;
				game.trails.push({x:nx, y:ny, l:50})
			};		
		}		
	}
}
drawTrail = function(){
	for(var i = 0; i < game.trails.length; i++){
		game.ctx.fillStyle = "black";
		game.ctx.fillRect(game.trails[i].x, game.trails[i].y, 1, 1);
		game.trails[i].l --;
		if(!game.trails[i].l){
			game.trails.splice(i, 1);
		}
	}
}







