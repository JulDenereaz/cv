
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
	this.AIIndex = 1
	this.timer = 0
	this.difficulty = 5
	this.aiPlayed = false
	this.nCols = sizeGrid
	this.nRows = this.nCols -1
	this.state = false
	this.coins = []
	this.colScores = []
	this.score = [0, 0]
	this.winLength = 4
	this.won = false
	this.cols = [[204,0,0], [204,204,0]]
	this.backgroundColor = "#666666"
  this.size = wh/(this.nCols+1)
  this.padding = this.size / (this.nCols+3)
  this.paddingTop = 250
	createCanvas(wh, wh-this.size-this.padding + this.paddingTop)
	this.centerCoin = this.padding+this.size/2


	this.addCoin = function(col, row, turn, grid) {
		//return new grid with a value changed to turn at col row
		grid[col][row] = turn
		return(grid)
	}
	this.getValidCols = function(grid) {
		//return array of columns that have at least one empty spot
		v = []
		for (var i = 0; i < grid.length; i++) {
			if(grid[i][0] == -1) {
				v.push(i)
			}
		}
		return(v)
	}
	this.getRow = function(col, grid) {
		//return the row index of the first free space above a coin, or the bottom
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
		if(!this.aiPlayed) {
			this.timer = millis() + 500
			this.colScores  = this.iterate(this.copyGrid(), new Array(this.nCols).fill(0), 2, this.AIIndex)
			console.log(this.colScores)
			this.aiPlayed = true
		}else {
			//AI has played
			if(this.timer < millis()) {
				this.newCoin(indexOfMax(this.colScores))
				this.aiPlayed = false
			}
		}


	}
	this.isGridFull = function(grid) {
		return(this.getValidCols(grid).length == 0)
	}

	this.evaluate_window = function(array, turn, depth) {
		score = 0
		opposite = nextTurn(turn)
		if(array.count(turn) == 4){
			//Have to play that to win
			score += 350*depth
		}else if(array.count(turn) == 3 && array.count(-1) == 1) {
			score += 5*depth
		}else if(array.count(turn) == 2 && array.count(-1) == 2) {
			score += 2*depth
		}
		if(array.count(opposite) == 4){
			score += 200*depth
		}else if(array.count(opposite) == 3 && array.count(-1) == 1) {
			score += 6*depth
		}else if(array.count(opposite) == 2 && array.count(-1) == 2) {
			score += 3*depth

		}
		return(score)
	}



	this.getScoreCol = function(board, colN, player, depth) {
		score = 0
		if(colN == Math.floor(this.nCols/2)) {
			score += 2
		}
		//Score horizontal
		for (var col = 0; col < this.nCols -3; col++) {
			if(col <= colN && colN <= col+3) {
				for (var row = 0; row < this.nRows; row++) {
					row_array = [board[col][row], board[col+1][row], board[col+2][row], board[col+3][row]]
					score += this.evaluate_window(row_array, player, depth)
				}
			}
		}
		//score vertical
		for (var row = 0; row < this.nRows-3; row++) {
			row_array = [board[colN][row], board[colN][row+1], board[colN][row+2], board[colN][row+3]]
			score += this.evaluate_window(row_array, player, depth)
		}
		//Score positive sloped diagonal
		for (var col = 0; col < this.nCols-3; col++) {
			if(col <= colN && colN <= col+3) {
				for (var row = 0; row < this.nRows -3; row++) {
					diag_array = [board[col][row], board[col+1][row+1], board[col+2][row+2], board[col+3][row+3]]
					score += this.evaluate_window(diag_array, player, depth)
				}
			}
		}
		//Score negative sloped diagonal
		for (var col = 0; col < this.nCols-3; col++) {
			if(col <= colN && colN <= col+3) {
				for (var row = 0; row < this.nRows-3; row++) {
					diag_array2 = [board[col][row+3], board[col+1][row+2], board[col+2][row+1], board[col+3][row]]
					score += this.evaluate_window(diag_array2, player, depth)
				}
			}
		}

		return(score)
	}

	this.iterate = function(board, scores, depth, player) {
		if(!this.isGridFull(board)) {
			for(col = 0; col < this.nCols; col++) {
				if(board[col][0] == -1) {
					boardAI = this.addCoin(col, this.getRow(col, board), player, this.copyGrid(board))
					if(this.checkWin(boardAI)) {
						scores[col] += 5000
					}
					//scores[col] += this.getScoreCol(boardAI, col, player, depth)
					//player plays
					for(col2 = 0; col2 < this.nCols; col2++) {
						if(boardAI[col2][0] == -1) {
							boardP = this.addCoin(col2, this.getRow(col2, boardAI), nextTurn(player), this.copyGrid(boardAI))
							if(this.checkWin(nextTurn(player), boarP)) {
								if(col == col2)
							}
							//scores[col] += this.getScoreCol(boardP, col, nextTurn(player), depth)
							if(depth > 0) {
								scores = this.iterate(this.copyGrid(boardP), scores, depth-1, player)
							}
						}
					}
				}
			}
		}
		return(scores)


		// if(depth > 0) {
		// 	//computer play that column
		// 	b_copy = this.addCoin(col, this.getRow(col, board), player, this.copyGrid(board))
		// 	if(!this.isGridFull(b_copy)) {
		// 		for(col2 = 0; col2 < b_copy.length; col2++) {
		// 			if(b_copy[col2][0] == -1) {
		// 				//player hypothetically play col2 after AI played col
		// 				b_copy = this.addCoin(col2, this.getRow(col2, b_copy), nextTurn(player), this.copyGrid(b_copy))
		// 				if(!this.isGridFull(b_copy)) {
		// 					scores = this.algo(b_copy, newScore, depth, player)
		// 				}
		// 			}
		// 		}
		//
		// 	}
		// }

	}

	this.copyGrid = function(grid= this.grid) {
		nGrid = new Array(grid.length)
		for (var col = 0; col < grid.length; col++) {
			nGrid[col] = new Array(grid[col].length)
			for (var row = 0; row < grid[col].length; row++) {
				nGrid[col][row] = grid[col][row]
			}
		}
		return(nGrid)
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
		for (var j = 0; j<this.nCols-4 ; j++ ){
      for (var i = 0; i<this.nCols; i++){
				if (grid[i][j] == player && grid[i][j+1] == player && grid[i][j+2] == player && grid[i][j+3] == player){
					return true;
				}
      }
    }
    //HorizontalCheck
    for (var i = 0; i<this.nCols-3 ; i++ ){
      for (var j = 0; j<this.nCols-1; j++){
        if (grid[i][j] == player && grid[i+1][j] == player && grid[i+2][j] == player && grid[i+3][j] == player){
          return true;
        }
      }
    }
    // top right to bot left
    for (var i=3; i<this.nCols; i++){
      for (var j=0; j<this.nCols-4; j++){
        if (grid[i][j] == player && grid[i-1][j+1] == player && grid[i-2][j+2] == player && grid[i-3][j+3] == player) {
            return true;
				}
      }
    }
    // top left to bot right
    for (var i=3; i<this.nCols; i++){
      for (var j=3; j<this.nCols-1; j++){
        if (grid[i][j] == player && grid[i-1][j-1] == player && grid[i-2][j-2] == player && grid[i-3][j-3] == player) {
          return true;
				}
      }
    }
		return false;
	}
	this.init = function(nPlayers) {
		this.nPlayers = nPlayers
		this.lastMove = {col:this.nCols, nrow:this.nRows}
		if(!this.won) {
			this.turn = Math.floor(random() * 2)
		}else {
			this.won = false
		}
		this.grid = new Array(this.nCols)
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new Array(this.nRows).fill(-1)
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
