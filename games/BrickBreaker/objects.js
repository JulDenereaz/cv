class Brick {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y)
        this.color = 'green'
        this.w = w
        this.h = h
        this.state = true
    }

    update() {

    }
    show() {
        stroke
        fill(this.color)
        rect(this.pos.x, this.pos.y, this.w, this.h)
    }

}

class Paddle {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.drag = 0.90
        this.maxVel = 12
        this.w = w
        this.h = h
        this.color = 'white'
    }

    show() {
        stroke(0)
        fill(this.color)
        rect(this.pos.x, this.pos.y, this.w, this.h)
    }
    update() {
        this.applyForce(game.dir)
        this.vel.add(this.acc).limit(this.maxVel).mult(this.drag)
        this.nextPos = this.pos.copy().add(this.vel.copy().mult(game.timeWarp))
        if(this.nextPos.x < game.padding) {
            this.nextPos.x = game.padding
        }
        if(this.nextPos.x > width-this.w-game.padding) {
            this.nextPos.x = width-this.w-game.padding
        }
        this.pos.set(this.nextPos)

        this.acc.set(0, 0)

    }

    applyForce(force) {
        this.acc.add(force)
    }

    
}

class Ball {
    constructor(x, y, d, maxVel) {
        this.pos = createVector(x, y)
        this.state = true
        this.maxVel = maxVel
        this.vel = createVector(random(0, 2)-1, random(0, 1)-1).setMag(this.maxVel)
        this.acc = createVector(0, 0)
        this.bounced = false
        this.d = d
        this.color = 'white'
    }
    applyForce(force) {
        this.acc.add(force)
    }
    collide(obj) {
        //Paddle
        if(collideRectCircle(game.paddle.pos.x, game.paddle.pos.y, game.paddle.w, game.paddle.h, this.pos.x, this.pos.y, this.d)) {
            this.theta = getTheta(game.paddle.pos, game.paddle.w, game.paddle.h, this.pos.copy(), this.vel.copy())
            this.vel = this.vel.rotate(2*this.theta);
            this.bounced = true
            return
        }
        //Bricks
        if(collideRectCircle(game.hitBoxBricks.pos.x, game.hitBoxBricks.pos.y, game.hitBoxBricks.w, game.hitBoxBricks.h, this.pos.x, this.pos.y, this.d)) {
            for (let i = 0; i < game.bricks.length; i++) {
                const brick = game.bricks[i];
                if(brick.state && collideRectCircle(brick.pos.x, brick.pos.y, brick.w, brick.h, this.pos.x, this.pos.y, this.d)) {
                    this.theta = getTheta(brick.pos, brick.w, brick.h, this.pos.copy(), this.vel.copy())
                    this.vel = this.vel.rotate(2*this.theta);
                    this.bounced = true
                    brick.state = false
                    game.udpateBox = true
                    game.balls.push(new Ball(this.pos.x, this.pos.y,  10, 5))
    
                    return
                }
            }
        }
        //Walls
        if(this.pos.x - this.d/2 < 0) {
            this.vel.reflect(createVector(1, 0))
            return
        }
        if(this.pos.y - this.d/2 < 0) {
            this.vel.reflect(createVector(0, 1))
            return
        }
        if(this.pos.x + this.d/2 > width) {
            this.vel.reflect(createVector(-1, 0))
            return
        }
        if(this.pos.y + this.d/2 > height) {
            this.state = false
            return
        }



    }

    update() {
        this.vel.add(this.acc)
        this.collide()
        this.pos.add(this.vel.copy().mult(game.timeWarp))
        this.acc.set(0, 0)
    }
    show() {
        stroke(0)
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.d)
    }

}