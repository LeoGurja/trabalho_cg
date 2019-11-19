const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
context.fillStyle = '#00FF00'
context.strokeStyle = '#000'

const p1 = new Vertex({x: 0, y: 0, z: 0})
const p2 = new Vertex({x: 0, y: 10, z: 0})
const p3 = new Vertex({x: 10, y: 0, z: 0})
const p4 = new Vertex({x: 10, y: 10, z: 0})
const p5 = new Vertex({x: 0, y: 0, z: 10})
const p6 = new Vertex({x: 0, y: 10, z: 10})
const p7 = new Vertex({x: 10, y: 0, z: 10})
const p8 = new Vertex({x: 10, y: 10, z: 10})

const f1 = new Face({p1, p5, p7, p3})
const f2 = new Face({p1, p5, p6, p2})
const f3 = new Face({p1, p2, p4, p3})
const f4 = new Face({p5, p6, p8, p7})
const f5 = new Face({p2, p6, p8, p4})
const f6 = new Face({p4, p8, p7, p3})

polyhedrons = [new Polyhedron({f1, f2, f3, f4, f5, f6})]

setInterval(() => {
	context.clearRect(0, 0, canvas.width, canvas.height)
	
	polyhedrons.forEach(p => {
		p.update()
		p.draw(context, 10)
	})
})