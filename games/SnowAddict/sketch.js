var game = {
	
};

function setup() {
	createCanvas(800, 800)
	game.player = new Player(400, 400)
	game.area = new Area()
	game.offSet = createVector(0, 0)
	game.limitResTrail = 5
	game.weather = new Weather()
}


function draw() {
	background(70);
	game.timeWarp = deltaTime/20
	game.weather.update()
	game.area.update()
	game.player.update()
	snowLoop()

	game.area.show()
	game.player.show()
	game.weather.show()

	stroke(0)
	strokeWeight(1)
	noFill()
	text(Math.round(frameRate()), 25, 25)

}


function snowLoop() {
	//add weather condition modificator
	game.area.snowDepth + game.snowStrength < game.area.maxSnowDepth ? game.area.snowDepth += game.snowStrength : game.area.snowDepth = game.area.maxSnowDepth
	game.area.trail.forEach((tr, i) => {
		tr.snowDepth += game.snowStrength*game.timeWarp
	});

}
