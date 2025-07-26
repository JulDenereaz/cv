/*
---------------
MADE BY COYOTTE
---------------


SPAWN A TANK ON TOP OF ANOTHER TANKS
ANIMATE WHEN HIT
*/


var game = {
	ctx: document.getElementById("cvs").getContext("2d"),
	canvas: document.getElementById("cvs"),
	lastLoop:new Date,
	hyp:Math.sqrt(Math.pow(30, 2) + Math.pow(20, 2)),
	tanks: [],
	currentlevel:0,
	mousePos:{x:0, y:0},
	alpha:39.8*Math.PI/180,
	mainclock:16,
	state:false,
	particles: [],
	trails: []
}



function start() {
	if(game.state){
		return
	}else{
		game.state = true;
		var input = document.getElementById('username');
		$("input").prop( "disabled", true );
		input.className = "";
		game.canvas.addEventListener('mousemove', function(evt) {
			game.mousePos = getMousePos(game.canvas, evt);
		}, false);
		$("#cvs").on("mousedown", function(e){
			game.tanks[0].actions.m = true;
		});			
		$("#cvs").on("mouseup", function(e){
			game.tanks[0].actions.m = false;
		});	
		$(document).keydown(function (e){
			if(e.keyCode == 37 || e.keyCode == 65){			//left
				game.tanks[0].actions.l = true
				e.preventDefault();
			}else if(e.keyCode == 38 || e.keyCode == 87){		//up
				game.tanks[0].actions.u = true
				e.preventDefault();
			}else if(e.keyCode == 39 || e.keyCode == 68){		//right
				game.tanks[0].actions.r = true
				e.preventDefault();
			}else if(e.keyCode == 40 || e.keyCode == 83){		//down
				game.tanks[0].actions.d = true
				e.preventDefault();
			}
			
		});

		$(document).keyup(function (e){
			if(e.keyCode == 37 || e.keyCode == 65){			//left
				game.tanks[0].actions.l = false
				e.preventDefault();
			}else if(e.keyCode == 38 || e.keyCode == 87){		//up
				game.tanks[0].actions.u = false
				e.preventDefault();
			}else if(e.keyCode == 39 || e.keyCode == 68){		//right
				game.tanks[0].actions.r = false
				e.preventDefault();
			}else if(e.keyCode == 40 || e.keyCode == 83){		//down
				game.tanks[0].actions.d = false
				e.preventDefault();
			}
			e.preventDefault();
		});
		game.tanks.push(new Tank());
		game.tanks.push(new IATank());
		window.requestAnimationFrame(draw);
	}
}




function draw() {
	for(var k=0; k<game.tanks.length; k++){
		if(!game.tanks[k].state && !k){
			//DEAD
		}else if(!game.tanks[k].state && game.tanks[k].balls.length == 0){
			game.tanks.splice(k, 1)
		}
	}
	game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
	drawAnimationsBackPlan();
	drawballs();
	for(var i=0; i<game.tanks.length; i++){
		// for(var j=; j< game.tanks[i].balls.length, j++){
			// game.tanks[i].balls[j].draw();
		// }
		game.tanks[i].move();
		game.tanks[i].draw();
	}
	drawAnimationsFrontPlan();
	drawUI();
	window.requestAnimationFrame(draw);
}


function drawballs(){
	for(var i=0; i<game.tanks.length; i++){
		for(var j=0; j<game.tanks[i].balls.length; j++){
			if(!game.tanks[i].balls[j].hit(i)){
				game.tanks[i].balls[j].draw();
				if(game.tanks[i].balls[j].x - 5 < -25 || game.tanks[i].balls[j].y - 5 < -25 || game.tanks[i].balls[j].x > 1025 || game.tanks[i].balls[j].y > 1025){
					game.tanks[i].balls.splice(j, 1);
					if(game.tanks[i].balls.length > 0){
						j--;
					}
				}
			}else{
				game.tanks[i].balls.splice(j, 1);
				j--;
				if(game.tanks[i].life <= 0){
					game.tanks[i].state = false;
					clearTimeout(game.tanks[i].reloader);
				}
			}
		}
	}
}


function drawUI(){
	var thisLoop = new Date;
    var fps = 1000 / (thisLoop - game.lastLoop);
	game.lastLoop = thisLoop;
	game.ctx.fillStyle = "black";
	game.ctx.font = "bold 10px Arial";
	if(fps < 20){
		game.ctx.fillStyle = "red";
	}
	
	game.ctx.fillText("FPS :" + Math.round(fps), 5, 10);
	game.ctx.fillStyle = "black";
	/*
	game.ctx.beginPath();
	game.ctx.arc(75, 925, 75, 0, 2 * Math.PI);
	game.ctx.closePath();
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(100, 925, 75, 0, Math.pi);
	game.ctx.closePath();
	game.ctx.stroke();
	*/
	
	game.ctx.font = "bold 20px Arial";
	game.ctx.fillText(game.tanks[0].name,10, 950);
	
	
	//Health Bar
	game.ctx.fillText("Life : ", 10, 990);
	game.ctx.fillRect(75,970, 500, 25);
	game.ctx.fillStyle = "white";
	game.ctx.fillRect(77,972, 496, 21);	
	game.ctx.fillStyle = "red";
	game.ctx.fillRect(77,972, Math.round(496 * game.tanks[0].life / game.tanks[0].maxlife), 21);
	game.ctx.fillStyle = "black";
	game.ctx.font = "bold 15px Arial";
	game.ctx.fillText(Math.round(game.tanks[0].life) + "/" + 100, 80, 988);
	
	//XP Bar
	
	game.ctx.fillRect(75,965, 500, 10);
	game.ctx.fillStyle = "black";
	game.ctx.fillRect(77,967, 496, 6);	
	game.ctx.fillStyle = "yellow";
	game.ctx.fillRect(77,967, Math.round(496 * game.tanks[0].xp.current / game.tanks[0].xp.nextLevel), 6);
	

}


function getAngle(tank, target){
 var a = tank.y - target.y; 
 var b = tank.x - target.x;
 
 return Math.atan2(a,b)+Math.PI;
}


function getRandomColor() {
    return '#'+Math.random().toString(16).substr(-6);;
}

function getDeviation(nb, dev){
	if(Math.round((Math.random()))){
		return(nb = nb + Math.floor((Math.random() * dev) + 0) * Math.PI/180)
	}else{
		return(nb = nb - Math.floor((Math.random() * dev) + 0) * Math.PI/180)
	}
}

//MOUSE COORDINATES
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
	scaleX = canvas.width / rect.width,
	scaleY = canvas.height / rect.height;
    return {
			x: (evt.clientX - rect.left) * scaleX,
			y: (evt.clientY - rect.top) * scaleY
		};
}

//KEYBOARD MANAGMENT
function alphaOnly(event) {
  var key = event.keyCode;
  return ((key >= 65 && key <= 90) || key == 8);
};


function isPointInside(p, collideBox){
	if(	
		(collideBox.b.x-collideBox.a.x)*(p.y-collideBox.a.y)-(collideBox.b.y-collideBox.a.y)*(p.x-collideBox.a.x) < 0 &&
		(collideBox.c.x-collideBox.b.x)*(p.y-collideBox.b.y)-(collideBox.c.y-collideBox.b.y)*(p.x-collideBox.b.x) < 0 &&
		(collideBox.d.x-collideBox.c.x)*(p.y-collideBox.c.y)-(collideBox.d.y-collideBox.c.y)*(p.x-collideBox.c.x) < 0 &&
		(collideBox.a.x-collideBox.d.x)*(p.y-collideBox.d.y)-(collideBox.a.y-collideBox.d.y)*(p.x-collideBox.d.x) < 0 ){
		
		return(true)
	}
	return(false)
}



