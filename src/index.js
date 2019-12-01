import Icosahedron from './icosahedron.js'
import Vertex from './vertex.js'
import Room from './room.js'

export const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
context.fillStyle = '#463c8c'
context.lineWidth = 2
context.lineJoin = context.lineCap = 'round'
context.strokeStyle = '#000'
document.title = 'Trabalho CG'

// criar utilizando coordenadas locais do poliedro
const polyhedron = new Icosahedron(new Vertex({ x: 500, y: 300, z: 0 }))
const room = new Room(canvas.width, canvas.height, 1000)
// new Polyhedron([topFace, leftFace, frontFace, backFace, bottomFace, rightFace], new Vertex({ x: 500, y: 300, z: 100 })),

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height)

	room.draw(context, 1)
	polyhedron.update()
	polyhedron.draw(context, 1)

	requestAnimationFrame(render)
}

render()

document.querySelector('#toggleMovement').addEventListener('click', () => {
	polyhedron.toggleMovement()
	updateText()
})
document.querySelector('#toggleRotation').addEventListener('click', () => {
	polyhedron.toggleRotation()
	updateText()
})
document.querySelector('#toggleDeform').addEventListener('click', () => {
	polyhedron.toggleDeform()
	updateText()
})
document.querySelector('#toggleAll').addEventListener('click', () => {
	polyhedron.toggleMode()
	updateText()
})
document.querySelector('#trab1').addEventListener('click', () => {
	if (!polyhedron.moving) polyhedron.toggleMovement()
	if (!polyhedron.rotating) polyhedron.toggleRotation()
	if (polyhedron.deforming) polyhedron.toggleDeform()
	updateText()
})
document.querySelector('#trab2').addEventListener('click', () => {
	if (polyhedron.moving) polyhedron.toggleMovement()
	if (polyhedron.rotating) polyhedron.toggleRotation()
	if (!polyhedron.deforming) polyhedron.toggleDeform()
	updateText()
})

function updateText() {
	const label = document.querySelector('h2')
	if (polyhedron.rotating && polyhedron.moving && !polyhedron.deforming) {
		label.innerText = 'Trabalho 1'
		label.style.color = '#FF0000'
	} else if (!polyhedron.rotating && !polyhedron.moving && polyhedron.deforming) {
		label.innerText = 'Trabalho 2'
		label.style.color = '#00FF00'
	} else {
		label.innerText = 'Custom'
		label.style.color = '#0000FF'
	}
}
