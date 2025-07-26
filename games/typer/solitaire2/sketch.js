var suits = ["H", "C", "D", "S"];
var ids = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"];
var imgs = {};
var deck = [];
var cards = [];
var cols = [[], [], [], [], [], [], []];
var up = [[], [], [], []];
var endAnim = [];
var dragging = false;
var mouseClicked = false;
var dim;
var draggedCards = [];
var doubleClickTime;
var doubleClick = false;
var pad = 30;
var started = false;
var highScore = 0;


var score = 0;
var timer = 0;
var won = false;
var anim = false;
var t;
var c = 0;


var padding, offSet;

function setup() {
	padding = createVector(pad, pad);
	dim = createVector(130, 180);
	if(padding.y * 25 + dim.y * 2 < windowHeight) {
		createCanvas(padding.x * 14 + dim.x * 7, padding.y * 25 + dim.y * 2);
	}else {
		createCanvas(padding.x * 14 + dim.x * 7, windowHeight - 30);
	}
	for(var i = 0; i < suits.length; i ++) {
		for(var j = 0; j < ids.length; j ++) {
			imgs[ids[j] + suits[i]] = loadImage("img/" + ids[j] + suits[i] + ".png");
		}
	}
	var sa = JSON.parse(localStorage.getItem("solitaire_hs"));
	if(sa !== undefined && sa !== null) {
		highScore = sa.hs;
	}
	deck = newDeck();
	newGame();
}

function newGame() {
	deck = newDeck();
	anim = false;
	won = false;
	dragging = false;
	started = false;
	score = 0;
	timer = 0;
	c = 0;
	cards = [];
	cols = [[], [], [], [], [], [], []];
	up = [[], [], [], []];
	deck = shuffleArray(deck);
	deal();
	
}

function draw() {
	if(!won) {
		background(0, 128, 0);
		noFill();
		stroke(0);
		rect(padding.x, padding.y, dim.x, dim.y, 10);
		for(var i = 0; i < cols.length; i ++) {
			rect(padding.x * (i * 2 + 1) + dim.x * i, dim.y + padding.y * 3, dim.x, dim.y, 10);
		}
		for(var i = 0; i < up.length; i ++) {
			rect(padding.x * (i * 2 + 7) + dim.x * (i + 3), padding.y, dim.x, dim.y, 10);
			for(var j = 0; j < up[i].length; j ++) {
				if(j >= 1) {
					up[i][j].pos.x = up[i][j - 1].pos.x - 0.5
					up[i][j].pos.y = up[i][j - 1].pos.y - 0.5
				}
				up[i][j].show();
			}
		}
		drag();
		releaseMouse();
		//UNFLIPPED CARDS
		if(cards.length >= 1) {
			cards[0].pos = createVector(padding.x * 3 + dim.x * 3 / 2, padding.y + dim.y / 2)
		}
		for(var i = 0; i < cards.length; i ++) {
			if(i >= 1) {
				cards[i].pos.x = cards[i - 1].pos.x - 0.5
				cards[i].pos.y = cards[i - 1].pos.y - 0.5
			}
			cards[i].show();
		}


		//CARDS STILL IN DECK
		deck[0].pos = createVector(padding.x + dim.x / 2, padding.y + dim.y / 2)
		for(var i = 0; i < deck.length; i ++) {
			if(i >= 1) {
				deck[i].pos.x = deck[i - 1].pos.x - 0.5
				deck[i].pos.y = deck[i - 1].pos.y - 0.5
			}
			deck[i].show();
		}
		//loop through cols
		for(var i = 0; i < cols.length; i ++) {
			//loop through lines
			for(var j = 0; j < cols[i].length; j ++) {
				if(!cols[i][j].flip && j !== cols[i].length - 1) {
					cols[i][j].behind = true;
				}else {
					cols[i][j].behind = false;
				}
				cols[i][j].show()
			}
		}
		draggedCards.reverse()
		for(var i = 0; i < draggedCards.length; i ++) {
			draggedCards[i].update();
			draggedCards[i].show()
		}
		draggedCards.reverse()
	}
	
	
	if(won) {
		for(var i = 0; i < endAnim.length; i ++) {
			endAnim[i].update();
			endAnim[i].show();
		}
		if(millis() - t > 3000 && up[c].length >= 1) {
			current = up[c].pop();
			endAnim.push(current);
			current.gravity = 0.5;
			current.applyForce(createVector(random([-8, -7, -6, -5, -4, -3, -2, -1, 1, 2]), random(-14, -3)));
			t = millis();
			if(c == 3) {
				c = 0;
			}else {
				c++;
			}
		}
	}
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
	if(score < 0) {
		score = 0;
	}
	if(!started) {
		timer = millis();
	}
	if(!won) {
		text("Time : " + msToTime(millis() - timer), width- 400, height - 4)
	}
	text("Score : " + score, width - 2, height - 4);
	text("High Score : " + highScore, width - 200, height - 4);
	textAlign(LEFT);
	text("For new game, press Space", 2, height - 4);
	mouseClicked = false;
	win();
	
}

function newDeck() {
	var c = [];
	for(var i = 0; i < suits.length; i ++) {
		for(var j = 0; j < ids.length; j ++) {
			c.push(new Card(i, j));
		}
	}
	c = shuffleArray(c);
	return(c);
}

function mousePressed() {
	if(!started) {
		started = true;
		timer = millis();
	}
	if(!anim) {
		//EMPTY COL
		for(var i = 0; i < cols.length; i ++) {
			var current = cols[i][cols[i].length - 1];
			if(cols[i].length >= 1 && current.flip && current.mouseInside()) {
				current.flip = false;
				score += 5;
			}
		};


		//DOUBLE CLICK
		if(doubleClick) {
			doubleClick = false;
		}
		if(!doubleClick && millis() - doubleClickTime < 250) {
			var current = cards[cards.length - 1];
			if(cards.length >= 1 && current.mouseInside()) {
				var test = assocUp(current.id, current.suit)
				if(test[0]) {
					current.pos = getPosUp(test[1]);
					up[test[1]].push(cards.pop());
					score += 10;
				}
			}
			for(var i = 0; i < cols.length; i ++) {
				var current = cols[i][cols[i].length - 1];
				if(cols[i].length >= 1 && current.mouseInside()) {
					var test = assocUp(current.id, current.suit)
					if(test[0]) {
						current.pos = getPosUp(test[1]);
						up[test[1]].push(cols[i].pop());
						score += 10;
					}
				}
			}
			doubleClick = true;


		}
		if(!doubleClick) {
			doubleClickTime = millis();
		}

		//NEW CARDS FROM DECK
		var fc = deck[deck.length - 1];
		if(fc.mouseInside() && fc.suit !== null) {
			fc.pos.x += dim.x + 2 * padding.x
			fc.flip = false;
			cards.push(deck.pop());
			if(!deck.length) {
				deck.push(new Card(null, 0))
			}
		}else if(fc.mouseInside() && fc.suit === null) {
			deck.pop();
			deck = reverse(cards);
			cards = [];
			score -= 100;
			for(var i = 0; i < deck.length; i ++) {
				deck[i].pos.x = deck[i].pos.x - dim.x - padding.x * 2;
				deck[i].flip = true;
			}
		}
		
		
		mouseClicked = true;
	}else if(won){
		newGame();
	}
	return false;
}

function drag() {
	if(!anim && !doubleClick && mouseClicked && mouseIsPressed && !dragging) {
		var bool = false;
		for(var i = 0; i < cols.length; i ++) {
			for(var j = 0; j < cols[i].length; j ++) {
				current = cols[i][j];
				if(!bool && !current.flip && current.mouseInside()) {
					bool = true;
					dragging = true;
					for(var c = j; c < cols[i].length; c ++) {
						current = cols[i][c];
						current = select(current, i);

					}
					while(cols[i].length != j) {
						draggedCards.push(cols[i].pop());
					}
				}
			}
		}
		current = cards[cards.length - 1];
		if(!bool && cards.length >= 1 && !current.flip && current.mouseInside()) {$
			bool = true;
			dragging = true;
			current = select(current, "cards")
			draggedCards.push(cards.pop())
		}
		if(!bool) {
			for(var i = 0; i < up.length; i ++) {
				current = up[i][up[i].length - 1];
				if(up[i].length >= 1 && !current.flip && current.mouseInside()) {
					dragging = true;
					current = select(current, "up");
					draggedCards.push(up[i].pop());

				}
			}
		}
	}
}

function releaseMouse() {
	if(!mouseIsPressed || !focused) {
		if(!doubleClick && dragging && draggedCards.length >= 1) {
			dragging = false;
			var current = draggedCards[draggedCards.length - 1];
			for(var i = 0; i < draggedCards.length; i ++) {
				draggedCards[i].selected = false;
			}
			var bool = false;
			for(var i = 0; i < cols.length; i ++) {
				//CASE IF KNIGHT IN EMPTY POSITION
				var pos = getPosCols(i, 0);
				if(!bool && cols[i].length == 0 && current.id == ids.length - 1 && collidePointRect(current.mouseP.x, current.mouseP.y, pos.x - dim.x / 2, pos.y - dim.x / 2, dim.x, dim.y)) {
					bool = true;
				}
				if(cols[i].length >= 1) {
					var c2 = cols[i][cols[i].length - 1];
					//CASE IF CARDS ON ANOTHER CARD
					if(!bool && i != current.oldIndex) {
						if(collidePointRect(current.mouseP.x, current.mouseP.y, c2.pos.x - dim.x / 2, c2.pos.y - dim.y / 2, dim.x, dim.y) && association(current.id, c2.id, current.suit, c2.suit)) {
							bool = true;
							if(current.oldIndex == "cards") {
								//WASTE TO TABLEAU
								score += 5;
							}else if(current.oldIndex == "up") {
								//FONDATION TO TABLEAU
								score -= 15;
							}
						}
					}
				}
				//MATCH WITH A CARD, DROP ALL CARDS
				if(bool) {
					var l = draggedCards.length - 1;
					while(draggedCards.length > 0){
						current = draggedCards[l];
						current.pos = getPosCols(i, cols[i].length);
						cols[i].push(draggedCards.pop());
						l--;
					}
				}
			}
			//NO MATCH, RETURN TO BEGINNING
			if(!bool) {
				var l = draggedCards.length - 1;
				while(draggedCards.length > 0){
					current = draggedCards[l];
					current.pos = createVector(current.oldPos.x, current.oldPos.y);
					if(current.oldIndex == "cards") {
						cards.push(draggedCards.pop());
					}else if(current.oldIndex == "up") {
						var index = assocUp(current.id, current.suit);
						up[index[1]].push(draggedCards.pop());
					}else{
						cols[current.oldIndex].push(draggedCards.pop());
					}
					l--;
				}
			}
		}
		
	}
}

function getPosUp(i) {
	var x = padding.x * (i * 2 + 7) + dim.x * (i + 3) + dim.x / 2;
	var y = padding.y + dim.y / 2;
	
	return(createVector(x, y));
}

function getPosCols(i, j) {
	var x = padding.x * (i * 2 + 1) + dim.x / 2 + dim.x * i;
	var y = dim.y * 3 / 2 + padding.y * 3 + padding.y * j
	
	return(createVector(x, y))
}

function deal() {
	for(var j = 0; j < cols.length; j++) {
		for(var i = j; i < cols.length; i ++) {
			var card = deck.pop();
			card.pos = getPosCols(i, j);
			cols[i].push(card);
			
		}
		cols[j][cols[j].length - 1].flip = false;	
	}
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function association(id1, id2, su1, su2) {
	//id1 => card being dropped on the id2 card
	if(id2 - id1 !== 1) {
		return false;
	}
	if(Math.abs(su1 - su2) == 1 || Math.abs(su1 - su2) == 3) {
		return true
	}	
	return false;
}

function assocUp(id, su) {
	for(var i = 0; i < up.length; i ++) {
		if(up[i].length == 0 && id == 0) {
			return([true, i])
		}
		
		var current = up[i][up[i].length - 1];
		if(up[i].length >= 1 && id - current.id == 1 && su == current.suit) {
			return([true, i])
		}
	}
	
	return([false]);
}

function win() {
	for(var i = 0; i < up.length; i ++) {
		if(up[i].length !== 13) {
			return(false);
		}
	}
	
	won = true;
	anim = true;
	//bonus score:
	var totalSeconds = (millis() - timer) / 1000
	if(totalSeconds >= 30) {
		score += Math.round(700000 / totalSeconds);
	}
	if(score > highScore) {
		highScore = score;
	}
	var sa = {
		hs: highScore
	}
	localStorage.setItem("solitaire_hs", JSON.stringify(sa));
	
	
	current = up[c].pop();
	endAnim.push(current);
	current.gravity = 0.5;
	current.applyForce(createVector(random([-6, -5, -4, -3, -2, -1, 1, 2]), random(-10, -3)));
	c++;
	t = millis();
	
	
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

function keyPressed() {
	if(keyCode == 32) {
		newGame();
	}
}

function select(card, oldIndex) {
	card.selected = true;
	card.mouseP = createVector(mouseX, mouseY);
	card.oldPos = createVector(card.pos.x, card.pos.y);
	card.oldIndex = oldIndex;
	return(card)
}