Ai = function(type) {
    this.pos = createVector(0, 0);
    this.targetCell = createVector(0, 0);
    this.resetCell = createVector(13, 11);
    this.resetCell2 = createVector(14, 11);
    this.oldCell = createVector(14, 11);
    this.mode = 0
    this.speed = game.baseSpeed
    this.stop = 0;
    this.tunnel = false;
    this.frightened = false
    this.timerF = 0;
    this.index = 0;
    this.exitPath = [createVector(posX(14), centerY(14)), createVector(posX(14), centerY(11))];
    this.exitN = 0;
    this.scatterMode = false;
    this.eaten = false;
    this.reseting = false;
    this.reverse = false;
    this.curDir = createVector(0, -1)
    this.nextDir = createVector(0, 0)
    this.type = type;
    this.walkAnim = 0;
    this.ghostSpeed = {
        tunnel:[0.4, 0.45, 0.45, 0.45, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
        fright:[0.5, 0.55, 0.55, 0.55, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0., 0.6],
        norm:[0.75, 0.85, 0.85, 0.85, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95]
    },
    this.init = function() {
        switch(this.type) {
            case "RED":
            this.pos.set(posX(14), centerY(11))
            this.index = 2
            this.pos.x -= 1
            this.mode = "CHASE"
            this.targetCell = createVector(25, -3);
            this.curDir.set(-1, 0)
            this.ghostSpeed.p1 = [20, 30, 40, 40, 40, 50, 50, 50, 60, 60, 60, 80, 80, 80, 100, 100, 100, 100, 120, 120, 120]
            this.ghostSpeed.bonus1 = [0.8, 0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            this.ghostSpeed.p2 = [10, 15, 20, 20, 20, 25, 25, 25, 30, 30, 30, 40, 40, 40, 50, 50, 50, 50, 60, 60, 60]
            this.ghostSpeed.bonus2 = [0.8, 0.9, 0.9, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            break;
            case "CYAN":
            this.index = 3
            this.pos.set(posX(12), centerY(14) + 10)
            this.targetCell = createVector(26, 32);
            this.mode = "PRISON"
            break;
            case "PINK":
            this.index = 0
            this.pos.set(posX(14), centerY(14) + 10)
            this.targetCell = createVector(2, -3);
            this.mode = "PRISON"
            break;
            case "ORANGE":
            this.index = 1
            this.pos.set(posX(16), centerY(14) + 10)
            this.targetCell = createVector(0, 32);
            this.mode = "PRISON"
            break;
        }
        this.speed = this.getSpeed()
    }
    this.getSpeed = function() {
        perc = this.ghostSpeed.norm[game.level];
        if(this.type == "RED") {
            if(game.pelletsRemaining <= this.ghostSpeed.p1[game.level]) {
                perc = this.ghostSpeed.bonus1[game.level];
            }else if(game.pelletsRemaining <= this.ghostSpeed.p2[game.level]) {
                perc = this.ghostSpeed.bonus2[game.level];
            }
        }
        this.cellV = this.cellValue(this.currentCell)
        if(this.mode == "PRISON") {
            perc = 0.6
        }else if(this.cellV == 4 && !this.eaten) {
            perc = this.ghostSpeed.tunnel[game.level];
        }else if(this.frightened) {
            perc = this.ghostSpeed.fright[game.level];
        }else if(this.eaten || this.reseting) {
            perc = 1.15
        }
        return(perc * game.baseSpeed)
    }
    this.getCellX = function() {
        x = Math.floor(this.pos.x / game.tS - 1)
        return(x)
    }
    this.getCellY = function() {
        y = Math.floor(this.pos.y / game.tS - 3)
        return(y)
    }
    this.cellValue = function(vector) {
        if(vector) {
            return(game.map[vector.y][vector.x])
        }
    }
    this.eat = function() {
        pac = createVector(game.pacman.pos.x, game.pacman.pos.y)
		if(pac.dist(this.pos) < game.tS) {
			if(this.frightened) {
                this.speed = this.getSpeed()
                this.frightened = false;
                game.ais.forEach(function(ai) {
                    if(!ai.eaten && !ai.reseting) {
                        ai.stop = game.fr;
                    }
                })
                this.eaten = true;
                game.pacman.stop = game.fr;
            }else if(!this.eaten && !this.reseting){
                game.reset = true
            }
		}
    }


    this.show = function() {
        if(game.human) {
            if(this.frightened) {
                if(this.curDir.x) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, 0, 4 * 40, 40, 40)
                }else if(this.curDir.y) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, 1 * 40, 4 * 40, 40, 40)
                }
            }else if(this.eaten || this.reseting) {
                if(this.curDir.x) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, 2 * 40, 4 * 40, 40, 40)
                }else if(this.curDir.y){
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, 3 * 40, 4 * 40, 40, 40)
                }
            }else if(this.curDir.x) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.index * 40, 5 * 40, 40, 40)
            }else if(this.curDir.y) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.index * 40, 6 * 40, 40, 40)
            }
        }else {
            if(this.frightened) {
                if(this.curDir.y == 1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (27 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.y == -1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (28 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.x == -1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (29 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.x == 1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (30 + this.index * 4) * 40, 40, 40)
                }
            }else if(this.eaten || this.reseting) {
                if(this.curDir.y == 1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (43 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.y == -1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (44 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.x == -1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (45 + this.index * 4) * 40, 40, 40)
                }else if(this.curDir.x == 1) {
                    image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (46 + this.index * 4) * 40, 40, 40)
                }
            }else if(this.curDir.y == 1) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (11 + this.index * 4) * 40, 40, 40)
            }else if(this.curDir.y == -1) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (12 + this.index * 4) * 40, 40, 40)
            }else if(this.curDir.x == -1) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (13 + this.index * 4) * 40, 40, 40)
            }else if(this.curDir.x == 1) {
                image(game.sprites, this.pos.x- game.tS, this.pos.y-game.tS, 40, 40, this.walkAnim * 40, (14 + this.index * 4) * 40, 40, 40)
            }
        }

    }
    this.getColor = function() {
        switch(this.type) {
            case "RED":
            return("red");
            break;
            case "CYAN":
            return("lightblue");
            break;
            case "PINK":
            return("pink");
            break;
            case "ORANGE":
            return("orange");
            break;
        }
    }
    //Run when entering new cell
    this.getNextDir = function() {
        //add swithc()
        switch(this.type) {
            case "RED":
            cellPac = createVector(game.pacman.getCellX(), game.pacman.getCellY())
            s = 0
            for(i = 1; i < this.neis.length; i ++) {
                if(this.neis[i].dist(cellPac) < this.neis[s].dist(cellPac)) {
                    s = i
                }
            }
            break;
            case "CYAN":
            cellPac = createVector(game.pacman.getCellX() + 2 * game.pacman.curDir.x, game.pacman.getCellY() + 2 * game.pacman.curDir.y)
            cellRed = game.ais[0].currentCell.copy()
            target = cellPac.sub(cellRed).mult(2)
            s = 0
            for(i = 1; i < this.neis.length; i ++) {
                if(this.neis[i].dist(target) < this.neis[s].dist(target)) {
                    s = i
                }
            }
            break;
            case "PINK":
            cellPac = createVector(game.pacman.getCellX() + 4 * game.pacman.curDir.x, game.pacman.getCellY() + 4 * game.pacman.curDir.y)
            s = 0
            for(i = 1; i < this.neis.length; i ++) {
                if(this.neis[i].dist(cellPac) < this.neis[s].dist(cellPac)) {
                    s = i
                }
            }
            break;
            case "ORANGE":
            cellPac = createVector(game.pacman.getCellX(), game.pacman.getCellY())
            dist = cellPac.copy().sub(this.currentCell)
            if(Math.abs(dist.x) + Math.abs(dist.y) >= 8) {
                s = 0
                for(i = 1; i < this.neis.length; i ++) {
                    if(this.neis[i].dist(cellPac) < this.neis[s].dist(cellPac)) {
                        s = i
                    }
                }
            }else {
                s = 0
                for(i = 1; i < this.neis.length; i ++) {
                    if(this.neis[i].dist(this.targetCell) < this.neis[s].dist(this.targetCell)) {
                        s = i
                    }
                }
            }
            break;
        }
        //comparing this.neis, which one is the best

        return(this.neis[s].copy().sub(this.currentCell))
    }
    this.continue = function() {
        this.nextPos = this.pos.copy().add(this.curDir.copy().mult(this.speed));
        //TUNNEL
        if(this.tunnel) {
            if(this.curDir.x > 0 && this.nextPos.x > 600){
                this.pos.x = 0
            }else if(this.curDir.x < 0 && this.nextPos.x < 0) {
                this.pos.x = 600
            }else {
                this.pos.add(this.curDir.copy().mult(this.speed))
            }
        }else if(this.curDir.y * (this.nextPos.y - centerY(this.getCellY())) < 0) {
            this.pos.add(this.curDir.copy().mult(this.speed))
        }else if(this.curDir.y) {
            //if next dir different, or same. same => continue, different => stop center and then change curDir with nextDir
            if(this.nextDir.equals(this.curDir)) {
                this.pos.add(this.curDir.copy().mult(this.speed));
            }else {
                this.pos.y = centerY(this.getCellY())
                this.curDir = this.nextDir.copy();
            }
        }else if(this.curDir.x * (this.nextPos.x - centerX(this.getCellX())) < 0) {
            this.pos.add(this.curDir.copy().mult(this.speed))
        }else if(this.curDir.x) {
            //if next dir different, or same same => continue, different => stop center
            if(this.nextDir.equals(this.curDir)) {
                this.pos.add(this.curDir.copy().mult(this.speed));
            }else {
                this.pos.x = centerX(this.getCellX())
                this.curDir = this.nextDir.copy();
            }
        }
    }
    this.intersection= function() {
        //is this cell an intersection ? (neis > 2)
        this.neis = []
        for(i = 0; i < game.vus.length; i++) {
            nei = this.currentCell.copy().add(game.vus[i])
            if(game.map[nei.y][nei.x] && !nei.equals(this.oldCell)) {
                this.neis.push(nei)
            }
        }
        if(this.neis.length > 0) {
            return(true)
        }else{
            return(false)
        }
    }
    this.move = function() {
        if(this.stop) {
            this.stop --
        }else {
            if(frameCount % 4 == 0) {
                this.walkAnim ++
                if(this.walkAnim > 3) {
                    this.walkAnim = 0
                }
            }else if(!game.human && this.eaten && frameCount % 10) {
                game.bloods.push(new Blood(this.pos.x + round(random(-5, 5)), this.pos.y + round(random(-5, 5)), round(random(20, 160))))
            }
            if(millis() >= this.timerF && this.frightened) {
                this.frightened = false;
                game.scatterP = false;
            }
            if(this.eaten && (this.currentCell.equals(this.resetCell) || this.currentCell.equals(this.resetCell2))) {
                this.eaten = false;
                this.speed = this.getSpeed()
                this.reseting = true;
                this.mode = "EXIT"
            }
            switch(this.mode) {

                case "PRISON":
                this.pos.add(this.curDir.copy().mult(this.speed))
                if(this.getCellY() == 13) {
                    this.curDir.set(0, 1)
                }
                if(this.getCellY() == 15) {
                    this.curDir.set(0, -1)
                }
                break;
                case "EXIT":
                if(this.pos.y != this.exitPath[this.exitN].y) {
                    if(this.pos.y - this.exitPath[this.exitN].y > 0) {
                        this.curDir.set(0, -1)
                    }else if(this.pos.y - this.exitPath[this.exitN].y < 0) {
                        this.curDir.set(0, 1)
                    }
                    this.nextPos = this.pos.copy().add(this.curDir.copy().mult(this.speed));
                    if(this.curDir.y * (this.nextPos.y - this.exitPath[this.exitN].y) < 0) {
                        this.pos.y = this.nextPos.y
                    }else {
                        this.pos.y = this.exitPath[this.exitN].y
                    }
                }else if(this.pos.x != this.exitPath[this.exitN].x) {
                    if(this.pos.x - this.exitPath[this.exitN].x > 0) {
                        this.curDir.set(-1, 0)
                    }else if(this.pos.x - this.exitPath[this.exitN].x < 0) {
                        this.curDir.set(1, 0)
                    }
                    this.nextPos = this.pos.copy().add(this.curDir.copy().mult(this.speed));
                    if(this.curDir.x * (this.nextPos.x - this.exitPath[this.exitN].x) < 0) {
                        this.pos.x = this.nextPos.x
                    }else {
                        this.pos.x = this.exitPath[this.exitN].x
                    }
                }else {
                    if(this.exitN > this.exitPath.length -2) {
                        this.reseting = false
                        this.speed = this.getSpeed()
                    }
                    this.exitN += 1
                    if(this.exitN > this.exitPath.length -1) {
                        this.exitN = 0;
                        this.pos.x -= 1;
                        this.curDir.set(-1, 0);
                        this.mode = "CHASE";
                    }
                }
                break;
                case "CHASE":
                //Entering new cellValue
                this.currentCell = createVector(this.getCellX(), this.getCellY())
                //define nextDir if entering new cell
                if(!this.currentCell.equals(this.oldCell)) {
                    this.speed = this.getSpeed()
                    if(this.reverse) {
                        this.curDir.mult(-1)
                        this.nextDir = this.curDir.copy()
                        this.oldCell = this.currentCell.copy()
                        this.reverse = false
                    }else if(this.cellValue(this.currentCell) == 4 || this.tunnel) {
                        this.tunnel = true;
                        if(this.cellValue(this.currentCell) == 2 || this.cellValue(this.currentCell) == 1) {
                            this.oldCell = this.currentCell.copy().sub(this.curDir)
                            this.tunnel = false;
                        }
                    }else {
                        if(this.intersection()) {
                            if(this.curDir.x) {
                                for(i = 0; i < this.neis.length; i++) {
                                    if(this.neis[i].equals(createVector(12, 10)) || this.neis[i].equals(createVector(15, 10)) || this.neis[i].equals(createVector(12, 22)) || this.neis[i].equals(createVector(15, 22))) {
                                        this.neis.splice(i, 1)
                                    }
                                }
                            }
                            if(this.eaten) {
                                s = 0
                                for(i = 1; i < this.neis.length; i ++) {
                                    if(this.neis[i].dist(this.resetCell) < this.neis[s].dist(this.resetCell)) {
                                        s = i
                                    }
                                }
                                this.nextDir = this.neis[s].copy().sub(this.currentCell)
                            }else if(this.frightened) {
                                this.nextDir = random(this.neis).copy().sub(this.currentCell)
                            }else if(this.scatterMode) {
                                s = 0
                                for(i = 1; i < this.neis.length; i ++) {
                                    if(this.neis[i].dist(this.targetCell) < this.neis[s].dist(this.targetCell)) {
                                        s = i
                                    }
                                }
                                this.nextDir = this.neis[s].copy().sub(this.currentCell)
                            }else {
                                this.nextDir = this.getNextDir()
                            }
                        }else{
                            //forbidden to go back, and has to turn if WALL
                            this.nextDir = this.neis[0].copy().sub(this.currentCell)
                        }
                        this.oldCell = this.currentCell.copy()
                    }

                }
                //before going through the center, check if has to turn with this.centerDir
                this.continue()
                break;
            }
        this.eat()
        }
    }
}
