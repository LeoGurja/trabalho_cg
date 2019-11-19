class Vertex {
    constructor(coordinates) {
        this.coordinates = coordinates
    }

    getCoordinates() {
        return this.coordinates
    }

    getWithoutZ(mult = 1) {
        return {x: this.coordinates.x * mult, y: this.coordinates.y * mult}
    }
}

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

class Polyhedron {
    constructor(faces) {
        this.faces = faces
    }

    draw(ctx, mult=1) {
        for (const face in this.faces) {
            this.faces[face].draw(ctx, mult)
        }
    }
}

const p1 = new Vertex({x: 0, y: 0, z: 0})
const p2 = new Vertex({x: 0, y: 1, z: 0})
const p3 = new Vertex({x: 1, y: 0, z: 0})
const p4 = new Vertex({x: 1, y: 1, z: 0})
const p5 = new Vertex({x: 0, y: 0, z: 1})
const p6 = new Vertex({x: 0, y: 1, z: 1})
const p7 = new Vertex({x: 1, y: 0, z: 1})
const p8 = new Vertex({x: 1, y: 1, z: 1})

const f1 = new Face({p1, p5, p7, p3})
const f2 = new Face({p1, p5, p6, p2})
const f3 = new Face({p1, p2, p4, p3})
const f4 = new Face({p5, p6, p8, p7})
const f5 = new Face({p2, p6, p8, p4})
const f6 = new Face({p4, p8, p7, p3})

const poli1 = new Polyhedron({f1, f2, f3, f4, f5, f6})

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

ctx.fillStyle = '#00FF00'

poli1.draw(ctx, 400)
