game = {

}



function setup() {
	createCanvas(800, 800)
	game.player = new Player()
}



function draw() {
	background(0)

	if(keyIsDown(87)) {
		game.player.applyForce(createVector(0, -2))
	}
	if(keyIsDown(68)) {
		game.player.applyForce(createVector(2, 0))
	}
	if(keyIsDown(83)) {
		game.player.applyForce(createVector(0, 2))
	}
	if(keyIsDown(65)) {
		game.player.applyForce(createVector(-2, 0))
	}
	game.player.update()
	game.player.draw()

}
