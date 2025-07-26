

let textures


function preload() {
	textures = loadImage("textures.png")

}

function setup() {
	createCanvas(800, 800)
	game = new Game(4732140, 500, 10, textures)
}


function draw() {
	background(70)
	game.update()
	game.draw()



	fill(255)
	textSize(10)
	textAlign(CENTER)
	text(Math.round(frameRate()), 15, 15)

}


function keyPressed() {
	switch (keyCode) {
		case 87:
			game.keyPr.up = true
			break;
		case 68:
			game.keyPr.right = true
			break;
		case 83:
			game.keyPr.down = true
			break;
		case 65:
			game.keyPr.left = true
			break;
		case 27:
			game.exit()
			break;
		default:
			break;
	}
	return false; // prevent any default behaviour
}
function keyReleased() {
	switch (keyCode) {
		case 87:
			game.keyPr.up = false
			break;
			case 68:
			game.keyPr.right = false
			break;
			case 83:
			game.keyPr.down = false
			break;
			case 65:
			game.keyPr.left = false
			break;

		default:
			break;
	}
	return false; // prevent any default behaviour
}


function easeLinear (t, b, c, d) {
    return c * t / d + b;
}


function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}


function round10(x) {
	return Math.ceil(x / 10) * 10;
}


function getTextureX(n) {
	return((n-1)%8*128)
}


function getTextureY(n) {
	return(Math.floor((n-1)/8)*128)
}


function randn_bm(min=0, max=100, skew=1) {
	let u = 0, v = 0;
	while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
	while(v === 0) v = Math.random()
	let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
	num = num / 10.0 + 0.5 // Translate to 0 -> 1
	if (num > 1 || num < 0) 
		num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range
	else{
		num = Math.pow(num, skew) // Skew
		num *= max - min // Stretch to fill range
		num += min // offset to min
	}
	return Math.round(num)
}


