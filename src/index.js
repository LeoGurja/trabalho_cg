const canvas = document.querySelector('canvas')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
const context = canvas.getContext('2d')
context.fillStyle = '#463c8c'
context.lineWidth = 3
context.lineJoin = context.lineCap = 'round'
context.strokeStyle = '#999'

let direct = {x: 1, y: 1}, last_dir = {x: 1, y: 1};
let speed = 10;
let size = 15

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
	new Icosahedron(new Vertex({ x: 500, y: 300, z: 0 }))
]
/*
polyhedrons.forEach(p => {
	p.faces.forEach(f => {
		f.vertices.forEach(console.log)
	})
})
*/

function bounce(p, dir) {

	if (p.pos.x - 130 <= 0){
		dir.x = 1
		size *= 1.15
		speed *= 1.15
	}

	if (p.pos.x + 130 >= canvas.width){
		dir.x = -1
		size *= 1.15
		speed *= 1.15
	} 

	if (p.pos.y - 130 <= 0){
		dir.y = 1
		size *= 1.15
		speed *= 1.15
	} 

	if (p.pos.y + 130 >= canvas.height){
		dir.y = -1
		size *= 1.15
		speed *= 1.15
	} 

	return { x: dir.x, y: dir.y }
	
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height)
	
	polyhedrons.forEach(p => {
		p.update()
		direct = bounce(p, last_dir)
		console.log(direct)
		last_dir = direct
		p.translate(direct.x * speed, last_dir.y * speed)
		p.draw(context, size)
	})
	requestAnimationFrame(render)
}

render()