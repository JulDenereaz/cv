/* 8x8 pixel square
1 tile per second
26 tiles horizontal
29 tiles vertical
https://www.slideshare.net/grimlockt/pac-man-6561257

0
*/

/*
1. Fruits
9. sound
10. flashed white
11. antibiotic / DNA pixel art
*/


var game = {
	baseMap: [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
		[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		[0,3,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,3,0],
		[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
		[0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
		[0,2,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,2,0],
		[0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
		[0,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,0],
		[5,5,5,5,5,0,2,0,0,0,0,0,1,0,0,1,0,0,0,0,0,2,0,5,5,5,5,5],
		[5,5,5,5,5,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,5,5,5,5,5],
		[5,5,5,5,5,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,5,5,5,5,5],
		[0,0,0,0,0,0,2,0,0,1,0,5,5,5,5,5,5,0,1,0,0,2,0,0,0,0,0,0],
		[4,4,4,4,4,4,2,1,1,1,0,5,5,5,5,5,5,0,1,1,1,2,4,4,4,4,4,4],
		[0,0,0,0,0,0,2,0,0,1,0,5,5,5,5,5,5,0,1,0,0,2,0,0,0,0,0,0],
		[5,5,5,5,5,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,5,5,5,5,5],
		[5,5,5,5,5,0,2,0,0,1,1,1,1,1,1,1,1,1,1,0,0,2,0,5,5,5,5,5],
		[5,5,5,5,5,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,5,5,5,5,5],
		[0,0,0,0,0,0,2,0,0,1,0,0,0,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0],
		[0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,0],
		[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		[0,2,0,0,0,0,2,0,0,0,0,0,2,0,0,2,0,0,0,0,0,2,0,0,0,0,2,0],
		[0,3,2,2,0,0,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,0,0,2,2,3,0],
		[0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
		[0,0,0,2,0,0,2,0,0,2,0,0,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0,0],
		[0,2,2,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,0,0,2,2,2,2,2,2,0],
		[0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
		[0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0],
		[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	walls: [
		[3,1,1,1,1,1,1,1,1,1,1,1,1,4,3,1,1,1,1,1,1,1,1,1,1,1,1,4],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,3,1,1,4,0,3,1,1,1,4,0,2,2,0,3,1,1,1,4,0,3,1,1,4,0,2],
		[2,0,2,0,0,2,0,2,0,0,0,2,0,2,2,0,2,0,0,0,2,0,2,0,0,2,0,2],
		[2,0,6,1,1,5,0,6,1,1,1,5,0,6,5,0,6,1,1,1,5,0,6,1,1,5,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,3,1,1,4,0,3,4,0,3,1,1,1,1,1,1,4,0,3,4,0,3,1,1,4,0,2],
		[2,0,6,1,1,5,0,2,2,0,6,1,1,4,3,1,1,5,0,2,2,0,6,1,1,5,0,2],
		[2,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,2],
		[6,1,1,1,1,4,0,2,6,1,1,4,0,2,2,0,3,1,1,5,2,0,3,1,1,1,1,5],
		[0,0,0,0,0,2,0,2,3,1,1,5,0,6,5,0,6,1,1,4,2,0,2,0,0,0,0,0],
		[0,0,0,0,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,2,0,0,0,0,0],
		[0,0,0,0,0,2,0,2,2,0,7,1,1,0,0,1,1,8,0,2,2,0,2,0,0,0,0,0],
		[1,1,1,1,1,5,0,6,5,0,2,0,0,0,0,0,0,2,0,6,5,0,6,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,4,0,3,4,0,2,0,0,0,0,0,0,2,0,3,4,0,3,1,1,1,1,1],
		[0,0,0,0,0,2,0,2,2,0,10,1,1,1,1,1,1,9,0,2,2,0,2,0,0,0,0,0],
		[0,0,0,0,0,2,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,2,0,0,0,0,0],
		[0,0,0,0,0,2,0,2,2,0,3,1,1,1,1,1,1,4,0,2,2,0,2,0,0,0,0,0],
		[3,1,1,1,1,5,0,6,5,0,6,1,1,4,3,1,1,5,0,6,5,0,6,1,1,1,1,4],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[2,0,3,1,1,4,0,3,1,1,1,4,0,2,2,0,3,1,1,1,4,0,3,1,1,4,0,2],
		[2,0,6,1,4,2,0,6,1,1,1,5,0,6,5,0,6,1,1,1,5,0,2,3,1,5,0,2],
		[2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,2],
		[6,1,4,0,2,2,0,3,4,0,3,1,1,1,1,1,1,4,0,3,4,0,2,2,0,3,1,5],
		[3,1,5,0,6,5,0,2,2,0,6,1,1,4,3,1,1,5,0,2,2,0,6,5,0,6,1,4],
		[2,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,2],
		[2,0,3,1,1,1,1,5,6,1,1,4,0,2,2,0,3,1,1,5,6,1,1,1,1,4,0,2],
		[2,0,6,1,1,1,1,1,1,1,1,5,0,6,5,0,6,1,1,1,1,1,1,1,1,5,0,2],
		[2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
		[6,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,5]
	],
	scatterTiming: [
		[7000, 20000, 7000, 20000, 5000, 20000, 5000],
		[7000, 20000, 7000, 20000, 5000, 1033000, 1, 999999999],
		[7000, 20000, 7000, 20000, 5000, 1033000, 1, 999999999],
		[7000, 20000, 7000, 20000, 5000, 1033000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999],
		[5000, 20000, 5000, 20000, 5000, 1037000, 1, 999999999]
	],
	frightenedTime: [6000, 5000, 4000, 3000, 5000, 5000, 2000, 2000, 1000, 5000, 2000, 2000, 1000, 3000, 1000, 1000, 0, 1000, 0, 0, 0],
	tS: 20,
	fr: 60,
	score:0,
	eaten:0,
	level:0,
	ais: [],
	timer:0,
	version: 0.9,
	lifes:5,
	welcomeScreen: true,
	ready:false,
	human:true,
	bloods: [],
	fruits:[],
	pelletsRemaining: 0,
	scatterMode: true,
	scatterN: 0,
	timeLeft: 0,
	reset: false,
	WALL:0,
	EMPTY:1,
	BISCUIT:2,
	PILL: 3,
	TUNNEL:4,
	OOB:5,
}

function preload() {
	game.font = loadFont('assets/PressStart2P.ttf')
	game.sprites = loadImage('assets/sprites.png'),
	game.sounds = {
		"start":loadSound('assets/pacman_beginning.wav'),
		"eat":loadSound('assets/pacman_chomp.wav')
	}
}

function setup() {
	//Defining variables
	frameRate(game.fr);
	game.tS2 = game.tS / 2
	game.offSetY = 3 * game.tS
	game.offSetX = game.tS
	game.map = game.baseMap.map(function(arr) {
    	return arr.slice();
	});
	game.baseSpeed = game.tS * 10 / game.fr,
	game.nextKey = createVector(-1, 0)
	game.vus = [createVector(0,-1), createVector(-1,0), createVector(0,1), createVector(1,0)];
	//Creates background canvas
	canvas = document.createElement('canvas');
	canvas.width = (game.map[0].length + 2) * game.tS
	canvas.height = (game.map.length + 5) * game.tS
	canvas.style.position = 'absolute'
	canvas.style.zIndex = -2
	document.body.appendChild(canvas);
	game.ctx = canvas.getContext("2d");
	game.ctx.fillStyle = "black"
	game.ctx.fillRect(0,0,canvas.width, canvas.height)
	for(var y = 0; y < game.map.length; y++) {
		for(var x = 0; x < game.map[y].length; x++) {
		  if(!game.map[y][x]) {
			getWall(x, y);

		  }
		}
	}
	outerWall();
	createCanvas((game.map[0].length + 2) * game.tS, (game.map.length + 5) * game.tS);

}

function loadLevel() {
	game.map = game.baseMap.map(function(arr) {
    	return arr.slice();
	});
	x = 0;
	game.map.forEach(function(a) {x += a.filter(v => v == 2).length})
	game.pelletsRemaining = x;
	game.eaten = 0;
	game.pacman = null;
	game.ais = [];
	game.bloods = [];
	clearTimeout(game.looper)
	clearTimeout(game.timeout)
	game.ready = true;

}

function nextLevel() {
	game.level ++;
	loadLevel()
	startLevel();
}

function restartLevel() {
	game.reset = false;
	game.pacman = null;
	game.ais = [];
	game.bloods = [];
	startLevel();
}

function startLevel() {
	getObjects()

	game.timemout = setTimeout(function() {
		game.ready = false;
		resetTimers()
		updater()
	}, 2000)
}
function resetTimers() {
	game.stop = false;
	game.timer = millis()
	game.scatterN = 0;
	game.scatterMode = true
	game.timeLeft = game.scatterTiming[game.level][game.scatterN]
}

function getObjects() {
	game.ais = [];
	game.pacman = new Pacman(posX(13) + game.tS, centerY(23));
	game.ais.push(new Ai("RED"));
	game.ais.push(new Ai("ORANGE"));
	game.ais.push(new Ai("CYAN"));
	game.ais.push(new Ai("PINK"));
	game.ais.forEach(function(ai) {
		ai.init();
	})
}

function draw() {
	clear()
	if(game.welcomeScreen) {
		fill("black");
		rect(0, 0, canvas.width, canvas.height)
		textSize(50);
		textFont(game.font);
		textAlign(CENTER, TOP);
		fill("#ffff00");
		text('PNEUMO-MAN', posX(14), centerY(4))
		fill("#dedede");
		textSize(15);
		text('< Press Space to start >', posX(14), centerY(22))

		textSize(20);
		text('CHOOSE YOUR CHARACTER', posX(14), centerY(12));
		if(game.human) {
			text('PNEUMO', posX(14), centerY(16))
			fill("#7FFF00")
			text('< HUMAN >', posX(14), centerY(14))
		}else {
			text('HUMAN', posX(14), centerY(14))
			fill("#7FFF00")
			text('< PNEUMO >', posX(14), centerY(16))
		}

	}else {
		i = game.bloods.length
		while (i--) {
			game.bloods[i].show()
		    if (frameCount > game.bloods[i].end) {
		        game.bloods.splice(i, 1)
		    }
		}

		for(var y = 0; y < game.map.length; y++) {
			for(var x = 0; x < game.map[y].length; x++) {
				if(game.map[y][x] == game.BISCUIT) {
					fill("#ffb897");
					noStroke();
					rectMode(CENTER)
					rect(centerX(x), centerY(y), 3, 3)
				}else if(game.map[y][x] == game.PILL) {
					fill("#ffb897");
					noStroke();
					rectMode(CENTER);
					ellipse(centerX(x), centerY(y), 14, 14);
				}
			}
		}
		game.ais.forEach(function(ai) {
			ai.show();
		});
		if(game.pacman) {
			game.pacman.show(game.pacman.pos.x, game.pacman.pos.y, false);
			for(i = 1; i < game.lifes; i ++) {
				game.pacman.show(posX(0) + i * 50, posY(32), true)
			}
		}
		fill("black")
		rectMode(CORNER)
		rect(0, 330, 20, 40)
		rect(580, 330, 20, 40)
		textSize(25);
		textFont(game.font);
		textAlign(CENTER, TOP);
		fill("#ffff00");
		text('PNEUMO-MAN', posX(14), centerY(-3))
		fill("#dedede");
		textSize(12);
		textAlign(LEFT, TOP);
		text('LEVEL ' + str(game.level + 1), posX(23), centerY(-2))
		text('SCORE ' + str(game.score), posX(1), centerY(-2))
		textAlign(RIGHT, TOP);
		textSize(6);
		text("Version " + str(game.version), centerX(28) + 5, centerY(32))
		if(game.ready) {
			textAlign(CENTER, CENTER);
			fill("#ffff00");
			textSize(20);
			text('READY!', posX(14), centerY(17))
		}

	}
}

function updater() {
	game.timeLeft -= millis() - game.timer
	game.timer = millis()
	checkExit()
	if(game.timeLeft < 0) {
		game.scatterN ++
		game.scatterMode = !game.scatterMode
		game.timeLeft = game.scatterTiming[game.level][game.scatterN]
		if(!game.scatterMode) {
			game.ais.forEach(function(ai) {
				if(ai.mode == "CHASE" && !ai.frightened && !ai.eaten && !ai.reseting) {
					ai.reverse = true;
				}
			})
		}
	}
	game.pacman.move();
	game.ais.forEach(function(ai) {
		ai.scatterMode = game.scatterMode;
		ai.move();
	})

	if(!game.pelletsRemaining) {
		clearTimeout(game.looper)
		game.stop = true
		setTimeout(nextLevel, 2000)
	}else if(game.reset) {
		game.stop = true;
		game.lifes --;
		setTimeout(restartLevel, 2000)
		//animation
	}
	if(!game.stop) {
		game.looper = setTimeout(updater, 1000/game.fr);
	}
}

function checkExit() {
	if(game.eaten >= 0 && game.ais[3].mode == "PRISON") {
		game.ais[3].mode = "EXIT"
	}else if(game.eaten >= 30 && game.ais[2].mode == "PRISON") {
		game.ais[2].mode = "EXIT"
	}else if(game.eaten >= 72 && game.ais[1].mode == "PRISON") {
		game.ais[1].mode = "EXIT"
	}
}

function getWall(x, y) {
	game.ctx.beginPath();
	game.ctx.lineWidth = 2;
	game.ctx.strokeStyle = "#2121de"

	switch(game.walls[y][x]) {
		case 1:
			game.ctx.moveTo(posX(x), centerY(y))
			game.ctx.lineTo(posX(x) + game.tS, centerY(y))
			break;
		case 2:
			game.ctx.moveTo(centerX(x), posY(y))
			game.ctx.lineTo(centerX(x), posY(y) + game.tS)
			break;
		case 3:
			game.ctx.arc(posX(x) + game.tS, posY(y) + game.tS, game.tS2, PI, 1.5 * PI)
			break;
		case 4:
			game.ctx.arc(posX(x), posY(y) + game.tS, game.tS2, 1.5 * PI, TWO_PI)
			break;
		case 5:
			game.ctx.arc(posX(x), posY(y), game.tS2, TWO_PI, HALF_PI)
			break;
		case 6:
			game.ctx.arc(posX(x) + game.tS, posY(y), game.tS2, HALF_PI, PI)
			break;
		case 7:
			game.ctx.moveTo(posX(x) + game.tS2, posY(y) + game.tS)
			game.ctx.lineTo(posX(x) + game.tS2, centerY(y))
			game.ctx.lineTo(posX(x) + game.tS, centerY(y))
			break;
		case 8:
			game.ctx.moveTo(posX(x), centerY(y))
			game.ctx.lineTo(centerX(x), centerY(y))
			game.ctx.lineTo(centerX(x), posY(y) + game.tS)
			break;
		case 9:
			game.ctx.moveTo(centerX(x), posY(y))
			game.ctx.lineTo(centerX(x), centerY(y))
			game.ctx.lineTo(posX(x), centerY(y))
			break;
		case 10:
			game.ctx.moveTo(posX(x) + game.tS, centerY(y))
			game.ctx.lineTo(centerX(x), centerY(y))
			game.ctx.lineTo(centerX(x), posY(y))
			break;
	}
	game.ctx.stroke();
}

function centerX(x) {
  return(x * game.tS + game.offSetX + game.tS2)
}
function centerY(y) {
  return(y * game.tS + game.offSetY + game.tS2)
}

function posX(x) {
  return(x * game.tS + game.offSetX)
}

function posY(y) {
  return(y * game.tS + game.offSetY)
}

function cs(x) {
	return console.log(x)
}

function keyPressed() {
	switch(keyCode) {
		case 32:
			if(game.welcomeScreen) {
				game.welcomeScreen = false;
				loadLevel();
				game.sounds["start"].play()
				game.timemout = setTimeout(function () {
					game.ready = true;
					startLevel();
				}, 3000);
			}
			break;
		case RIGHT_ARROW:
			game.nextKey.set(1,0)
			break;
		case LEFT_ARROW:
			game.nextKey.set(-1,0)
			break;
		case UP_ARROW:
			game.nextKey.set(0,-1)
			if(game.welcomeScreen) {
				game.human= true;
			}
			break;
		case DOWN_ARROW:
			if(game.welcomeScreen) {
				game.human= false;
			}
			game.nextKey.set(0,1)
			break;
		case 68:
			game.nextKey.set(1,0)
			break;
		case 65:
			game.nextKey.set(-1,0)
			break;
		case 87:
			if(game.welcomeScreen) {
				game.human= true;
			}
			game.nextKey.set(0,-1)
			break;
		case 83:
			if(game.welcomeScreen) {
				game.human= false;
			}
			game.nextKey.set(0,1)
			break;
	}

}

function outerWall() {
	game.ctx.beginPath();
	game.ctx.lineWidth = 2;
	game.ctx.strokeStyle = "#2121de";
	game.ctx.moveTo(posX(15), centerY(12));
	game.ctx.lineTo(posX(15), posY(13));
	game.ctx.lineTo(posX(17), posY(13));
	game.ctx.lineTo(posX(17), posY(16));
	game.ctx.lineTo(posX(11), posY(16));
	game.ctx.lineTo(posX(11), posY(13));
	game.ctx.lineTo(posX(13), posY(13));
	game.ctx.lineTo(posX(13), centerY(12));
	game.ctx.stroke();

	game.ctx.beginPath();
	game.ctx.moveTo(posX(0), posY(13));
	game.ctx.lineTo(centerX(4), posY(13));
	game.ctx.moveTo(posX(5), centerY(12));
	game.ctx.lineTo(posX(5), centerY(10));
	game.ctx.moveTo(centerX(4), posY(10));
	game.ctx.lineTo(centerX(0), posY(10));
	game.ctx.moveTo(posX(0), centerY(9));
	game.ctx.lineTo(posX(0), centerY(0));
	game.ctx.moveTo(centerX(0), posY(0));
	game.ctx.lineTo(centerX(27), posY(0));
	game.ctx.moveTo(posX(28), centerY(0));
	game.ctx.lineTo(posX(28), centerY(9));
	game.ctx.moveTo(centerX(27), posY(10));
	game.ctx.lineTo(centerX(23), posY(10));
	game.ctx.moveTo(posX(23), centerY(10));
	game.ctx.lineTo(posX(23), centerY(12));
	game.ctx.moveTo(centerX(23), posY(13));
	game.ctx.lineTo(posX(28), posY(13));
	game.ctx.stroke()

	game.ctx.beginPath();
	game.ctx.moveTo(posX(0), posY(16));
	game.ctx.lineTo(centerX(4), posY(16));
	game.ctx.moveTo(posX(5), centerY(16));
	game.ctx.lineTo(posX(5), centerY(18));
	game.ctx.moveTo(centerX(4), posY(19));
	game.ctx.lineTo(centerX(0), posY(19));
	game.ctx.moveTo(posX(0), centerY(19));
	game.ctx.lineTo(posX(0), centerY(30));
	game.ctx.moveTo(centerX(0), posY(31));
	game.ctx.lineTo(centerX(27), posY(31));
	game.ctx.moveTo(posX(28), centerY(30));
	game.ctx.lineTo(posX(28), centerY(19));
	game.ctx.moveTo(centerX(27), posY(19));
	game.ctx.lineTo(centerX(23), posY(19));
	game.ctx.moveTo(posX(23), centerY(18));
	game.ctx.lineTo(posX(23), centerY(16));
	game.ctx.moveTo(centerX(23), posY(16));
	game.ctx.lineTo(posX(28), posY(16));
	game.ctx.stroke()

	game.ctx.beginPath()
	game.ctx.arc(centerX(4), centerY(12), game.tS2, TWO_PI, HALF_PI)
	game.ctx.stroke()
	game.ctx.beginPath()
	game.ctx.arc(centerX(4), centerY(10), game.tS2, 1.5 * PI, 0)
	game.ctx.stroke()
	game.ctx.beginPath()
	game.ctx.arc(centerX(0), centerY(9), game.tS2, PI/2, PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(0), centerY(0), game.tS2, PI, 1.5*PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(27), centerY(0), game.tS2, 1.5*PI, 0)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(27), centerY(9), game.tS2, TWO_PI, HALF_PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(23), centerY(10), game.tS2, PI, 1.5*PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(23), centerY(12), game.tS2, PI/2, PI)
	game.ctx.stroke();

	game.ctx.beginPath()
	game.ctx.arc(centerX(4), centerY(16), game.tS2, 1.5 * PI, 0)
	game.ctx.stroke()
	game.ctx.beginPath()
	game.ctx.arc(centerX(4), centerY(18), game.tS2, TWO_PI, HALF_PI)
	game.ctx.stroke()
	game.ctx.beginPath()
	game.ctx.arc(centerX(0), centerY(30), game.tS2, PI/2, PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(0), centerY(19), game.tS2, PI, 1.5*PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(27), centerY(19), game.tS2, 1.5*PI, 0)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(27), centerY(30), game.tS2, TWO_PI, HALF_PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(23), centerY(16), game.tS2, PI, 1.5*PI)
	game.ctx.stroke();
	game.ctx.beginPath();
	game.ctx.arc(centerX(23), centerY(18), game.tS2, PI/2, PI)
	game.ctx.stroke();



	game.ctx.beginPath()
	game.ctx.lineWidth = 5;
	game.ctx.strokeStyle = "#ffb8de";
	game.ctx.moveTo(posX(13), centerY(12) + game.tS2 / 2);
	game.ctx.lineTo(posX(15), centerY(12) + game.tS2 / 2);
	game.ctx.stroke()
}
