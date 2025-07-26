game = {
	suits: ["C", "H", "S", "D"],
	ids: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"],
	deck:[[],[]],
	cols: [[],[],[],[],[],[],[]],
	sorted: [[],[],[],[]],
	selected: [],
	endAnim: [],
	old: ['', 0],
	score:0,
	highScore:10,
	timer: 0,
	scale: 1,
	dimF: 226/314,
	sectors: [],
	dragging:false,
	state:false,
	dclick:false,
	won:false,
	gravity:0.5,
	counter:0,
	wonT:0
}


function setup() {
	createCanvas(1000, 800)
	game.imgs = {}
	game.padding = createVector(0.02*width, 0.01*width)
	cw = (width - 8 * game.padding.x) / 7
	game.dim = createVector(cw, cw/game.dimF)
	for (var i = 0; i < game.suits.length; i++) {
		for (var j = 0; j < game.ids.length; j++) {
			game.imgs[game.ids[j] + game.suits[i]] = loadImage('img/' + game.ids[j] + "_" + game.suits[i] + '.png')
		}
	}
	var sa = JSON.parse(localStorage.getItem("solitaire_hs"));
	if(sa !== undefined && sa !== null) {
		game.highScore = sa.hs;
	}
}

function draw() {
	if(!game.won) {
		background(0, 128, 0);
		noFill()
		stroke(0)
		strokeWeight(1)
		rect(game.padding.x, game.padding.y, game.dim.x, game.dim.y, 10)
		for(var i = 4; i < 8; i++) {
			rect(game.padding.x*i + game.dim.x*(i-1), game.padding.y, game.dim.x, game.dim.y, 10)
		}
		for(var i = 1; i < 8; i++) {
			rect(game.padding.x*i + game.dim.x*(i-1), game.padding.y*2 + game.dim.y, game.dim.x, game.dim.y, 10)
		}
		fill(0, 200, 0)
		ellipse(game.padding.x + game.dim.x/2, game.padding.y + game.dim.y/2, game.dim.x/1.5, game.dim.x/1.5)
		fill(0, 128, 0)
		ellipse(game.padding.x + game.dim.x/2, game.padding.y + game.dim.y/2, game.dim.x/2, game.dim.x/2)


		if(game.state) {
			for (var i = 0; i < game.deck.length; i++) {
				for (var j = 0; j < game.deck[i].length; j++) {
					game.deck[i][j].show()

				}
			}
			for (var i = 0; i < game.sorted.length; i++) {
				for (var j = 0; j < game.sorted[i].length; j++) {
					game.sorted[i][j].show()
				}
			}
			for (var i = 0; i < game.cols.length; i++) {
				for (var j = 0; j < game.cols[i].length; j++) {
					game.cols[i][j].show()
				}
			}

			for (var i = 0; i < game.selected.length; i++) {
				game.selected[i].update('selected')
				game.selected[i].show()
			}
		}
	}

	//UI and score
	fill(200);
	noStroke();
	rect(0, height - 20, width, 20);
	stroke(0);
	strokeWeight(2)
	line(0, height - 20, width, height - 20)

	fill(0);
	noStroke();
	textAlign(RIGHT);
	textSize(16);
	textStyle(BOLD)
	if(game.score < 0) {
		game.score = 0;
	}

	if(!game.state) {
		game.timer = millis()
	}
	if(game.won) {
		text("Time : " + msToTime(game.timer), width- 400, height - 4)
	}else {
		text("Time : " + msToTime(millis() - game.timer), width- 400, height - 4)

	}
	text("Score : " + game.score, width - 2, height - 4);
	text("High Score : " + game.highScore, width - 200, height - 4);
	textAlign(LEFT);
	text("For new game, press Space", 2, height - 4);
	win()
}

function newGame() {
	game.won = false
	game.deck = [newDeck(), []]
	game.cols = [[],[],[],[],[],[],[]]
	game.sorted = [[],[],[],[]]
	game.endAnim = []
	game.timer = millis()
	game.score = 0
	distribute()
	t = millis()
	game.state = true
}

function win() {
	//only execute once, to check if win, and set score and highscore.
	if(!game.won) {
		for(var i = 0; i < game.sorted.length; i ++) {
			if(game.sorted[i].length !== 13) {
				return;
			}
		}
		game.won = true
		game.wonT = millis() - 3000
		var totalSeconds = (millis() - game.timer) / 1000
		if(totalSeconds >= 30) {
			game.score += Math.round(700000 / totalSeconds);
		}
		if(game.score > game.highScore) {
			game.highScore = game.score;
		}
		var sa = {
			hs: game.highScore
		}
		localStorage.setItem("solitaire_hs", JSON.stringify(sa));
	}else {
		if(millis()-game.wonT >= 3000) {
			game.wonT = millis()
			game.endAnim.push(game.sorted[game.counter].pop())
			game.endAnim[game.endAnim.length-1].applyForce(createVector(random([-6, -5, -4, -3, -2, -1, 1, 2]), random(-10, -3)));
			game.counter++;
			if(game.counter > 3) {
				game.counter = 0
			}
		}
		for (var i = 0; i < game.endAnim.length; i++) {
			game.endAnim[i].update('endAnim')
			game.endAnim[i].show()
		}
	}
}

function newDeck() {
	a = []
	for (var i = 0; i < game.suits.length; i++) {
		for (var j = 0; j < game.ids.length; j++) {
			a.push(new Card(j, i))
		}
	}
	return(shuffle(a))
}


function newCard() {
	game.deck[1].push(game.deck[0].shift())
	game.deck[1][game.deck[1].length-1].flip()

}
function update() {
	for (var i = 0; i < game.deck.length; i++) {
		for (var j = 0; j < game.deck[i].length; j++) {
			game.deck[i][j].update('deck', j, i)

		}
	}
	for (var i = 0; i < game.sorted.length; i++) {
		for (var j = 0; j < game.sorted[i].length; j++) {
			game.sorted[i][j].update('sorted', j, i)
		}
	}
	for (var i = 0; i < game.cols.length; i++) {
		counter = 0
		for (var j = 0; j < game.cols[i].length; j++) {
			if(!game.cols[i][j].flipped) {
				counter += 1
			}
			game.cols[i][j].update('col', j, i, counter)
		}
	}
}

function distribute() {
	for (var i = 0; i < game.cols.length; i++) {
		for (var j = 7-i; j < 8; j++) {
			game.cols[i].push(game.deck[0].shift())
		}
	}
	for (var i = 0; i < game.cols.length; i++) {
		game.cols[i][game.cols[i].length-1].flip()
	}
}

function sortCard(region, index) {
	for (var i = 0; i < game.sorted.length; i++) {
		//ACES
		if(game[region][index][game[region][index].length-1].id == 0 && game.sorted[i].length == 0) {
			game.sorted[i].push(game[region][index].pop())
			game.score += 10
			update()
			return
		//id + 1 && SAME SUIT
	}else if(game.sorted[i].length > 0 &&
		game[region][index][game[region][index].length-1].suit == game.sorted[i][game.sorted[i].length-1].suit &&
		game[region][index][game[region][index].length-1].id == game.sorted[i][game.sorted[i].length-1].id + 1) {
			game.sorted[i].push(game[region][index].pop())
			game.score += 10
			update()
			return
		}
	}


	game.dclick = false
}





function msToTime(duration) {
	var seconds = Math.round(duration / 1000) % 60;
	var minutes = Math.round(duration / 1000 / 60) % 60;
	var hours = Math.round(duration / 1000 / 60 / 60) % 24;
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
