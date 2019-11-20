const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
context.fillStyle = '#463c8c'
context.lineWidth = 2
context.lineJoin = context.lineCap = 'round'
context.strokeStyle = '#fff'

// criar utilizando coordenadas locais do poliedro
/*
const frontTopLeft = new Vertex({ x: -50, y: -50, z: -50 })
const frontTopRight = new Vertex({ x: 50, y: -50, z: -50 })
const frontBottomLeft = new Vertex({ x: -50, y: 50, z: -50 })
const frontBottomRight = new Vertex({ x: 50, y: 50, z: -50 })
const backTopLeft = new Vertex({ x: -50, y: -50, z: 50 })
const backTopRight = new Vertex({ x: 50, y: -50, z: 50 })
const backBottomLeft = new Vertex({ x: -50, y: 50, z: 50 })
const backBottomRight = new Vertex({ x: 50, y: 50, z: 50 })

const topFace = new Face([frontTopLeft, backTopLeft, backTopRight, frontTopRight])
const leftFace = new Face([frontTopLeft, backTopLeft, backBottomLeft, frontBottomLeft])
const frontFace = new Face([frontTopLeft, frontBottomLeft, frontBottomRight, frontTopRight])
const backFace = new Face([backTopLeft, backBottomLeft, backBottomRight, backTopRight])
const bottomFace = new Face([frontBottomLeft, backBottomLeft, backBottomRight, frontBottomRight])
const rightFace = new Face([frontBottomRight, backBottomRight, backTopRight, frontTopRight])
*/
const polyhedrons = [
	// new Polyhedron([topFace, leftFace, frontFace, backFace, bottomFace, rightFace], new Vertex({ x: 500, y: 300, z: 100 })),
	new Icosahedron(new Vertex({ x: 500, y: 300, z: 100 }))
]
/*
polyhedrons.forEach(p => {
	p.faces.forEach(f => {
		f.vertices.forEach(console.log)
	})
})
*/
function render() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	polyhedrons.forEach(p => {
		p.update()
		p.draw(context, 300)
	})
	console.log('as')
	requestAnimationFrame(render)
}

render()
