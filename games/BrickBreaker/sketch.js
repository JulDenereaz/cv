let game = {
	timeWarp:0,
	bricks:[],
	balls:[],
	udpateBox: false
};

function setup() {
	createCanvas(1200, 1200)
	frameRate(100)
	game.dir = createVector(0, 0)
	game.paddle = new Paddle(width/2, height-10, 50, 5)
	game.hitBoxBricks = {
		pos: createVector(width, height),
		w:0,
		h:0
	}
	nrows = (height-75) / 5
	ncols = (width-10) / 10

	for (let row = 0; row < nrows; row++) {
		for (let col = 0; col < ncols; col++) {
			game.bricks.push(new Brick(col*8+5+col*2, row*4+5+row*1, 10, 10))
			
		}
		
	}
	updateHitBoxBricks()
	game.balls.push(new Ball(width/2, height-50, 10, 5))
	game.balls.push(new Ball(width/2, height-50, 10, 5))

	game.balls.push(new Ball(width/2, height-50, 10, 5))


}


function draw() {
	game.timeWarp = deltaTime/20
	if(keyIsDown(68) && keyIsDown(65)) {
		game.dir.set(0, 0)
	}else if(keyIsDown(68)) {
		game.dir.set(1, 0)
	}else if(keyIsDown(65)) {
		game.dir.set(-1, 0)
	}else {
		game.dir.set(0, 0)
	}

	background(70);
	game.paddle.update()
	game.paddle.show()

	var i = game.bricks.length
	while (i--) {
		game.bricks[i].update()
		if (!game.bricks[i].state) { 
			game.bricks.splice(i, 1);
		}else {
			game.bricks[i].show()
		}
	}
	
	if(game.udpateBox) {
		updateHitBoxBricks()
		game.udpateBox = false
	}

	var i = game.balls.length
	while (i--) {
		game.balls[i].update()
		if (!game.balls[i].state) { 
			game.balls.splice(i, 1);
		}else {
			game.balls[i].show()
		}
	}



}

function getTheta(brickpos, brickw, brickh, circlepos, circlevel) {
	var NearestX = Math.max(brickpos.x, Math.min(circlepos.x, brickpos.x + brickw));
	var NearestY = Math.max(brickpos.y, Math.min(circlepos.y, brickpos.y + brickh));
	var dist = createVector(circlepos.x - NearestX, circlepos.y - NearestY);
	var dnormal = createVector(- dist.y, dist.x);
	var normal_angle = atan2(dnormal.y, dnormal.x);
	var incoming_angle = atan2(circlevel.y, circlevel.x);
	var theta = normal_angle - incoming_angle;
	return(theta)
}


function updateHitBoxBricks() {
	game.hitBoxBricks = {
		pos: createVector(width, height),
		w:0,
		h:0
	}
	for (let i = 0; i < game.bricks.length; i++) {
		const brick = game.bricks[i];
		if(brick.pos.x < game.hitBoxBricks.pos.x) {
			game.hitBoxBricks.pos.x = brick.pos.x
		}
		if(brick.pos.y < game.hitBoxBricks.pos.y) {
			game.hitBoxBricks.pos.y = brick.pos.y
		}
		if(brick.pos.x - game.hitBoxBricks.pos.x + brick.w > game.hitBoxBricks.w) {
			game.hitBoxBricks.w = brick.pos.x - game.hitBoxBricks.pos.x + brick.w
		}
		if(brick.pos.y - game.hitBoxBricks.pos.y + brick.h > game.hitBoxBricks.h) {
			game.hitBoxBricks.h = brick.pos.y - game.hitBoxBricks.pos.y + brick.h		
		}
	}
}