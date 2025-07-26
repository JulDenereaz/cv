let game = {
	ui: {
		fireRatePerc:100
	},
	weapons: {
		G17: {
			maxVel:50,
			minVel:10,
			drag:0.97,
			color:'gold',
			recoilForce:1,
			automatic:false,
			fireRate: 150,
			nBullets:1,
			damage:10,
			knockback:0,
			reloadTime: 700,
			magasin: 17,
			precision: 0.15,
			ammoType:'pistol',
			weight:0.95,
			draw: function() {
				fill('white')
				stroke('black')
				rect(0, 0, 15, 5)
			}
		},
		M16: {
			maxVel:75,
			minVel:10,
			drag:0.99,
			color:'gold',
			recoilForce:2,
			nBullets:1,
			automatic:true,
			fireRate: 70,
			knockback:0,
			damage:25,
			reloadTime: 1200,
			magasin: 35,
			precision: 0.08,
			ammoType:'assaultrifle',
			weight:0.8,
			draw: function() {
				fill('black')
				stroke('black')
				rect(0, 0, 40, 5)
			}
		},
		Shotgun: {
			maxVel:90,
			minVel:10,
			drag:0.95,
			color:'gold',
			nBullets:15,
			recoilForce:15,
			knockback:1,
			automatic:false,
			fireRate: 800,
			damage:20,
			reloadTime: 1800,
			magasin: 7,
			precision: 0.3,
			ammoType:'shotgun',
			weight:0.8,
			draw: function() {
				fill('black')
				stroke('black')
				rect(0, 0, 35, 10)
			}
		}
	},
	particules: [],
	entities: [],
	enemies:[],
	walls:[],
	paused:false,
	res: {
		money:0,
		xp:0
	}
};

function setup() {
	createCanvas(800, 800)
	frameRate(100)
	game.dir = {up:createVector(0, 0), right:createVector(0, 0), bot:createVector(0, 0), left:createVector(0, 0)}
	game.player = new Rambo(createVector(width/2, height/2))
	game.shop = new Shop()
	// game.walls.push(new Wall(400, 250, 100, 50))
	// game.walls.push(new Wall(300, 650, 100, 50))
	game.walls.push(new Wall(0, -10, width, 10))
	game.walls.push(new Wall(-10, 0, 10, height))
	game.walls.push(new Wall(width, 0, 10, height))
	game.walls.push(new Wall(0, height, width, 10))

}


function draw() {
	background(70);
	game.timeWarp = deltaTime/20
	var i = game.entities.length
	while (i--) {
		game.entities[i].update()
		if (!game.entities[i].state) { 
			game.entities.splice(i, 1);
		}else {
			
			game.entities[i].draw()
		}
	}
	game.player.update()
	game.player.draw()
	game.walls.forEach(function(wall, index, object){
		wall.draw()
	});
	var i = game.enemies.length
	while (i--) {
		game.enemies[i].update()
		if (!game.enemies[i].state) { 
			game.enemies.splice(i, 1);
		}else {
			game.enemies[i].draw()
		}
	}
	var i = game.particules.length
	while (i--) {
		game.particules[i].update()
		if (!game.particules[i].state) { 
			game.particules.splice(i, 1);
		}else {
			game.particules[i].draw()
		}
	}

	if(game.shop.opened) {
		game.shop.draw()
	}
	if(game.enemies.length < 6) {
		game.enemies.push(new Enemy('normal', getFreeSpot(), 50, 450))
	}

	//UI
	push()
	stroke('white')
	strokeWeight(2)
	noFill()
	rect(5, height-15, 100, 10)
	fill('white')
	rect(5, height-15, game.ui.fireRatePerc, 10)
	strokeWeight(1)
	text(Math.round(frameRate()), 5, 15)
	text(game.player.getCurrentWeapon(), 5, height-40)

	//bottom right
	textAlign(RIGHT)

	fill('red')
	rect()

	//Center bottom
	textAlign(CENTER)
	fill('white')
	text('Secondary (2): ' + game.player.equipped['secondary'], width/2, height-15)
	text('Primary (1): ' + game.player.equipped['primary'], width/2,  height-30)

	//left bottom
	textAlign(RIGHT)
	text(game.player.getCurrentAmmoStock(), 105, height-25)
	textAlign(LEFT)
	if(game.player.getCurrentMagasin()/game.weapons[game.player.getCurrentWeapon()].magasin<0.2) {
		fill('red')
		stroke('red')
	}
	text(game.player.getCurrentMagasin() + " / " + game.weapons[game.player.getCurrentWeapon()].magasin, 5, height-25)
	if(!game.player.reloading && game.player.getCurrentMagasin() == 0) {
		textSize(25)
		fill('red')
		stroke('red')
		textAlign(CENTER)
		text('Reload (R)', width/2, height-50)
	}
	if(game.player.reloading) {
		textSize(25)
		fill('green')
		stroke('green')
		textAlign(CENTER)
		text('Reloading...', width/2, height-50)
	}
	pop()

}



function keyPressed() {
	switch (keyCode) {
		case 87:
			game.dir.up = createVector(0, -1)
			break;
		case 68:
			game.dir.right = createVector(1, 0)
			break;
		case 83:
			game.dir.down = createVector(0, 1)
			break;
		case 65:
			game.dir.left = createVector(-1, 0)
			break;
		case 49:
			game.player.switch('primary')
			break;
		case 50:
			game.player.switch('secondary')

			break;
		case 82:
			game.player.reload()
			break;
		case 66: //B for shop
			game.shop.toggle()
		default:
			break;
	}
	return false; // prevent any default behaviour
}
function keyReleased() {
	switch (keyCode) {
		case 87:
			game.dir.up = createVector(0, 0)
			break;
		case 68:
			game.dir.right = createVector(0, 0)
			break;
		case 83:
			game.dir.down = createVector(0, 0)
			break;
		case 65:
			game.dir.left = createVector(0, 0)
			break;

		default:
			break;
	}
	return false; // prevent any default behaviour
}


function mousePressed() {
	if(mouseButton === LEFT && !game.player.shot) {
		game.shooting = true
	}
}
function mouseReleased() {
	if(mouseButton === LEFT) {
		game.shooting = false
	}
}


function getIntersection(pos, hit) {
	dist = Infinity
	best = false
	for (const side in hit) {
		if(hit[side].x || hit[side].y) {
			newDist = Math.hypot(hit[side].x-pos.x, hit[side].y-pos.y)	
			if(dist > newDist) {
				best = side
				dist = newDist
			}
		}

	}
	return(createVector(hit[best].x, hit[best].y))
}

function outOfBounds(pos) {
	return(!collidePointRect(pos.x, pos.y, 0, 0, width, height))
}

function inteceptCircleLineSeg(line, circle){
    var a, b, c, d, u1, u2, ret, retP1, retP2, v1, v2;
    v1 = {};
    v2 = {};
    v1.x = line.p2.x - line.p1.x;
    v1.y = line.p2.y - line.p1.y;
    v2.x = line.p1.x - circle.center.x;
    v2.y = line.p1.y - circle.center.y;
    b = (v1.x * v2.x + v1.y * v2.y);
    c = 2 * (v1.x * v1.x + v1.y * v1.y);
    b *= -2;
    d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius));
	if(isNaN(d)){ // no intercept
        return [];
    }
    u1 = (b - d) / c;  // these represent the unit distance of point one and two on the line
    u2 = (b + d) / c;    
    retP1 = {};   // return points
    retP2 = {}  
    ret = []; // return array
    if(u1 <= 1 && u1 >= 0){  // add point if on the line segment
        retP1.x = line.p1.x + v1.x * u1;
        retP1.y = line.p1.y + v1.y * u1;
        ret[0] = createVector(retP1.x, retP1.y);
    }
    if(u2 <= 1 && u2 >= 0){  // second add point if on the line segment
        retP2.x = line.p1.x + v1.x * u2;
        retP2.y = line.p1.y + v1.y * u2;
        ret[ret.length] = createVector(retP2.x, retP2.y);
    }       
    return ret;
}


class Shop {
	constructor() {
		this.opened = false

	}

	toggle() {
		this.opened = !this.opened
		game.paused = !game.paused
	}


	draw() {
		push()
		fill(200, 200, 200)
		rect(50, 50, width-100, height-100)
		pop()
	}
}