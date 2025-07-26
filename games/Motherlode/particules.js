class Particule {
    constructor(pos, vel, type) {
        this.pos = pos
        this.vel = vel

    }

    update() {
        this.pos.add(this.vel)
    }


    draw(gridSize) {
        


        push()
        translate(x, y)
        fill(255)
        ellipse(0, 0, 40, 40)

        pop()
    }
}
