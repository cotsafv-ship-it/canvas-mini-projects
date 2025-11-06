const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d") //methods to draw stuff
let render = []

const mouse = {
    x: null,
    y: null,
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width 
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1 
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }

    update() {


        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = - this.speedX
        } else if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = - this.speedY
        }


        this.x += this.speedX
        this.y += this.speedY

        
    }

    draw() {
        ctx.fillStyle = "aquamarine"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true)
        ctx.fill()
    }
}


function init() {
    for (let i = 0; i < 1000; i++) {
        render.push(new Particle())
    }
}

function handleParticle() {
    for (let i = 0; i < render.length; i++) {
        render[i].update()
        render[i].draw()
    }
}

init()

function animate() {
    ctx.clearRect(0 ,0 , canvas.width, canvas.height)
    handleParticle()
    requestAnimationFrame(animate)
}

animate()