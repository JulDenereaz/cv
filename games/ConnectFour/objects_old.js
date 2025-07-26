
Coin = function(col, row, player, color, size, padding, paddingTop) {
	this.pos = createVector(padding * 2 + (padding + size) * col, 0)
	this.vel = createVector(0, 0)
	this.acc = createVector(0, 0)
	this.gravity = createVector(0, 4)
	this.maxVel = 60
	this.player = player
	this.falling = true
	this.color = color
	this.maxY = (row+2)*padding + (row)*size + paddingTop
	this.draw = function() {
    fill.apply(null, this.color)
		ellipseMode(CORNER)
    ellipse(this.pos.x, this.pos.y, size)
	}

	this.update = function() {
		if(this.falling) {
			this.applyForce(this.gravity)
			this.vel.add(this.acc)
			this.vel.limit(this.maxVel)
			this.pos.add(this.vel)
			if(this.pos.y > this.maxY) {
				this.pos.y = this.maxY
				this.falling = false
			}
			this.acc.mult(0)
		}
	}

	this.applyForce = function(force) {
		this.acc.add(force)
	}
}



Board = function(wh, sizeGrid) {
	this.startScreen = true
	this.hover1 = false
	this.hover2 = false
	this.canvasSize = wh
	this.sizeGrid = sizeGrid
	this.state = false
	this.coins = []
	this.score = [0, 0]
	this.scoreAI = new Array(sizeGrid)
	this.won = false
	this.cols = [[204,0,0], [204,204,0]]
	this.backgroundColor = "#666666"
  this.size = wh/(this.sizeGrid+1)
  this.padding = this.size / (this.sizeGrid+3)
  this.paddingTop = 250
	createCanvas(wh, wh-this.size-this.padding + this.paddingTop)
	this.centerCoin = this.padding+this.size/2


	this.addCoin = function(col, row, turn, grid) {
		grid[col][row] = turn
		return(grid)
	}
	this.getRow = function(col, grid) {
		for (var row = grid[col].length; row >=0 ; row--) {
			if(grid[col][row] == -1) {
				return(row)
			}
		}
	}

	this.newCoin = function(col) {
		if(this.state && !this.won) {
			if(this.grid[col][0] == -1) {
				row = this.getRow(col, this.grid)
				this.grid = this.addCoin(col, row, this.turn, this.grid)
				this.coins.push(new Coin(col, row, this.turn, this.cols[this.turn], this.size, this.padding, this.paddingTop))
				this.lastMove = {col:col, row:row}
				if(this.checkWin(this.turn)) {
					this.won = true
					this.score[this.turn]++
				}
				this.turn == 0 ? this.turn = 1 : this.turn = 0
			}
		}
	}

	this.simulateGrid = function(col, turn, grid) {
		return(this.checkWin(turn, this.addCoin(col, this.getRow(col, grid), turn, grid)))
	}





	this.aiPlay = function() {
		x = Math.floor(random() * 7)
		this.scoreAI = new Array(this.sizeGrid).fill(0)
		for (var col = 0; col < this.grid.length; col++) {
			//Check if that column is playable
			if(this.grid[col][0] == -1) {
				if(this.simulateGrid(col, this.turn, this.copyGrid())) {
					this.scoreAI[col] += 1000
				//AI avoid player to win next turn
				}else {
					var turn = nextTurn(this.turn)
					if(this.simulateGrid(col, turn, this.copyGrid())) {
						this.scoreAI[col] += 900
					}
				}
			}
		}
		maxScoreIndexCol = this.scoreAI.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
		if(this.scoreAI[maxScoreIndexCol] > 0) {
			this.newCoin(maxScoreIndexCol)
		}else {

			this.newCoin(x)
		}
	}
	this.copyGrid = function() {
		grid = new Array(this.grid.length)
		for (var col = 0; col < grid.length; col++) {
			grid[col] = new Array(this.grid[col].length)
			for (var row = 0; row < this.grid[col].length; row++) {
				grid[col][row] = this.grid[col][row]
			}
		}
		return(grid)
	}

  this.update = function () {

		//update each coin in board
		if(this.state) {
			this.coins.forEach((coin, i) => {
				coin.update()
			});
		}
		if(this.nPlayers == 1 && this.turn == 1 && !this.won && this.state) {
			this.aiPlay()
		}

  }
	this.checkWin = function(player, grid = this.grid) {
		//verticalCheck
		for (var j = 0; j<this.sizeGrid-4 ; j++ ){
        for (var i = 0; i<this.sizeGrid; i++){
            if (grid[i][j] == player && grid[i][j+1] == player && grid[i][j+2] == player && grid[i][j+3] == player){
								return true;
            }
        }
    }
    //HorizontalCheck
    for (var i = 0; i<this.sizeGrid-3 ; i++ ){
        for (var j = 0; j<this.sizeGrid-1; j++){
            if (grid[i][j] == player && grid[i+1][j] == player && grid[i+2][j] == player && grid[i+3][j] == player){
                return true;
            }
        }
    }
    // ascendingDiagonalCheck
    for (var i=3; i<this.sizeGrid; i++){
        for (var j=0; j<this.sizeGrid-4; j++){
            if (grid[i][j] == player && grid[i-1][j+1] == player && grid[i-2][j+2] == player && grid[i-3][j+3] == player) {
                return true;
							}
        }
    }
    // descendingDiagonalCheck
    for (var i=3; i<this.sizeGrid; i++){
        for (var j=3; j<this.sizeGrid-1; j++){
            if (grid[i][j] == player && grid[i-1][j-1] == player && grid[i-2][j-2] == player && grid[i-3][j-3] == player) {
                return true;
							}
        }
    }
    return false;
	}
	this.init = function(nPlayers) {
		this.nPlayers = nPlayers
		if(!this.won) {
			this.turn = Math.floor(random() * 2)
		}else {
			this.won = false
		}
		this.grid = new Array(this.sizeGrid)
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(this.sizeGrid-1).fill(-1)
		}
		this.coins = []
		this.state = true
		this.startScreen = false
	}


  this.draw = function() {
		background(this.backgroundColor)

		if(this.state || this.won) {
			noFill()
			strokeWeight(this.padding/2)
			rectMode(CORNER)
			rect(this.padding, this.padding + this.paddingTop, width-2*this.padding, height-2*this.padding-this.paddingTop)
			this.coins.forEach((coin, i) => {
				coin.draw()
			});

			for (var col = 0; col < this.grid.length; col++) {
				for (var row = 0; row < this.grid[col].length; row++) {
					push()
					noStroke()
					translate(col*this.size+this.padding*(col+1), row*this.size+this.padding*(row+1)+this.paddingTop)
					fill(30, 30, 30, alpha = 100)
					beginShape()
					vertex(0, 0)
					vertex(this.size, 0)
					quadraticVertex(this.padding, this.padding, this.padding*2, this.size+this.padding*2)
					vertex(0, 0)
					endShape()
					fill('blue')
					beginShape()
					vertex(0, 0)
					vertex(this.centerCoin, 0)
					vertex(this.centerCoin, this.padding)
					quadraticVertex(this.padding+this.padding/2, this.padding+this.padding/2, this.padding, this.centerCoin)
					quadraticVertex(this.padding+this.padding/2, this.padding+this.size-this.padding/2, this.centerCoin, this.padding+this.size)
					quadraticVertex(this.padding+this.size-this.padding/2, this.padding+this.size-this.padding/2, this.padding+this.size, this.centerCoin)
					quadraticVertex(this.padding+this.size-this.padding/2, this.padding+this.padding/2, this.centerCoin, this.padding)
					vertex(this.centerCoin, 0)
					vertex(this.padding*2+this.size, 0)
					vertex(this.padding*2+this.size, this.padding*2+this.size)
					vertex(0, this.padding*2+this.size)
					endShape()
					pop()
				}
			}
			for (var col = 0; col < this.grid.length; col++) {
				for (var row = 0; row < this.grid[col].length; row++) {
					noFill()
					strokeWeight(this.padding/3)
					ellipseMode(CORNER)
					ellipse(col*this.size+this.padding*(col+2), row*this.size+this.padding*(row+2)+this.paddingTop, this.size)
				}
			}
			//draw button following mouse
			fill.apply(null, this.cols[this.turn])
			ellipseMode(CENTER)
			ellipse(mouseX, mouseY, this.size)

			push()
			translate(width/2, this.size/3)
			ellipseMode(CENTER)
			textAlign(CENTER, CENTER)
			textSize(this.size/3)
			fill.apply(null, this.cols[0])
			ellipse(-this.size/3, 0, this.size/3)
			text(this.score[0], -this.size/1.5, 0)
			fill.apply(null, this.cols[1])
			ellipse(this.size/3, 0, this.size/3)
			text(this.score[1], this.size/1.5, 0)
			fill(0)
			text('-', 0, 0)
			pop()
		}

		if(this.won && !this.coins[this.coins.length-1].falling) {
			this.state = false
			fill(this.cols[this.coins[this.coins.length-1].player])
			textSize(this.size/2)
			textAlign(CENTER, CENTER)
			if(this.grid[this.lastMove.col][this.lastMove.row] == 0) {
				text('Red Player wins !\n Space to play again', width/2, this.paddingTop/2)
			}else {
				text('Yellow Player wins !\n Space to play again', width/2, this.paddingTop/2)
			}
		}
		//draw buttons to say against AI or 2 players
		if(this.startScreen) {
			push()
			translate(this.canvasSize/2, this.canvasSize/2)
			// strokeWeight(this.padding/3)
			// fill.apply(null, this.cols[0])
			// ellipseMode(CENTER)
	    // ellipse(-this.padding-this.size, 0, this.size)
			//
			//
			// fill.apply(null, this.cols[1])
			// ellipseMode(CENTER)
	    // ellipse(this.padding+this.size, 0, this.size)

			fill(255)
			textAlign(CENTER, TOP)
			textSize(this.size)
			text('Connect Four', 0, -2*this.size)

			textSize(this.size/2)
			if(this.hover1) {
				fill('red')
			}
			text('1 Player', 0, 0)


			fill(255)
			if(this.hover2) {
				fill('red')
			}
			text('2 Players', 0, this.size)


			pop()
		}
  }
}
