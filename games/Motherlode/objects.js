class Game {
    constructor(seed, rows, cols, textures) {
        //grid[nRow][nCol] 
        this.nCols = max(cols, 35)
        this.nRows = rows
        this.padding = 30
        this.buttons = []
        this.genBLocks = [5, 9, 10, 11, 12, 13]
        this.buildings = {
            garage: createVector(Math.floor(this.nCols/2)+15, -1),
            gasStation: createVector(Math.floor(this.nCols/2)+5, -1),
            shop: createVector(Math.floor(this.nCols/2)-15, -1),
            seller: createVector(Math.floor(this.nCols/2)-5, -1)
        }
        this.grid = Array.from(Array(this.nRows), () => new Array(this.nCols).fill(0))
        this.generateMap(seed)
        //.x = columns, .y = depth
        this.playerPos = createVector(Math.floor(this.nCols/2), -3)
        this.playerVel = createVector(0, 0)
        this.playerAcc = createVector(0, 0)
        this.gravity = createVector(0, 0.009)
        this.airFriction = 0.99
        this.dTime = deltaTime/20
        this.shopping = false
        this.variables = {
            time:0,

        }
        this.particules = []
        this.startedMining = 0
        this.upgrades = {
            drillBit:'wood',
            HP:500,
            engine:'thumper',
            armor:'paper',
            tank:'jerican',
            radiator:'passif'
        }
        this.storage = {}
        this.animation = {
            downFrame: 0,
            latFrame:25,
            flyFrame:0,
            time:25,
            tankID:25,
            drillID:26,
            weaponID:35,
            paleID:28,
            paleCur:0,
            drillCur:0,
            currentDrillDirection:"LATERAL",
            ready:false,

        }
        this.currentDir = "RIGHT"
        this.wallBlock = 0.1
        this.maxVelX = 0.2
        this.maxVelY = 0.5
        this.mining = false
        this.miningDir = createVector(0, 0)
        this.flying = false
        this.wallTouching = false
        this.gridSize = 128
        this.targetBlock = createVector(0, 0)
        this.targetID = 0
        this.textures = textures
        this.currentBlock = createVector(25, -3)
        this.keyPr = {"up":false, "right":false, "down":false, "left":false}
        this.speed = {"up":createVector(0, -0.012), "right":createVector(0.012, 0), "left":createVector(-0.012, 0)}
        this.miningSpeed = 1
    }


    generateMap(seed) {
        let getN = mulberry32(seed)
        for (let row = 0; row < this.grid.length; row++) {
            const rowArray = this.grid[row];
            for (let col = 0; col < rowArray.length; col++) {
                this.grid[row][col] = 2
                if(row == 0) {
                    this.grid[row][col] = 3
                    for(let building in this.buildings) {
                        if(col > this.buildings[building].x-3 && col < this.buildings[building].x + 3) {
                            this.grid[row][col] = 4
                        }
                    }
                                    
                }else {
                    for (let i = 0; i < this.genBLocks.length; i++) {
                        let rand = getN()
                        const id = this.genBLocks[i];
                        if(row >= blocks[id].min && rand < blocks[id].prob+(row-blocks[id].min)*blocks[id].variation) {
                            this.grid[row][col] = id
                        }
                    }


                }
            }
        }
    }

    applyForce(force) {
        this.playerAcc.add(force)
    }

    exit() {
        this.windowUI = false
        this.exiting = true
    }
    update() {
        this.dTime = deltaTime/20
        if(this.windowUI) {
            
            return
        }else{
            let bool = false
            for(const building in this.buildings) {
                if(this.currentBlock.equals(this.buildings[building])) {
                    bool = true
                    if(!this.exiting) {
                        this.windowUI = building
                    }
                }
            }
            if(!bool) {
                this.exiting = false
            }
        }
        this.updateDrill()

        if(this.mining) {
            let targetPos = this.targetBlock.copy()
            targetPos.y = targetPos.y + this.wallBlock
            let angle = p5.Vector.sub(targetPos, this.miningStartPos).heading()
            let dist = p5.Vector.dist(targetPos, this.miningStartPos)
            let distFromStart = easeLinear(millis()-this.startedMining, 0, dist, this.miningSpeed)
            this.playerPos.set(p5.Vector.add(this.miningStartPos, p5.Vector.fromAngle(angle).mult(distFromStart)))
            if(distFromStart > dist) {
                //Animation complete
                this.mining = false
                if(this.targetID != 2 && this.targetID != 3) {
                    if(this.targetID in this.storage) {
                        this.storage[this.targetID] += 1
                    }else {
                        this.storage[this.targetID] = 1
                    }
                }
                this.grid[this.targetBlock.y][this.targetBlock.x] = 1
            }
        }else {
            for (const direction in this.keyPr) {
                if(!this.mining && this.keyPr[direction]) {
                    if(direction == "up") {
                        if(this.animation.ready) {
                            this.applyForce(this.speed[direction])
                        }
                    }else {
                        this.applyForce(this.speed[direction])
                    }
                }
            }
            this.playerVel.add(this.playerAcc)
            if(this.playerVel.x > this.maxVelX) {
                this.playerVel.x = this.maxVelX
            }else if(this.playerVel.x < - this.maxVelX) {
                this.playerVel.x = -this.maxVelX
            }
            if(this.playerVel.y > this.maxVelY) {
                this.playerVel.y = this.maxVelY
            }else if(this.playerVel.y < - this.maxVelY) {
                this.playerVel.y = -this.maxVelY
            }
            this.playerVel.add(this.gravity)
            this.oldPos = this.playerPos.copy()
            this.oldBlock = this.currentBlock.copy()
            this.playerPos.add(p5.Vector.mult(this.playerVel, this.dTime))
            this.currentBlock = createVector(round(this.playerPos.x), round(this.playerPos.y))
            
        
            let distFromCenter = p5.Vector.sub(this.playerPos, this.oldBlock)
            // console.log(distFromCenter)
            this.flying = true
            this.wallTouching = false
            if(!this.isFree(this.oldBlock.x+1, this.oldBlock.y) && distFromCenter.x > this.wallBlock && this.playerVel.x > 0) {
                // console.log("RIGHT")
                this.playerPos.x = round(this.oldPos.x) + this.wallBlock
                this.playerVel.x = 0
                this.wallTouching = true
            }else if(!this.isFree(this.oldBlock.x-1, this.oldBlock.y) && distFromCenter.x < -this.wallBlock && this.playerVel.x < 0) {
                // console.log("LEFT")
                this.playerPos.x = round(this.oldPos.x) - this.wallBlock
                this.playerVel.x = 0
                this.wallTouching = true
            }
            if(!this.isFree(this.oldBlock.x, this.oldBlock.y+1) && distFromCenter.y > this.wallBlock && this.playerVel.y > 0) {
                // console.log("BOTTOM")
                this.playerPos.y = round(this.oldPos.y) + this.wallBlock
                this.playerVel.y = 0
                this.flying = false
                this.playerVel.x *= 0.9
            }else if(!this.isFree(this.oldBlock.x, this.oldBlock.y-1) && distFromCenter.y < -this.wallBlock && this.playerVel.y < 0) {
                // console.log("TOP")
                this.playerPos.y = round(this.oldPos.y) - this.wallBlock
                this.playerVel.y = 0
            }
            //drilling:
            if(!this.flying && this.playerVel.mag() < 0.01 && this.animation.ready) {
                //check keyboard, and then block if minable 
                if(this.keyPr.down) {
                    this.mineTarget(this.currentBlock.copy().add(createVector(0, 1)))
                }else if(this.keyPr.left && this.wallTouching) {
                    this.mineTarget(this.currentBlock.copy().add(createVector(-1, 0)))
                }else if(this.keyPr.right && this.wallTouching) {
                    this.mineTarget(this.currentBlock.copy().add(createVector(1, 0)))

                }
                
            }
            if(this.playerVel.x > 0) {
                this.currentDir = "RIGHT"
            }else if(this.playerVel.x < 0){
                this.currentDir = "LEFT"
            }
        }

        this.playerAcc.mult(0)
        this.playerVel.mult(this.airFriction)

        for (let i = 0; i < this.particules.length; i++) {
            const particule = this.particules[i];
            particule.update()
        }
    }


    
    draw() {
        this.drawSky()
        push()
        translate(width/2, height/2)
        rectMode(CENTER)
        let dX = this.playerPos.x - this.currentBlock.x
        let dY = this.playerPos.y - this.currentBlock.y
        this.leftWall= false
        this.rightWall = false
        let nBlockX = Math.ceil((width/this.gridSize)/2) + 1
        let nBlockY = Math.ceil((height/this.gridSize)/2) + 1
        imageMode(CENTER)     

        if(this.getRelativePos(0, this.currentBlock.x, dX) > - width/2 + this.gridSize/2) {
            this.leftWall = true
            nBlockX *= 2
        }else if(this.getRelativePos(this.nCols-1, this.currentBlock.x, dX) < width/2 - this.gridSize/2) {
            this.rightWall = true
            nBlockX *= 2
        }
        //Drawing blocks
        for (let row = max(this.currentBlock.y-nBlockY, 0); row < min(this.currentBlock.y+nBlockY, this.nRows); row++) {
            for (let col = max(this.currentBlock.x-nBlockX, 0); col < min(this.currentBlock.x+nBlockX, this.nCols); col++) {
                this.drawBlock(this.getRelativePos(col, this.currentBlock.x, dX, true), this.getRelativePos(row, this.currentBlock.y, dY), row, col)
            }
        }
        //Drawing Buildings
        for(const building in this.buildings) {
            push()
            translate(this.getRelativePos(this.buildings[building].x, this.currentBlock.x, dX, true), this.getRelativePos(this.buildings[building].y, this.currentBlock.y, dY))
            this.drawBuilding(building)
            pop()
        }
        //Drawing Player
        if(this.leftWall) {
            this.drawPlayer(-width/2+this.currentBlock.x*this.gridSize+dX*this.gridSize + this.gridSize/2, 0)
        }else if(this.rightWall) {
            this.drawPlayer(width/2 - (this.nCols-this.currentBlock.x-1)*this.gridSize+this.gridSize*dX-this.gridSize/2, 0)

        }else {
            this.drawPlayer(0, 0)
        }

        pop()
        for (let i = 0; i < this.particules.length; i++) {
            const particule = this.particules[i];
            particule.draw(this.gridSize)
        }
        //Drawing UI
        this.drawUI()
    }



}


Game.prototype.updateDrill = function() {
    this.animation.paleCur += 1
    this.animation.paleCur %= 3
    if(this.mining) {
        this.animation.drillCur += 1
        this.animation.drillCur %= 2
    }
    if(this.keyPr.up && !this.keyPr.down) {
        this.animation.currentDrillDirection = "FLY"
        if(this.animation.flyFrame >= this.animation.time) {
            this.animation.ready = true
        }else {
            if(!this.mining) {
                this.animation.paleCur = 0
                this.animation.flyFrame += 1
                this.animation.downFrame > 0 ? this.animation.downFrame -= 1 : this.animation.downFrame = 0
                this.animation.latFrame > 0 ? this.animation.latFrame -= 1 : this.animation.latFrame = 0
                this.animation.ready = false
            }
        }
            }else if(this.keyPr.down && !this.keyPr.right && !this.keyPr.up && !this.keyPr.left) {
        this.animation.currentDrillDirection = "DOWN"
        if(this.animation.downFrame >= this.animation.time) {
            this.animation.ready = true
        }else {
            if(!this.mining) {
                this.animation.drillCur = 0
                this.animation.flyFrame > 0 ? this.animation.flyFrame -= 1 : this.animation.flyFrame = 0
                this.animation.downFrame += 1
                this.animation.latFrame > 0 ? this.animation.latFrame -= 1 : this.animation.latFrame = 0
                this.animation.ready = false
            }
        }
    }else{
        this.animation.currentDrillDirection = "LATERAL"
        if(this.animation.latFrame >= this.animation.time) {
            this.animation.ready = true
        }else {
            if(!this.mining) {
                this.animation.drillCur = 0
                this.animation.flyFrame > 0 ? this.animation.flyFrame -= 1 : this.animation.flyFrame = 0
                this.animation.downFrame > 0 ? this.animation.downFrame -= 1 : this.animation.downFrame = 0
                this.animation.latFrame += 1                
                this.animation.ready = false
            }
        }

    }
}

Game.prototype.drawSky = function() {
    fill('#87CEEB')
    rect(0, 0, width, height)
}
Game.prototype.drawBlock = function(x, y, row, col) {
    const block = blocks[this.grid[row][col]]
    image(this.textures, x, y, this.gridSize+1, this.gridSize+1, getTextureX(block.id), getTextureY(block.id), 128, 128)
    fill(255)
    text(col + ":" + row, x, y)
}


Game.prototype.drawUI = function() {
    this.drawScale(10, height/2)
    if(this.windowUI) {
        this.drawWindow(this.windowUI)
    }

}

Game.prototype.drawBuilding = function(building) {
    switch(building) {
        case 'shop':
            fill('white')
            ellipse(0, 0, 25, 25)
            break;
        case 'garage':
            fill('black')
            ellipse(0, 0, 25, 25)
            break;
        case 'gasStation':
            fill('green')
            ellipse(0, 0, 25, 25)
            break;
        case 'seller':
            fill('red')
            ellipse(0, 0, 25, 25)
    }
}

Game.prototype.inBound = function(target) {
    return(target.x >= 0 && target.y >= 0 && target.x < this.nCols && target.y < this.nRows)
}

Game.prototype.drawScale = function(x, y) {
    push()
    stroke(255)
    strokeWeight(2)
    translate(x, y)
    line(0, -25*5, 0, 25*5)
    strokeWeight(4)
    line(-10, -25*5, 40, -25*5)
    line(-10, 25*5, 40, 25*5)
    
    let middle = -this.playerPos.y
    let delta = Math.abs(middle - round10(middle))
    textAlign(LEFT, CENTER)
    fill(255)
    for (let i = -20; i <= +30; i += 10) {
        let pos = (i-delta)*5
        if(pos >= -25*5+4 && pos < 25*5-4) {
            strokeWeight(2)
            line(0, pos, 10, pos)
            strokeWeight(1)
            text(round10(middle)-i, 15, pos)
        }
    }
    for (let i = -15; i <= +25; i += 10) {
        let pos = (i-delta)*5
        line(0, pos, 5, pos)
    }

    stroke('red')
    strokeWeight(4)
    line(0, 0, 10, 0)
    pop()
}

Game.prototype.drawPlayer = function(x, y) {
    push()
    translate(x, y)
    imageMode(CENTER)
    if(this.currentDir == "LEFT") {
        scale(-1, 1)
    }
    if(this.animation.currentDrillDirection == "LATERAL" || this.animation.latFrame > 0) {
        //Lat drill
        image(this.textures, map(this.animation.latFrame, 0, this.animation.time, -this.gridSize/5, this.gridSize/5), 0, this.gridSize, this.gridSize, getTextureX(this.animation.drillID + this.animation.drillCur), getTextureY(this.animation.drillID + this.animation.drillCur), 128, 128)
    }
    if(this.animation.currentDrillDirection == "DOWN" || this.animation.downFrame > 0) {
        //Down Drill
        push()
        rotate(PI/2)
        image(this.textures, map(this.animation.downFrame, 0, this.animation.time, -this.gridSize/12, this.gridSize/5), 0, this.gridSize, this.gridSize, getTextureX(this.animation.drillID + this.animation.drillCur), getTextureY(this.animation.drillID + this.animation.drillCur), 128, 128)
        pop()
    }
    if(this.animation.currentDrillDirection == "FLY") {
        //Blades
        let frame = Math.floor(map(this.animation.flyFrame, 0, this.animation.time, 0, 4))
        image(this.textures, 0, -this.gridSize/3, this.gridSize, this.gridSize, getTextureX(this.animation.paleID + frame + this.animation.paleCur), getTextureY(this.animation.paleID + frame + this.animation.paleCur), 128, 128)
    }
    //Tank image
    image(this.textures, 0, 0, this.gridSize, this.gridSize, getTextureX(this.animation.tankID), getTextureY(this.animation.tankID), 128, 128)
    pop()
}

Game.prototype.getRelativePos = function(p, pos, delta, edge=false) {
    if(!edge) {
        return((p-pos)*this.gridSize-delta*this.gridSize)
    }else {
        if(this.rightWall) {
            return(width/2 - (this.nCols-p-1)*this.gridSize-this.gridSize/2)
        }else if(this.leftWall) {
            return(-width/2 + p*this.gridSize+this.gridSize/2)
        }else {
            return((p-pos)*this.gridSize-delta*this.gridSize)
        }
    }


}
Game.prototype.mineTarget = function(target) {
    if(this.inBound(target)) {
        this.targetBlock = target.copy()
        this.targetID = blocks[this.grid[this.targetBlock.y][this.targetBlock.x]].id
        if(blocks[this.targetID].breakable) {
            this.mining = true
            this.miningDir.set(p5.Vector.sub(this.targetBlock, this.currentBlock))
            this.miningSpeed = blocks[this.targetID].miningSpeed //add calculation bsed on drill level and RPM
            this.startedMining = millis()
            this.miningStartPos = this.playerPos.copy()
        }
    }
}

Game.prototype.isFree = function(x, y) {
    // Check if block x, y is 1
    if(y < 0 && x >= 0 && x < this.nCols) {
        return(true)
    }else if(y >= 0 && x >= 0 && x < this.nCols && blocks[this.grid[y][x]].empty) {
        return(true)
    }
    return(false)
}

Game.prototype.drawWindow = function(type) {
    fill('#baa6b3')
    rect(this.padding, this.padding, width-this.padding*2, height-this.padding*2)

    switch(type) {
        case 'shop':
            fill('white')
            ellipse(0, 0, 25, 25)
            break;
        case 'garage':
            fill('black')
            ellipse(0, 0, 25, 25)
            break;
        case 'gasStation':
            fill('green')
            ellipse(0, 0, 25, 25)
            break;
        case 'seller':
            fill('red')
            ellipse(0, 0, 25, 25)
    }
}