import Polyhedron from './polyhedron.js'
import Face from './face.js'
import Vertex from './vertex.js'

export default class Room extends Polyhedron {
	constructor(width, height, depth) {
		const frontTopLeft = new Vertex({ x: -width/2, y: -height/2, z: -depth/2 })
		const frontTopRight = new Vertex({ x: width/2, y: -height/2, z: -depth/2 })
		const frontBottomLeft = new Vertex({ x: -width/2, y: height/2, z: -depth/2 })
		const frontBottomRight = new Vertex({ x: width/2, y: height/2, z: -depth/2 })
		const backTopLeft = new Vertex({ x: -width*0.7/2, y: -height*0.7/2, z: depth/2 })
		const backTopRight = new Vertex({ x: width*0.7/2, y: -height*0.7/2, z: depth/2 })
		const backBottomLeft = new Vertex({ x: -width*0.7/2, y: height*0.7/2, z: depth/2 })
		const backBottomRight = new Vertex({ x: width*0.7/2, y: height*0.7/2, z: depth/2 })

		const color = {H: 0, S: 0, L: 1}
		const backFace = new Face([backTopLeft, backTopRight, backBottomRight, backBottomLeft], color)
		const leftFace = new Face([frontTopLeft, backTopLeft, backBottomLeft, frontBottomLeft], color)
		const rightFace = new Face([frontTopRight, backTopRight, backBottomRight, frontBottomRight], color)
		const bottomFace = new Face([frontBottomLeft, frontBottomRight, backBottomRight, backBottomLeft], color)
		const topFace = new Face([frontTopLeft, frontTopRight, backTopRight, backTopLeft], color)

		super([frontTopLeft, frontTopRight, frontBottomLeft, frontBottomRight, backTopLeft, backTopRight, backBottomLeft, backBottomRight],
			[backFace, leftFace, rightFace, bottomFace, topFace],
			new Vertex({x:width/2, y:height/2, z:depth/2})
		)

		const center = this._center()
		this.faces.forEach(face => {
			face.createVector(center)
			face.updateColor({x: -this.pos.x, y: -this.pos.y, z: -this.pos.z})
		})
	}
}
