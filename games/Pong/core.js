var game = function() {
	game.ctx = document.getElementById("cvs").getContext("2d");
	game.canvas = document.getElementById("cvs");
	
	game.fpsTime = Date.now();
	game.mousePos = {x:0, y:0}	game.start = function() {
		game.p1 = {y:30, s:0, h:50, hit:false};
		game.p2 = {y:30, s:0, h:50, hit:false};
		game.reset();
		document.addEventListener('mousemove', function(evt) {
			game.mousePos = getMousePos(game.canvas, evt);
		}, false);
		game.draw();
	};
	
	game.draw = function() {
		game.ctx.fillStyle = "black";
		game.ctx.fillRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
		
		game.ctx.fillStyle = "white";
		game.ctx.fillRect(game.ctx.canvas.width/2, 0, 1, game.ctx.canvas.height)
		game.ctx.fillRect(game.ball.x - game.ball.d/2,game.ball.y - game.ball.d/2, game.ball.d, game.ball.d)
		
		game.ctx.fillRect(5, game.p1.y - game.p1.h/2, 5, game.p1.h)
		game.ctx.fillRect(game.ctx.canvas.width - 10, game.p2.y - game.p2.h/2, 5, game.p2.h)
		
		game.ctx.font = "bold 40px Arial";
		game.ctx.fillStyle = "white";
		game.ctx.textAlign = "right";
		game.ctx.fillText(game.p1.s, game.ctx.canvas.width/2 - 5, 40)
		game.ctx.textAlign = "left";
		game.ctx.fillText(game.p2.s, game.ctx.canvas.width/2 + 5, 40)
		game.ctx.fill();
		
		
		game.check();
		game.move();
		
		game.frameR = window.requestAnimationFrame(game.draw);
	}
	
	game.move = function(){
		if(game.mousePos.y + game.p1.h/2 >= game.ctx.canvas.height) {
			game.p1.y = game.ctx.canvas.height - 30
			
		}else if(game.mousePos.y - game.p1.h/2 <= 0) {
			game.p1.y = 30;
		}else {
			game.p1.y = game.mousePos.y
		}
		game.ball.x += Math.cos(game.ball.a) * game.ball.v;
		game.ball.y += Math.sin(game.ball.a) * game.ball.v;
		
		//AI
		if(game.ball.y < game.p2.y) {
			var x = 2 * Math.log((game.p2.y - game.ball.y));
			if(x > 0) {
				game.p2.y -= x
			}
		}else{
			var x = 2 * Math.log((game.ball.y - game.p2.y));
			if(x > 0) {
				game.p2.y += x
			}
		}
		//LIMITS
		if(game.p2.y - game.p2.h/2 < 0) {
			game.p2.y = game.p2.h/2
		}
		if(game.p2.y + game.p2.h/2 > game.ctx.canvas.height) {
			game.p2.y = game.ctx.canvas.height - game.p2.h/2
		}
	}
	
	game.reset = function() {
		window.cancelAnimationFrame(game.frameR);
		game.p1.hit = false;
		game.p2.hit = false;
		game.ball = {x:game.ctx.canvas.width/2, y:game.canvas.height/2, d:8, a:10 * Math.PI/180, v:5};
	}
	
	
	game.check = function() {
		//Ball vs wall
		if(game.ball.y - game.ball.d/2 < 0 || game.ball.y + game.ball.d/2 >= game.ctx.canvas.height) {
			game.ball.a = 2 * Math.PI - game.ball.a
		}
		//Ball vs PADS
		if(!game.p1.hit && game.ball.x - game.ball.d < 10 && game.ball.x - game.ball.d > 5 && game.ball.y > game.p1.y - game.p1.h/2 && game.ball.y < game.p1.y + game.p1.h/2) {
			var ratio = ((game.ball.y - game.p1.y + game.p1.h/2) / game.p1.h)
			game.ball.a = (ratio * 160 - 80) * Math.PI / 180
			game.ball.v += 0.1;
			game.p1.hit = true;
			game.p2.hit = false;
			new Audio('pong.mp3').play()
		}
		if(!game.p2.hit && game.ball.x + game.ball.d > game.ctx.canvas.width - 10 && game.ball.x + game.ball.d < game.ctx.canvas.width - 5 && game.ball.y > game.p2.y - game.p2.h/2 && game.ball.y < game.p2.y + game.p2.h/2) {
			var ratio = ((game.ball.y - game.p2.y + game.p2.h/2) / game.p2.h)
			game.ball.a = (ratio * (-160) - 100) * Math.PI / 180
			game.ball.v += 0.1;
			game.p2.hit = true;
			game.p1.hit = false;
			new Audio('pong.mp3').play()
		}
		
		//Ball lost
		if(game.ball.x < 0) {
			game.p2.s ++;
			game.reset();
		}else if(game.ball.x > game.ctx.canvas.width) {
			game.p1.s ++;
			game.reset();
		}
	}
}

game();
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
	scaleX = canvas.width / rect.width,
	scaleY = canvas.height / rect.height;
    return {
			x: (evt.clientX - rect.left) * scaleX,
			y: (evt.clientY - rect.top) * scaleY
		};
}


