game = {
	margin:20
}


function setup() {
	createCanvas(800, 800)

}

function draw() {
	background(0)
	drawUI()

}



function drawUI() {
	fill('blue')
	rect(game.margin, game.margin + 200, width-2*game.margin, height-2*game.margin-200)
}
