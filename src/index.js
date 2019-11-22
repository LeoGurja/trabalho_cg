import Icosahedron from './icosahedron.js'
import Vertex from './vertex.js'

export const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
context.fillStyle = '#463c8c'
context.lineWidth = 2
context.lineJoin = context.lineCap = 'round'
context.strokeStyle = '#000'

// criar utilizando coordenadas locais do poliedro
const polyhedrons = [
	// new Polyhedron([topFace, leftFace, frontFace, backFace, bottomFace, rightFace], new Vertex({ x: 500, y: 300, z: 100 })),
	new Icosahedron(new Vertex({ x: 500, y: 300, z: 0 }))
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
		p.draw(context)
	})
	requestAnimationFrame(render)
}

render()
