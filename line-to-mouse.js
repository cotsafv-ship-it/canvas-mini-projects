let canvas
let ctx
let flowField
let flowFieldAnimation

const mouse = {
    x: 0,
    y: 0,
}

class FlowFieldEffect {
    /** @type {CanvasRenderingContext2D} */
    #ctx
    #width
    #height
    constructor(ctx, width, height) {
        this.#ctx = ctx
        this.#width = width
        this.#height = height
        this.#ctx.strokeStyle = "white"
        this.angle = 0
        this.lastTime = 0
    }

    #draw(x, y) {
        const length = 300
        this.#ctx.beginPath()
        this.#ctx.moveTo(x, y)
        this.#ctx.lineTo(mouse.x, mouse.y)
        this.#ctx.stroke()
    }

    animate(timeStamp) {
        const deltaTime = timeStamp - this.lastTime
        this.lastTime = timeStamp
        console.log("FPS: " + 1000 / deltaTime)
        this.angle += 0.1
        this.#ctx.clearRect(0,0,this.#width, this.#height)
        this.#draw(this.#width / 2 , this.#height / 2 )
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
    }
}

window.onload = function() {
    canvas = document.getElementById("canvas")
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    ctx = canvas.getContext("2d")
    flowField = new FlowFieldEffect(ctx,canvas.width,canvas.height)
    flowField.animate()
}

window.addEventListener("resize", function() {
    cancelAnimationFrame(flowFieldAnimation)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height)
    flowField.animate()
})

window.addEventListener("mousemove", function(e) {
    mouse.x = e.x
    mouse.y = e.y
})
