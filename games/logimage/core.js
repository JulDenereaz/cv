var mainLoop = false;
var stop = false;
var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;
var game = function(newG = true, size = $("input[type=range]").val(), grid = [], solutionGrid = [], timer = 0) {
	if(mainLoop) {
		window.cancelAnimationFrame(mainLoop);
	}
	var t = Date.now();
	game.size = size;
	game.timer = timer
	game.dimSq = 25;
	game.fill = 0.75;
	game.solutionGrid = solutionGrid;
	game.grid = grid;
	game.clicking = false;
	game.newSq = false;
	game.fillSq = false;
	game.started = false;

	game.direction = false;
	game.oldSquare = [];
	//GENERATE GRID
	if(newG) {
		for(i = 0; i < game.size; i++) {
			game.solutionGrid[i] = [];
			game.grid[i] = [];
			for(j = 0; j < game.size; j++) {
				game.solutionGrid[i][j] = Math.random() < game.fill ? true : false
				game.grid[i][j] = "empty";
			}

		}

	}
	//CREATE NUMBERS

	game.numbersLine = new Array(game.size);
	game.numbersLineT = new Array(game.size);
	game.numbersCol = new Array(game.size);
	game.numbersColT = new Array(game.size);
	var maxC = 0;
	var maxL = 0;
	for(i = 0; i < game.size; i++) {
		var countL = 0;
		var countC = 0;
		game.numbersLine[i] = new Array()
		game.numbersLineT[i] = new Array()
		game.numbersCol[i] = new Array()
		game.numbersColT[i] = new Array()
		for(j = 0; j < game.size; j++) {
			if(game.solutionGrid[i][j]) {
				countL ++;
			}else if(countL != 0) {
				game.numbersLine[i].push(countL);
				game.numbersLineT[i].push(false);
				countL = 0;
			}
			if(j == game.size - 1 && countL != 0) {
				game.numbersLine[i].push(countL);
				game.numbersLineT[i].push(false);
				countL = 0;
			}



			if(game.solutionGrid[j][i]) {
				countC ++;
			}else if(countC != 0) {
				game.numbersCol[i].push(countC);
				game.numbersColT[i].push(false);
				countC = 0;
			}
			if(j == game.size - 1 && countC != 0) {
				game.numbersCol[i].push(countC)
				game.numbersColT[i].push(false)
				countC = 0;
			}

		}
		game.numbersCol[i] = game.numbersCol[i].reverse();
		game.numbersColT[i] = game.numbersColT[i].reverse();
		game.numbersLine[i] = game.numbersLine[i].reverse();
		game.numbersLineT[i] = game.numbersLineT[i].reverse();
		if(game.numbersCol[i].length > maxC) {
			maxC = game.numbersCol[i].length
		}
		if(game.numbersLine[i].length > maxL) {
			maxL = game.numbersLine[i].length
		}
	}


	game.win = function() {
		if(game.grid.equals(game.solutionGrid)) {
			game.ctx.font = "bold 50px Arial"
			game.ctx.textAlign = "center";
			game.ctx.fillStyle = "green"
			game.ctx.fillText("WIN", (game.dimX - game.maxX) / 2 + game.maxX, (game.dimY - game.maxY) / 2 + game.maxY)
			window.cancelAnimationFrame(mainLoop);
		}
	}

	//CREATE CANVAS
	game.maxX = maxL * 25
	game.maxY = maxC * 25
	game.dimX = game.dimSq * game.size + game.maxX
	game.dimY = game.dimSq * game.size + game.maxY
	$("#cvs").attr("width", game.dimX);
	$("#cvs").attr("height", game.dimY);
	if(game.maxY < 220){
		$("#cvs").css("top", 220 - game.maxY);
	}else {
		$("#cvs").css("top", 15);
	}
	if(game.maxX < 280) {
		$("#cvs").css("left", 280 - game.maxX);
	}else {
		$("#cvs").css("left", 15);
	}
	game.ctx = document.getElementById("cvs").getContext("2d");
	game.canvas = document.getElementById("cvs");
	save();
	document.addEventListener('mousedown', function(evt) {
		game.clicking = true;
		game.click();
	}, false);
	document.addEventListener('mouseup', function(evt) {
		game.clicking = false;
		game.clicked = false;
		game.direction = false;
	}, false);

	document.addEventListener('mousemove', function(evt) {
		game.mousePos = getMousePos(game.canvas, evt);
		if(game.clicking) {
			game.click();
		}
	}, false);

	game.click = function() {
		var x = Math.floor((game.mousePos.x - game.maxX)/game.dimSq);
		var y = Math.floor((game.mousePos.y - game.maxY)/game.dimSq);
		if(x >= 0 && x < game.size && y >= 0 && y < game.size) {
			if(!game.clicked) {
				if(game.grid[y][x] && game.grid[y][x] !== "empty") {
					game.grid[y][x] = false;
					game.fillSq = false;
				}else if(game.grid[y][x] !== "empty") {
					game.grid[y][x] = "empty";
					game.fillSq = "empty";
				}else{
					game.grid[y][x] = true;
					game.fillSq = true;
				}
				game.firstSquare = [x,y]
				game.clicked = true;
			}else {
				//if new square, if direction is not set, which direction to set
				if(!game.direction && (game.firstSquare[0]-x || game.firstSquare[1]-y)) {
					if(game.firstSquare[0]-x != 0) {
						game.direction = "x"
					}else if(game.firstSquare[1]-y != 0) {
						game.direction = "y"
					}
				}
				switch (game.direction) {
					case "y":
						game.grid[y][game.firstSquare[0]] = game.fillSq
						break;
					case "x":
						game.grid[game.firstSquare[1]][x] = game.fillSq
						break;
					default:

				}
			}
	//if click on numbers row
	}else if(x < 0 && y >= 0 && y < game.size){
		if(!game.clicked) {
			game.numbersLineT[y][-x-1] = !game.numbersLineT[y][-x-1]
			game.clicked = true;

		}
	//if click on numbers column
	}else if(y < 0 && x >= 0 && x < game.size) {
		if(!game.clicked) {
			game.numbersColT[x][-y-1] = !game.numbersColT[x][-y-1]
			game.clicked = true;

		}
	}
}


	game.draw = function() {


		mainLoop = window.requestAnimationFrame(game.draw);

		now = Date.now();
		elapsed = now - then;
		if (elapsed > fpsInterval) {
			then = now - (elapsed % fpsInterval);

			game.ctx.clearRect(0,0, game.dimX, game.dimY);
			game.delta = Date.now() - t;
			t = Date.now();
			game.timer += game.delta;
			var totalSeconds = Math.round(game.timer / 1000);
			$("#time").html(toTimeString(totalSeconds))
			if(totalSeconds > 10) {
				game.started = true;
			}
			//HIGHLIGHTED
			var x = Math.floor((game.mousePos.x - game.maxX)/game.dimSq);
			var y = Math.floor((game.mousePos.y - game.maxY)/game.dimSq);
			if(x >= 0 && x < game.size && y >= 0 && y < game.size) {
				game.ctx.fillStyle = "cyan";
				game.ctx.fillRect(0, game.maxY + 25 * y, game.maxX, 25);
				game.ctx.fillRect(game.maxX + 25 * x, 0, 25, game.maxY);
			}
			for(i = 0; i < game.size; i++) {
				if(i % 5 == 0) {
					game.ctx.strokeStyle = "orange";
					game.ctx.lineWidth = 5;
				}
				if(i % 5 != 0) {
					game.ctx.strokeStyle = "black";
					game.ctx.lineWidth = 1;

				}
				//Draw grid
				game.ctx.beginPath();
				game.ctx.moveTo(i * game.dimSq + game.maxX, game.maxY)
				game.ctx.lineTo(i * game.dimSq + game.maxX, game.dimY)
				game.ctx.stroke();
				game.ctx.beginPath();
				game.ctx.moveTo(game.maxX, i * game.dimSq + game.maxY)
				game.ctx.lineTo(game.dimX, i * game.dimSq + game.maxY)
				game.ctx.stroke();



				//Draw numbers
				game.ctx.font = "bold 20px Arial"
				game.ctx.textAlign = "center";
				for(j = 0; j < game.numbersLine[i].length; j++) {
					if(game.numbersLineT[i][j]) {
						game.ctx.fillStyle = "#EAEAEB"
					}else {
						game.ctx.fillStyle = "black"
					}
					game.ctx.fillText(game.numbersLine[i][j], game.maxX - j * 25 - 15, i * game.dimSq + game.maxY + 20)
				}
				for(j = 0; j < game.numbersCol[i].length; j ++) {
					if(game.numbersColT[i][j]) {
						game.ctx.fillStyle = "	#EAEAEB"
					}else {
						game.ctx.fillStyle = "black"
					}
					game.ctx.fillText(game.numbersCol[i][j], i * game.dimSq + game.maxX + 12.5, game.maxY - j * 25 - 10)
				}

				//DRAW CurrentGrid
				for(j = 0; j < game.size; j++) {
					if(game.grid[i][j] && game.grid[i][j] !== "empty") {
						game.ctx.fillStyle = "blue"
						game.ctx.fillRect(j * game.dimSq + game.maxX + 3, i * game.dimSq + game.maxY + 3, game.dimSq - 6, game.dimSq - 6)
					}else if(game.grid[i][j] !== "empty") {
						game.ctx.strokeStyle = "red";
						game.ctx.lineWidth = 3;
						game.ctx.beginPath();
						game.ctx.moveTo(j * game.dimSq + game.maxX + 3 , i * game.dimSq + game.maxY + 3)
						game.ctx.lineTo(j * game.dimSq + game.maxX + game.dimSq - 3, i * game.dimSq + game.maxY + game.dimSq - 3)
						game.ctx.stroke();
						game.ctx.beginPath();
						game.ctx.moveTo(j * game.dimSq + game.maxX + game.dimSq - 3, i * game.dimSq + game.maxY + 3)
						game.ctx.lineTo(j * game.dimSq + game.maxX + 3, i * game.dimSq + game.maxY + game.dimSq - 3)
						game.ctx.stroke();
					}
				}


			}
			game.ctx.beginPath();
			game.ctx.lineWidth = 3;
			game.ctx.strokeStyle = "orange";
			game.ctx.rect(game.maxX, game.maxY, game.dimX - game.maxX, game.dimY - game.maxY);
			game.ctx.stroke();


			game.win();
		}
	}

	startAnimating(15);

}


getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect(),
	scaleX = canvas.width / rect.width,
	scaleY = canvas.height / rect.height;
    return {
			x: (evt.clientX - rect.left) * scaleX,
			y: (evt.clientY - rect.top) * scaleY
		};
}

function gameSize(ele){
	$("#gameSize").html(ele.value)

}



Array.prototype.equals = function (array) {
    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});


var load = function() {
	var save = JSON.parse(localStorage.getItem("logimage_save"));
	if(typeof save.s === "null" || typeof save.s == "undefined"){
		return
	}else{
		//console.log(save)
		$("input[type=range]").val(save.s)
		$("#gameSize").html(save.s)
		game(false, save.s, save.g, save.sg, save.t);
		game.grid = save.g
		game.solutionGrid = save.sg
		$("#loader").css("display", "none")
	};
}



window.onbeforeunload = function(){
	save();
}


window.onload=function(){
	var save = JSON.parse(localStorage.getItem("logimage_save"));
	if(typeof save.s === "null" || typeof save.s == "undefined" || !save.c){
		$("#loader").css("display", "none")
	}
}


function save(){
	var save = {
		s: game.size,
		g: game.grid,
		sg: game.solutionGrid,
		t: game.timer,
		c: game.started
	};
	localStorage.setItem("logimage_save", JSON.stringify(save));
}


function toTimeString(seconds) {
  return (new Date(seconds * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
}


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    game.draw();
}
