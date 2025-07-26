class Enemy {
    constructor(type, pos, minPV, maxPV) {
        this.type = type
        this.pos = pos
        this.life = random(50, 450)
        this.minPV = minPV
        this.maxPV = maxPV
        this.range = 10
        this.friction = 0.97
        this.maxLife = this.life
        this.diameter = map(this.life, this.minPV, this.maxPV, 20, 60)
        this.maxVel = map(this.life, this.minPV, this.maxPV, 2, 0.5)
        this.angle = 0
        this.knockback = false
        this.state = true
        this.path = [game.player.pos.copy()]
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
    }
    update() {
        if(game.paused) {
            return
        }
        this.angle = getAngleRad(this.pos, game.player.pos.copy())
        if(this.pos.dist(game.player.pos) > 10) {
            this.applyForce(p5.Vector.fromAngle(this.angle).mult(0.1))
        }
        this.vel.add(this.acc)
        this.vel.limit(this.maxVel)

        this.pos.add(this.vel.copy().mult(game.timeWarp))
        this.acc.mult(0)
        this.vel.mult(this.friction)
        if(this.life <= 0) {
            this.die()

        }
    }
    die() {
        this.state = false
        game.entities.push(new Blood(this.pos.copy()))
        game.res.xp += 5
        game.res.money += 10
    }
    applyForce(force) {
        this.acc.add(force)
    }
    draw() {
        push()
        fill('purple')
        ellipse(this.pos.x, this.pos.y, this.diameter)
        rectMode(CORNER)
        noStroke()
        fill('black')
        rect(this.pos.x-this.diameter/2, this.pos.y -this.diameter, this.diameter, 5)
        fill('white')

        strokeWeight(1)

        rect(this.pos.x-this.diameter/2, this.pos.y -this.diameter, this.life*this.diameter/this.maxLife, 5)
        stroke('black')
        noFill()
        rect(this.pos.x-this.diameter/2, this.pos.y -this.diameter, this.diameter, 5)


        pop()
    }


}

function getAngleRad(p1, p2){
    return Math.atan2(p2.y - p1.y, p2.x - p1.x);
  }



  function getFreeSpot() {
    var bool = true 
    var v = createVector(random(0, width), random(0, height))
    while(v.dist(game.player.pos) < 100) {
        v = createVector(random(0, width), random(0, height))
    }

    return(v)
  }