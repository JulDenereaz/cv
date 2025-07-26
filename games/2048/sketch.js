game = {
	size:4,
	grid:[],
	offX:25,
	offY:225,
	padding:15,

}



function setup() {
	createCanvas(650, 850)
	game.grid = new Array(game.size)
	for (var i = 0; i < game.grid.length; i++) {
		game.grid[i] = new Array(game.size).fill(0)
	}
	game.padding = 600/game.size*0.1
	game.rsize = (600-game.padding)/game.size - game.padding

	game.tileColor = [
		{n:2, c: "#776e65", b: "#eee4da"},
		{n:4, c: "#776e65", b:"#ede0c8"},
		{n:8, c: "#f9f6f2", b: "#f2b179"},
		{n:16, c: "#f9f6f2", b: "#f59563"},
		{n:32, c: "#f9f6f2", b: "#f67c5f"},
		{n:64, c: "#f9f6f2", b: "#f65e3b"},
		{n:128, c: "#f9f6f2", b: "#edcf72"},
		{n:256, c: "#f9f6f2", b: "#edcc61"},
		{n:512, c: "#f9f6f2", b: "#edc850"},
		{n:1024, c: "#f9f6f2", b: "#edc53f"},
		{n:2048, c: "#f9f6f2", b: "#edc22e"}
	]


	game.colors = [[],color(238,228,228), color(237,224,200)]
	game.colors = [[],color(238,228,228), color(237,224,200)]
	newCase()
	newCase()
}


function draw() {
		background(253,222,179)
		fill(150, 150, 150)
		noStroke()
		rect(game.offX, game.offY, 600, 600, 5)

		for (var x = 0; x < game.grid.length; x++) {
			for (var y = 0; y < game.grid[x].length; y++) {
				fill(204, 204, 204)
				rect(game.offX + getPos(x), game.offY + getPos(y), game.rsize, game.rsize, 5)
				if(game.grid[x][y]) {
					game.grid[x][y].draw()

				}
			}
		}

}


function keyPressed() {
	if(keyCode == 32) {
		//space bar, newGame
	}else if(keyCode == 87 || keyCode == UP_ARROW) {
		//UP

	}else if(keyCode == 68 || keyCode == RIGHT_ARROW) {
		//RIGHT

	}else if(keyCode == 83 || keyCode == DOWN_ARROW) {
		//DOWN

	}else if(keyCode == 65 || keyCode == LEFT_ARROW) {
		//LEFT
		for (var x = 0; x < game.grid.length; x++) {
			for (var y = 0; y < game.grid[x].length; y++) {
				if(game.grid[x][y]) {
					for (var i = 0; i < game.size; i++) {
						if(game.grid[i][y] == 0) {
							game.grid[x][y].n = createVector(i, y)
							game.grid[i][y] = game.grid[x][y]
							//add target of [x][y] is [i][y]
							game.grid[x][y] = 0
							i = game.size
						}else if(game.grid[i][y].val == game.grid[x][y].val) {
							game.grid[i][y].val += 1
							game.grid[x][y] = 0
							i = game.size
						}
					}
				}
			}
		}
	}
}




function newCase() {
	bool = true
	while(bool) {
		x = Math.floor((Math.random() * game.size))
		y = Math.floor((Math.random() * game.size))
		if(!game.grid[x][y]) {
			bool = false
			game.grid[x][y] = new Case(x, y)
		}
	}
}


function getPos(n) {
	return(n*game.rsize + n*game.padding + game.padding)
}
