class Face {
    constructor(vertices) {
        this.vertices = vertices
    }

    draw(ctx, mult=1) {
        const arr = [];
        for (const vertex in this.vertices) {
            arr.push(this.vertices[vertex].getWithoutZ(mult))
        }
        ctx.beginPath()
        ctx.moveTo(arr[0].x, arr[0].y)
        for (let i = 1; i < arr.length; i++) {
            ctx.lineTo(arr[i].x, arr[i].y)      
        }
        ctx.fill()
    }
}