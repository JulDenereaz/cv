
//INPUTS
function keyPressed() {
	if(keyCode == 32) {
		newGame();
    update()
	}
}

function mouseClicked() {
  if(game.state) {
    //double click
    if(millis() - t < 200) {
      t = 0
      game.dclick = true
    }else {
      t = millis()
      game.dclick = false
    }
		//deck clicking
  	if(collidePointRect(mouseX, mouseY, game.padding.x, game.padding.y, game.dim.x, game.dim.y)) {
      if(game.deck[0].length == 0) {
        game.deck[0] = game.deck[1]
        game.deck[1] = []
				game.score -= 100
        game.deck[0].forEach(function(card) {
          card.flip()
        })
      }else {
        newCard()

      }

      update()
  	}
		//click to flip cards
		for (var i = 0; i < game.cols.length; i++) {
			if(game.cols[i].length > 0 && collidePointRect(mouseX, mouseY, game.cols[i][game.cols[i].length-1].pos.x, game.cols[i][game.cols[i].length-1].pos.y, game.dim.x, game.dim.y)) {
				if(!game.cols[i][game.cols[i].length-1].flipped) {
					game.cols[i][game.cols[i].length-1].flip()
					game.score += 5
					update()
				}else if(game.dclick) {
					//double click on a card in cols
					sortCard('cols', i)
				}

			}
		}

    //double click on flipped newDeck
		if(game.dclick && game.deck[1].length > 0 && collidePointRect(mouseX, mouseY, game.padding.x*2+game.dim.x, game.padding.y, game.dim.x, game.dim.y)) {
			sortCard('deck', 1)
		}



  }
}


function mousePressed() {
  if(!game.dragging && game.state) {
    if(collidePointRect(mouseX, mouseY, game.padding.x*2+game.dim.x, game.padding.y, game.dim.x, game.dim.y) && game.deck[1].length > 0) {
      game.dragging = true
      game.selected.push(game.deck[1].pop())
      game.old = ['deck', 1]
			return
    }

    for (var i = 0; i < game.cols.length; i++) {
      for(var j = 0; j < game.cols[i].length; j++) {
        if(game.cols[i][j].flipped) {
          //if last of column
          if(j == game.cols[i].length-1 && collidePointRect(mouseX, mouseY, game.cols[i][j].pos.x, game.cols[i][j].pos.y, game.dim.x, game.dim.y)) {
            game.dragging = true
            game.selected.push(game.cols[i].pop())
            game.old = ['cols', i]
						return
          }else if(collidePointRect(mouseX, mouseY, game.cols[i][j].pos.x, game.cols[i][j].pos.y, game.dim.x, game.padding.y*3)) {
            game.dragging = true
            game.selected = game.cols[i].splice(-game.cols[i].length+j)
            game.old = ['cols', i]
						return
          }
        }

      }
    }
		//same for sorted cards to be able to take back some sorted card to the game

		for (var i = 0; i < game.sorted.length; i++) {

			if(collidePointRect(mouseX, mouseY, game.dim.x * 3 + game.padding.x * 4 + game.padding.x * i + game.dim.x * i, game.padding.y, game.dim.x, game.dim.y)) {
				game.dragging = true
				game.selected.push(game.sorted[i].pop())
				game.old = ['sorted', i]
			}
		}
  }


}

function mouseReleased() {
  if(game.dragging) {
		for (var i = 0; i < game.cols.length; i++) {
			if(game.cols[i].length > 0 && collidePointRect(mouseX, mouseY, game.cols[i][game.cols[i].length-1].pos.x, game.cols[i][game.cols[i].length-1].pos.y, game.dim.x, game.dim.y)) {
				if(game.cols[i][game.cols[i].length-1].id - game.selected[0].id == 1 && (game.selected[0].suit + game.cols[i][game.cols[i].length-1].suit) % 2 == 1) {
					game.cols[i] = game.cols[i].concat(game.selected.slice(0))
					game.selected = []
					game.dragging = false
					if(game.old[0] == "deck") {
						game.score += 5
					}else if(game.old[0] == 'sorted') {
						game.score -= 15
					}
					update()
					return
				}
			//king on empty spot
			}else if(game.cols[i].length == 0 && collidePointRect(mouseX, mouseY, game.padding.x + game.padding.x * i + game.dim.x * i, game.padding.y * 2 + game.dim.y, game.dim.x, game.dim.y)) {
				if(game.selected[0].id == 12) {
					game.cols[i] = game.cols[i].concat(game.selected.slice(0))
					game.selected = []
					game.dragging = false
					update()
					return
				}
			}

		}

		//release cards back to original location
		game[game.old[0]][game.old[1]] = game[game.old[0]][game.old[1]].concat(game.selected.slice(0))
    game.selected = []
    game.dragging = false
    update()
  }
}
