/*
---------------
MADE BY COYOTTE
---------------

*/


//PATH Y: between 550 & 700

var game = function() {
	game.init = function() {
		game.ctx = document.getElementById("cvs").getContext("2d");
		game.canvas = document.getElementById("cvs");
		//Variables
		game.fpsTime = Date.now();
		game.mainClock = 500;
		game.FORMATNUMBER = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "De", "UnD", "DuD", "TrD", "QaD", "QiD", "SeD", "SpD", "OcD", "NoD", "Vi", "UnV"];
		game.mousePos = {};
		game.hover = "";
		game.hoverColor = "black"
		game.wave = {
			current: 1,
			state: false,
			max: 10
		}
		game.xp = {
			next: 10,
			cur: 3
		}
		
		game.archerAngle = -30;
		game.physics = {
			gravity: 0.1,
			drag: 1
		}
		game.upgrades = {
			"Archer": {
				power: 0,
				price: 10,
				attackSpeed: 1,
				damage: 50,
				precision: 0,
				projectile: "Arrow"
			},
			"Mage":{
				price: 25,
				attackSpeed: 1,
				damage: 10,
				splash: 200
			}
		}
		game.gold = 23123215;
		game.castle = {
			life: 100,
			maxLife: 100,
			wall: 300,
			regen: 0.01
			
		}
		game.keys = {u:false, d:false};
		game.ennemies = [];
		game.units = {};
		for(var key in game.upgrades) {
			game.units[key] = new Array();
		}
		game.projectiles = [];
		game.abilities = [];
		
		game.buttons = {};
		game.buttonUnits = {"Archer":"img/archer.png", "Mage":"img/mage.png"}
		//DRAWING
		game.draw = function() {
			game.ctx.clearRect(0,0,game.ctx.canvas.width, game.ctx.canvas.height);
			
			//UI
			game.ctx.fillStyle = "black";
			game.ctx.fillRect(5, 5, 500, 25)
			game.ctx.fillStyle = "red"
			game.ctx.fillRect(6, 6, 498*game.castle.life/game.castle.maxLife, 23)
			game.ctx.fillStyle = "black";
			game.ctx.fillRect(995, 5, 500, 25)
			game.ctx.font = "bold 30px Arial";
			game.ctx.fillStyle = "purple"
			game.ctx.fillRect(1494 - 498*game.xp.cur/game.xp.next, 6, 498*game.xp.cur/game.xp.next, 23)
			game.ctx.fillStyle = "orange"
			game.ctx.textAlign = "right";
			game.ctx.fillText("$ " + format(game.gold) + " ", 750, 25)
			game.ctx.textAlign = "center";
			game.ctx.fillText("|", 750, 25)
			game.ctx.textAlign = "left";
			game.ctx.fillText(" Wave : " + game.wave.current + "", 750, 25)
			game.ctx.font = "bold 20px Arial";
			game.ctx.fillStyle = "white";
			game.ctx.textAlign = "right";
			game.ctx.fillText(Math.round(game.castle.life) + "/" + game.castle.maxLife, 500, 25)
			
			for(var key in game.buttons) {
				if(game.buttons[key].state) {
					game.buttons[key].draw()
				}
				switch(game.buttons[key].id) {
					case ">":
						if(!game.wave.state) {
							if(game.wave.current < game.wave.max) {
								game.buttons[key].state = true;
							}else {
								game.buttons[key].state = false;
							}
						}else {
							game.buttons[key].state = false;
						}
						break;
					case "<":
						if(!game.wave.state) {
							if(game.wave.current > 1) {
								game.buttons[key].state = true;
							}else {
								game.buttons[key].state = false;
							}
						}else {
							game.buttons[key].state = false;
						}
						break;
				}
			}

			
			
			
			
			//CASTLE
			game.ctx.strokeStyle = "black";
			game.ctx.lineWidth = 4;
			game.ctx.fillStyle = "lightgrey"
			game.ctx.beginPath();
			// game.ctx.rect(50, 500, game.castle.wall - 50, 250)
			game.ctx.rect(game.castle.wall - 50, 625, 40, 75)
			game.ctx.rect(50, 625, 40, 75)
			game.ctx.rect(game.castle.wall, 475, 40, 75)
			game.ctx.rect(100, 475, 40, 75)
			game.ctx.fill();
			
			
			
			// game.ctx.moveTo(game.castle.wall - 25, 700);
			// game.ctx.lineTo(game.castle.wall - 25, 625);
			// game.ctx.lineTo(game.castle.wall + 25, 475);
			// game.ctx.lineTo(game.castle.wall + 25, 550);
			// game.ctx.lineTo(game.castle.wall - 25, 700);
			// game.ctx.rect(50, 625, game.castle.wall - 75, 75)
			// game.ctx.fill()
			
			game.ctx.stroke();
			game.ctx.closePath();
			
			game.castle.life += game.castle.regen
			if(game.castle.life > game.castle.maxLife) {
				game.castle.life = game.castle.maxLife
			}
			
			//ENNEMIES
			for(var i = 0; i < game.ennemies.length; i++) {
				game.ennemies[i].move();
				game.ennemies[i].draw();
				if(!game.ennemies[i].state && game.wave.state) {
					game.ennemies.splice(i, 1)
					i--;
				}
			};
			
			//DEFENDERS
			for(var key in game.units) {
				game.units[key].forEach(function(defender) {
					defender.attack();
					defender.draw();
				});
			}
			
			
			//PROJECTILES
			for(var i = 0; i < game.projectiles.length; i++) {
				game.projectiles[i].move();
				game.projectiles[i].draw();
				if(!game.projectiles[i].state) {
					game.projectiles.splice(i, 1)
					i--;
				}
				
			}

			
			//ANGLE OF ARCHER
			if(game.keys.u) {
				game.archerAngle -= 2;
			}
			if(game.keys.d) {
				game.archerAngle += 2;
			}
			if(game.archerAngle > 88) {
				game.archerAngle = 88;
			}else if(game.archerAngle < -88) {
				game.archerAngle = -88;
			}
			
			//FPS
			game.delta = Date.now() - game.fpsTime;
			game.fpsTime = Date.now();
			game.fps = 1/game.delta
			game.ctx.fillStyle = "black";
			game.ctx.font = "bold 10px Arial";
			game.ctx.textAlign = "left"
			game.ctx.fillText("FPS : " + Math.round(game.fps * 1000), 5, 795)
			
			
			if(game.castle.life <= 0) {
				game.castle.life = 0;
			}
			
			
			if(game.hover.length > 0) {
				var string = game.hover;
				game.ctx.fillStyle = "lightgrey";
				game.ctx.lineWidth = 2;
				game.ctx.strokeStyle = game.hoverColor;
				game.ctx.fillRect(game.mousePos.x + 10, game.mousePos.y - 10, string.length * 9, 20)
				game.ctx.beginPath()
				game.ctx.rect(game.mousePos.x + 10, game.mousePos.y - 10, string.length * 9, 20)
				game.ctx.stroke();
				game.ctx.font = "bold 15px Arial"
				game.ctx.textAlign = "center";
				game.ctx.fillStyle = game.hoverColor;
				game.ctx.fillText(string, game.mousePos.x + 10 + string.length * 9 / 2, game.mousePos.y + 5)
			}
			game.hover = "";
			game.hoverColor = "black"
			game.check();
			window.requestAnimationFrame(game.draw);
		};
		
		//EVENTS
		game.canvas.addEventListener('mousemove', function(evt) {
			game.mousePos = getMousePos(game.canvas, evt);
			var bool = false;
			for(var key in game.buttons) {
				if(game.buttons[key].cursorIn()){
					game.buttons[key].hover = true;
					bool = true
				}else {
					game.buttons[key].hover = false;
				}
			}
			if(bool) {
				$("#cvs").css("cursor", "pointer")
			}else{
				$("#cvs").css("cursor", "default")
			}
			
		}, false);
		game.canvas.addEventListener('click', function(evt) {
			game.mousePos = getMousePos(game.canvas, evt);
			var bool = false;
			for(var key in game.buttons) {
				if(game.buttons[key].cursorIn()){
					switch(game.buttons[key].id) {
						case "Next Wave":
							game.startNextWave(key);
							game.buttons[key].state = false;
							break;
						case "Restart Wave":
							game.restartWave(key);
							break;
						case "Archer":
							if(game.gold >= game.upgrades[key].price) {
								game.gold -= game.upgrades[key].price
								game.upgrades[key].price *= Math.pow(10, game.units[key].length + 1)
								game.units[key].push(new Defender(game.buttons[key].id))
							} // ADD ALERT FUNCTION TO ALERT THAT DONT HAVE ENOUGH MONEY
							break;
						case "Mage":
							if(game.gold >= game.upgrades[key].price) {
								game.gold -= game.upgrades[key].price
								game.upgrades[key].price *= Math.pow(10, game.units[key].length + 1)
								game.units[key].push(new Defender(game.buttons[key].id))
							} // ADD ALERT FUNCTION TO ALERT THAT DONT HAVE ENOUGH MONEY
							break;
						case "Start":
							game.startNextWave(key);
							game.buttons[key].state = false;
							break;
						case ">":
							if(!game.wave.state) {
								game.wave.current ++;						
							}
							break;
						case "<":
							if(!game.wave.state && game.wave.current > 1) {
								game.wave.current --;								
							}
							break;
					}
				}
			}
		}, false);
		$(document).keydown(function (e){
			if(e.keyCode == 40 || e.keyCode == 83){				//down
				game.keys.d = true;
				e.preventDefault();
			}else if(e.keyCode == 38 || e.keyCode == 87){		//up
				game.keys.u = true;
				e.preventDefault();
			}
		});
		$(document).keyup(function (e){
			if(e.keyCode == 40 || e.keyCode == 83){				//down
				game.keys.d = false;
				e.preventDefault();
			}else if(e.keyCode == 38 || e.keyCode == 87){		//up
				game.keys.u = false;
				e.preventDefault();
			}
		});
		
		//ADD SOMETHING TO LOAD SAVE
		
		
		
		//IF NO SAVE :
		game.buttons["Start"] = new Button(game.canvas.width / 2, 40, "Start");
		game.buttons["<"] = new Button(game.canvas.width / 2 - 80, 40, "<", "Previous Wave");
		game.buttons[">"] = new Button(game.canvas.width / 2 + 80, 40, ">", "Next Wave");		
		
		game.buttons["Archer"] = new ButtonBuyUnit(7, 40, "Archer");
		game.buttons["Mage"] = new ButtonBuyUnit(62, 40, "Mage");
		

		window.requestAnimationFrame(game.draw);
	}
	game.check = function() {
		if(!game.ennemies.length && game.castle.life > 0 && game.wave.state) {
			game.wave.state = false;
			if(game.wave.current == game.wave.max) {
				game.wave.max ++;
			}
			//ALERT WAVE PASSED
			game.gold += 20 * game.wave.current
			game.buttons["Start"].state = true;
			game.clean();
			game.castle.life = game.castle.maxLife;
		}else if(game.castle.life <= 0) {
			//ALERT LOST WAVE
			game.wave.state = false;
			game.buttons["Start"].state = true;
			game.clean();
			game.castle.life = game.castle.maxLife;
		}
	}
	
	
	game.startNextWave = function(i) {
		game.wave.state = true;
		for(var i = 0; i < game.wave.current * 2; i++) {
			game.ennemies.push(new Ennemy("Soldier"))
			game.ennemies.push(new Ennemy("Archer"))
			game.ennemies.push(new Ennemy("Giant"))
			
		}
	}
	game.restartWave = function() {
		
	}
	
	game.loseWave = function() {
		
	}
	game.clean = function() {
		game.projectiles.forEach(function(projectile){
			if(!projectile.isPlayer) {
				projectile.state = false;
			}
		});
		game.ennemies = [];
	}
	
}

function isPointInside(point, rect) {
	return(point.x > rect.x1 && point.x < rect.x2 && point.y > rect.y1 && point.y < rect.y2)
}


function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
	scaleX = canvas.width / rect.width,
	scaleY = canvas.height / rect.height;
    return {
			x: (evt.clientX - rect.left) * scaleX,
			y: (evt.clientY - rect.top) * scaleY
		};
}

function format(number) {
	var tier = Math.log10(number) / 3 | 0;
    if(tier == 0) return number.toFixed(2);
    var prefix = game.FORMATNUMBER[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    return scaled.toFixed(2) + prefix;
}

function getDeviation(nb, dev){
	if(Math.round((Math.random()))){
		return(nb = nb + Math.floor((Math.random() * dev) + 0))
	}else{
		return(nb = nb - Math.floor((Math.random() * dev) + 0))
	}
}
function getRandom(min, max) {
	return Math.floor(Math.random() * (max-min) + min)
}


$(document).ready(function(){

	game();
	game.init();
});