/*=====================================================================================
GAME INITIALIZATION
=======================================================================================*/

var game = {};

game.launch = function(){
	game.state = false;
	game.m = false;
	game.mainclock = 16;
	game.difficulty = 1;
	game.ctx = document.getElementById("cvs").getContext("2d");
	game.canvas = document.getElementById("cvs");
	game.value = true;
	game.engine = function(){
		game.pos.trail.push(game.pos.y);
		if(game.pos.trail.length > 50){
			game.pos.trail.shift();
		}
		if(game.pos.y < 0 || game.pos.y > 400){
			game.over();
		}
		
		if(game.m){
			if(game.set.vy > -4){
				game.set.vy -= game.set.g;
			}
		}else{
			if(game.set.vy < 4){
				game.set.vy += game.set.g;
			}
		}
		game.pos.y += game.set.vy;
		
		

		game.score += 0.1;
		for(var i = 0; i < game.pos.walls.length; i ++){
			game.pos.walls[i].x += game.set.vx;
		}
		
		for(var i = 0; i < game.pos.ob.length; i++){
			game.pos.ob[i].x += game.set.vx;
		}
		
	}
	game.genWalls = function(){
		game.pos.walls.unshift({x:800, y:game.pos.next, height:game.pos.height});
		if(game.pos.walls[game.pos.walls.length - 1].x < 0){
			game.pos.walls.pop();
		}
		
		if(game.value){
			game.pos.next += game.set.vx * 6;
		}else{
			game.pos.next -= game.set.vx * 6;
			
		}
		
		if(game.pos.next < 0){
			game.counter = game.maxcounter
			game.pos.next = 0;
		}else if(game.pos.next > 400-game.pos.height){
			game.counter = game.maxcounter
			game.pos.next = 400 - game.pos.height;
		}
		
		game.counter ++;
			
		
		if(game.counter >= game.maxcounter){
			game.maxcounter = Math.floor((Math.random() * 5) + 1);
			game.value = Math.round(Math.random());
			game.counter = 0;
		}
		if(game.pos.height > 50)
			game.pos.height -= 0.5;
	}
	game.genobstacle = function(){
		game.pos.ob.push({x:800, y: Math.floor((Math.random() * (game.pos.next + game.pos.height - 150)) + game.pos.next + 5), h:30})
		if(game.pos.ob[0].x < 0){
			game.pos.ob.unshift();
		}
	}
	game.draw = function(){
		game.engine();
		game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
		
		//TRAIL
		game.ctx.fillStyle = "#7f0000";
		for(i = 1; i < game.pos.trail.length; i += 5){
			game.ctx.fillRect(144 + (game.pos.trail.length - i) * game.set.vx, game.pos.trail[i] - 3, 6, 6)
		}		
		game.ctx.fillStyle = "red";
		game.ctx.fillRect(147, game.pos.y - 3, 6, 6)
		
		
		//WALLS UP
		game.ctx.fillStyle = "#00ff00";
		game.ctx.beginPath();
		game.ctx.moveTo(800,0);
		game.ctx.lineTo(800, game.pos.next);
		for(var i = 0; i < game.pos.walls.length; i ++){
			game.ctx.lineTo(game.pos.walls[i].x, game.pos.walls[i].y);
		}
		if(game.ctx.isPointInPath(150, game.pos.y - 3)){
			game.over();
		};
		game.ctx.lineTo(game.pos.walls[game.pos.walls.length-1].x, 0);
		game.ctx.closePath();
		game.ctx.fill();
		
		//WALLS DOWN
		game.ctx.beginPath();
		game.ctx.moveTo(800,400);
		game.ctx.lineTo(800, game.pos.next + game.pos.height);
		for(var i = 0; i < game.pos.walls.length; i ++){
			game.ctx.lineTo(game.pos.walls[i].x, game.pos.walls[i].y + game.pos.walls[i].height);
		}
		game.ctx.lineTo(game.pos.walls[game.pos.walls.length-1].x, 400);
		if(game.ctx.isPointInPath(155, game.pos.y)){
			game.over();
		};
		game.ctx.closePath();
		game.ctx.fill();
		
		//OBSTACLE
		game.ctx.fillStyle = "red";
		for(var i = 0; i < game.pos.ob.length; i++){
			game.ctx.beginPath();
			game.ctx.moveTo(game.pos.ob[i].x, game.pos.ob[i].y);
			game.ctx.lineTo(game.pos.ob[i].x + 8, game.pos.ob[i].y);
			game.ctx.lineTo(game.pos.ob[i].x + 8, game.pos.ob[i].y + game.pos.ob[i].h);
			game.ctx.lineTo(game.pos.ob[i].x, game.pos.ob[i].y + game.pos.ob[i].h);
			if(game.ctx.isPointInPath(150, game.pos.y + 3)){
				game.over();
			};
			game.ctx.closePath();
			game.ctx.fill();
		}
		
		//SCORE
		game.ctx.fillStyle = "white";
		game.ctx.textAlign="end"; 
		game.ctx.font = "35px Arial";
		game.ctx.fillText(Math.round(game.score), 790, 30);
	}
	game.start = function(){
		if(!game.state){
			game.state = true;
			game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
			game.score = 0;
			game.set = {g: 0.15, vy : 0, vx: -2}
			game.pos = {y: 100, trail: [], walls: [0], height:400, next:0, ob: []};
			game.counter = 0;
			game.maxcounter = Math.floor((Math.random() * 10) + 1);
			game.loop = setInterval(game.draw, game.mainclock);
			game.walls = setInterval(game.genWalls, game.mainclock * 5);
			game.obst = setInterval(game.genobstacle, game.mainclock * 240);
			$("#cvs").on("mousedown", function(e){
				game.m = true;
			});			
			$("#cvs").on("mouseup", function(e){
				game.m = false;
			});	
		}
	}	
	
	game.over = function(){
		clearInterval(game.loop);
		clearInterval(game.walls);
		clearInterval(game.obst);
		console.log("Game Over")
		game.state = false;
	}
};

/*=====================================================================================
GAME START
=======================================================================================*/

game.launch();