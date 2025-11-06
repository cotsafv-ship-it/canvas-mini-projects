const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d") //methods to draw stuff
const render = []


class Ball {
    constructor(Startx, Starty) {
        this.x = Startx
        this.y = Starty
        this.velocityX = 0
        this.velocityY = 0
        this.radius = 50
        
    }

    static g = 0.8

    update() {
        if (this.velocityY > 0.5 && this.y + this.radius > canvas.height) {
            this.velocityY = - (this.velocityY * 0.8)
        } else if (this.velocityY < 0.5 && this.y + this.radius > canvas.height){
            this.velocityY = 0
            this.y = canvas.height - this.radius
        }

        this.velocityY += Ball.g
        this.y += this.velocityY

        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
    }

    draw() {
        ctx.fillStyle = "aquamarine"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
        ctx.fill()
    }

}

function init() {
    for (let i = 0; i < 1; i++) {
        render.push(new Ball(canvas.width / 2, 100))
    }
}

function ballRun() {
    for (let i = 0; i < render.length; i++) {
        render[i].update()
        render[i].draw()
    }
}

init()

function animate() {
    ctx.clearRect(0 ,0 , canvas.width, canvas.height)
    ballRun()
    requestAnimationFrame(animate)
}

animate()