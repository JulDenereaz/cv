class Impact {
    constructor(pos, angle, type) {
        this.pos = pos
        this.type = type
        this.life = millis() + 150
        this.angle = angle
        this.state = true
        this.vs = new Array(4).fill(0)
        switch (this.type) {
            case 'wall':
                for (let i = 0; i < this.vs.length; i++) {
                    this.vs[i] = {color:'black', speed:random(2, 10), pos:this.pos.copy(), a:random(this.angle-PI - 0.8, this.angle-PI + 0.8)}
                    
                }
                break;
            case 'enemy':
                for (let i = 0; i < this.vs.length; i++) {
                    this.vs[i] = {color:'red', speed:random(10, 25), pos:this.pos.copy(), a:random(this.angle - 0.3, this.angle + 0.3)}
                    
                }
                break;
            default:
                break;
        }

    }
    update() {
        if(game.paused) {
            this.life += deltaTime
            return
        }
        if(this.life <= millis()) {
            this.state = false
        }
        for (let i = 0; i < this.vs.length; i++) {
            this.vs[i].pos.add(p5.Vector.fromAngle(this.vs[i].a).mult(this.vs[i].speed).mult(game.timeWarp))
            
        }
            
    }
    draw() {
        push()
        for (let i = 0; i < this.vs.length; i++) {
            fill(this.vs[i].color)
            stroke(this.vs[i].color)
            ellipse(this.vs[i].pos.x, this.vs[i].pos.y, 5, 5)
        }
        
        pop()
    }
}

class Wall {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }
    draw() {
        push()
        noStroke()
        fill('white')
        rect(this.x, this.y, this.w, this.h)
        pop()
    }
}

class Douilles {
    constructor(pos, angle) {
        this.pos = pos
        this.angle = random(angle-0.8, angle+0.8)
        this.rotation = random(-0.3, 0.3)
        this.state = true
        this.speed = random(10, 15)
        this.timeLimit = millis() + 500
        this.vel = p5.Vector.fromAngle(this.angle+PI/2).mult(this.speed).mult(game.timeWarp)
    }
    update() {
        if(game.paused) {
            this.timeLimit += deltaTime
            return
        }
        this.pos.add(this.vel)
        this.vel.mult(0.8)
        this.angle += this.rotation

        if(this.timeLimit <= millis()) {
            this.state = false
        }
    }

    draw() {
        push()
        fill(240,200,0)
        stroke('black')
        rectMode(CENTER)
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        rect(0, 0, 8, 2)
        pop()
    }
}


class Blood {
    constructor(pos, n = 10) {
        this.pos = pos
        this.state = true
        this.timeLimit = millis() + 2000
        this.blood = new Array(n).fill(0)

        for (let i = 0; i < this.blood.length; i++) {
            this.blood[i] = {pos:createVector(random(this.pos.x - 15, this.pos.x + 15), random(this.pos.y -15, this.pos.y + 15)), size:random(1, 25)}
        }
    }a
    update() {
        if(game.paused) {
            this.timeLimit += deltaTime
            return
        }
        if(this.timeLimit <= millis()) {
            this.state = false
        }
    }
    draw () {
        push()
        fill(255, 0, 0, Math.round((this.timeLimit-millis())*255/2000))
        noStroke()
        for (let i = 0; i < this.blood.length; i++) {
            const element = this.blood[i];
            ellipse(element.pos.x, element.pos.y, element.size)
        }
        pop()
    }
}


class Bullet {
	constructor(type, pos, angle, damage) {
		this.type = type
		this.pos = pos
		this.state = true
        this.damage = damage
		this.angle = angle
		this.color = game.weapons[this.type].color
		this.maxVel = game.weapons[this.type].maxVel
        this.minVel = game.weapons[this.type].minVel
		this.drag = game.weapons[this.type].drag
		this.vel = p5.Vector.fromAngle(this.angle).setMag(this.maxVel)
		this.acc = createVector(0, 0)
	}

	applyForce(force) {
		this.acc.add(force)
	}
	update() {
        if(game.shop.opened) {
            return
        }
        this.oldPos = this.pos.copy()
		this.vel.add(this.acc)
		this.vel.limit(this.maxVel)
		this.pos.add(this.vel.copy().mult(game.timeWarp))
        this.collide()

		this.acc.mult(0)
		this.vel.mult(this.drag)
		if(outOfBounds(this.pos) || this.vel.mag() < this.minVel) {
			this.state = false
		}

	}
    collide() {
        for (let i = 0; i < game.walls.length; i++) {
            const wall = game.walls[i];
            let hit = collideLineRect(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y, wall.x, wall.y, wall.w, wall.h, true)
            if(hit.bottom.x || hit.top.x || hit.left.x || hit.right.x || hit.bottom.x || hit.top.y || hit.left.y || hit.right.y) { 
                game.entities.push(new Impact(getIntersection(game.player.gunPos, hit), this.angle, 'wall'))
                this.state = false
                return
            }
        }
        for (let i = 0; i < game.enemies.length; i++) {
            if(game.enemies[i].state) {
                const enemy = game.enemies[i];
                let hit = inteceptCircleLineSeg(
                    {
                        p2:{x:this.oldPos.x, y:this.oldPos.y}, 
                        p1:{x:this.pos.x, y:this.pos.y}
                    }, 
                    {
                        center:{x:enemy.pos.x, y:enemy.pos.y}, 
                        radius:enemy.diameter/2
                    }
                )
                if(hit.length > 0) { 
                    game.entities.push(new Impact(hit[0], this.angle, 'enemy'))
                    game.entities.push(new Blood(this.pos.copy(), 2))
                    this.state = false
                    game.enemies[i].life -= this.damage*(this.vel.mag()/game.weapons[this.type].maxVel)
                    if(game.enemies[i].life <= 0 ) {
                        game.enemies[i].die()
                    }
                    game.enemies[i].acc.add(p5.Vector.fromAngle(this.angle).mult(game.weapons[this.type].knockback))

                    return
                }
            }
        }
    }
	draw() {
		push()
		translate(this.pos.x, this.pos.y)
		rotate(this.angle)
		fill(this.color)
		stroke(this.color)
		rect(0, 0, 10, 2)
		pop()
	}
}

