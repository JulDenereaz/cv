class Rambo {
	constructor(pos) {
		this.pos = pos
		this.angle = 0
        this.speed = 1
        this.life = 100
        this.maxVel = 10
        this.radius = 30
		this.vel = createVector(0, 0)
		this.acc = createVector(0, 0)
        this.selectedWeapon = 'primary'
        this.fireRateTimer = 0
        this.switchTimer = 0
        this.shot = false
        this.switching = false
        this.reloading = false
        this.reloadTimer = 0
        this.ammunition = {
            'pistol':50,
            'assaultrifle':5600,
            'shotgun':150
        }
        this.magasin = {
            'pistol':17,
            'assaultrifle':35,
            'shotgun':7
        }
        this.equipped = {
            'primary':'Shotgun',
            'secondary':'M16'
        }

	}
	applyForce(force) {
		this.acc.add(force)
	}
    reload() {
        if(this.getCurrentAmmoStock() > 0 && this.magasin[this.getProperty('ammoType')] < game.weapons[this.equipped[this.selectedWeapon]].magasin) {
            this.reloading = true
            this.reloadTimer = millis() + this.getProperty('reloadTime')
        }
    }

    getCurrentAmmoStock() {
        return(this.ammunition[game.weapons[this.equipped[this.selectedWeapon]].ammoType])
    }
    getCurrentMagasin() {
        return(this.magasin[this.getProperty('ammoType')])
    }
    getCurrentWeapon() {
        return(this.equipped[this.selectedWeapon])
    }
    getProperty(property) {
        return(game.weapons[this.getCurrentWeapon()][property])
    }
	update() {
        if(game.paused) {
            if(this.reloading) {
                this.reloadTimer += deltaTime
            }
            if(this.fireRateTimer > millis()) {
                this.fireRateTimer += deltaTime
            }
            return
        }
        if(this.switchTimer <= millis()) {
            this.switching = false
        }
        if(this.reloading && this.reloadTimer <= millis()) {
            this.reloading = false
            let diff = game.weapons[this.equipped[this.selectedWeapon]].magasin - this.magasin[this.getProperty('ammoType')]
            if(diff > this.getCurrentAmmoStock()) {
                this.magasin[this.getProperty('ammoType')] += this.getCurrentAmmoStock()
                this.ammunition[game.weapons[this.equipped[this.selectedWeapon]].ammoType] = 0
            }else {
                this.magasin[this.getProperty('ammoType')] += diff
                this.ammunition[game.weapons[this.equipped[this.selectedWeapon]].ammoType] -= diff
            }
        }
        for (const direction in game.dir) {
            this.applyForce(game.dir[direction].mult(this.speed))
        }


		this.vel.add(this.acc)
        this.vel.limit(this.maxVel)

		this.nextPos = this.pos.copy().add(this.vel.copy().mult(game.timeWarp))
        let dX = this.nextPos.x - this.pos.x
        let dY = this.nextPos.y - this.pos.y

        for (let i = 0; i < game.walls.length; i++) {
            const wall = game.walls[i];
            if(collideRectCircle(wall.x, wall.y, wall.w, wall.h, this.pos.x + dX, this.pos.y, this.radius)) {
                this.vel.x = 0
            }
            if(collideRectCircle(wall.x, wall.y, wall.w, wall.h, this.pos.x, this.pos.y + dY, this.radius)) {
                this.vel.y = 0
            }

        }
        this.pos.add(this.vel.copy().mult(game.timeWarp))

		
		this.acc.mult(0)
		this.vel.mult(this.getProperty('weight'))

		this.angle = createVector(mouseX-this.pos.x, mouseY-this.pos.y).heading()
		this.gunPos = createVector(this.pos.x + this.radius/2 * cos(this.angle+PI/2), this.pos.y + this.radius/2 * sin(this.angle+PI/2))
		this.gunAngle = createVector(mouseX-this.gunPos.x, mouseY-this.gunPos.y).heading()
        if(!this.reloading && !this.switching && game.shooting && !outOfBounds(createVector(mouseX, mouseY)) && !this.shot && this.fireRateTimer <= millis() && mouseButton === LEFT) {
            if(!game.weapons[this.equipped[this.selectedWeapon]].automatic) {
                game.shooting = false
                this.shot = true
            }
            if(this.getCurrentMagasin() > 0) {
                this.shoot()
                this.magasin[this.getProperty('ammoType')] --
            }
            
        }
        game.ui.fireRatePerc = ((millis()-this.fireRateTimer+this.getProperty('fireRate'))/this.getProperty('fireRate'))*100
        game.ui.fireRatePerc > 100 ? game.ui.fireRatePerc = 100  : game.ui.fireRatePerc
        if(this.fireRateTimer <= millis()) {
            this.shot = false
        }
	}

	shoot() {

        for (let i = 0; i < this.getProperty('nBullets');  i++) {
            game.particules.push(new Bullet(this.equipped[this.selectedWeapon], this.gunPos.copy(), this.randomAngle(), this.getProperty('damage')))            
        }
        game.entities.push(new Douilles(this.gunPos.copy(), this.gunAngle))
        this.applyForce(p5.Vector.fromAngle(this.gunAngle + PI).mult(this.getProperty('recoilForce')))
        this.fireRateTimer = millis() + this.getProperty('fireRate')
	}
    randomAngle() {
        return(this.gunAngle + random(-this.getProperty('precision'), this.getProperty('precision')))
    }
    switch(newSelected) {
        if(!this.switching) {
            this.switching = true
            this.switchTimer = millis() + 1000
            this.selectedWeapon = newSelected
            this.reloading = false
            this.reloadTimer = 0
            this.shot = false
            this.fireRateTimer = 0
        }
    }
	draw() {
		push()
		translate(this.pos.x, this.pos.y)
		rotate(this.angle)
		fill('red')
		ellipse(0, 0, this.radius, this.radius)
		pop()
        if(!this.switching) {
            push()
            translate(this.gunPos.x, this.gunPos.y)
            rotate(this.gunAngle)
            game.weapons[this.equipped[this.selectedWeapon]].draw()
            pop()
        }
	}
}