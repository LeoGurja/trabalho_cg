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

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	polyhedrons.forEach(p => {
		p.update()
		p.draw(context, 1)
	})
	requestAnimationFrame(render)
}

render()
setTimeout(() => {
	polyhedrons.forEach(p => {
		p.stopOnTheMiddle(canvas.width, canvas.height)
		document.title = "Trabalho 2"
		const label = document.querySelector("h2")
		label.innerText = "Trabalho 2"
		label.style.color = "#00FF00"
	})
}, 10000)
