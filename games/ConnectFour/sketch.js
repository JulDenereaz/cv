
let board



function setup() {
	newGame(2)
}

function draw() {
	board.update()
	board.draw()
}

function newGame() {
	board = new Board(800, 7)
}



function mouseClicked() {
	//cooldown not to fast
	i = Math.floor((mouseX-board.padding)/(board.size + board.padding))
	if(i >= 0 && i < board.nCols && (board.nPlayers == 2 || (board.nPlayers == 1 && board.turn == 0))) {
		board.newCoin(i)
	}
	//1Player
	if(board.startScreen && collidePointRect(mouseX, mouseY, 0, board.canvasSize/2, width, board.size/2)) {
		board.init(1)
	}
	//Player
	if(board.startScreen && collidePointRect(mouseX, mouseY, 0, board.canvasSize/2+board.size, width , board.size/2)) {
		board.init(2)
	}

}

function keyPressed() {
	if(keyCode == 32) {
		if(board.won) {
			board.init(board.nPlayers)
		}else {
			newGame(2)
		}
	}
}
function mouseMoved() {
	if(board.startScreen && collidePointRect(mouseX, mouseY, 0, board.canvasSize/2, width, board.size/2)) {
		board.hover1 = true
	}else{
		board.hover1 = false
	}
	//Player
	if(board.startScreen && collidePointRect(mouseX, mouseY, 0, board.canvasSize/2+board.size, width , board.size/2)) {
		board.hover2 = true
	}else {
		board.hover2 = false
	}
}

function nextTurn(t) {
	return((t+1)%2)
}
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

Array.prototype.count = function(num) {
	n = 0
	for (var i = 0; i < this.length; i++) {
		if(this[i] == num) {
			n++
		}
	}
	return(n)

}
