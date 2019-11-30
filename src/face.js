import Vertex from './vertex.js'
import Vector from './vector.js'
import hsl2rgb from './color.js'

export default class Face {
	/**
	 *
	 * @param {Vertex[]} vertices
	 */
	constructor(vertices) {
		this.vertices = vertices
		this.vector = null
		this.color = { H: 248, S: 0.4, L: 0.392 }
	}

	/**
	 *  @param {CanvasRenderingContext2D} ctx canvas context
	 *  @param {Vertex} pos polyhedron's position
	 *  @param {Number} deformation
	 */
	draw(ctx, pos, mult = 1,deformation) {
		ctx.beginPath()
		ctx.moveTo((this.vertices[this.vertices.length - 1].x * mult) + pos.x, (this.vertices[this.vertices.length - 1].y * mult) + pos.y)
		if (deformation !== 0) {
			this.vertices.forEach(vertex => {
				const controlPoint = this.getControlPoint(vertex, deformation)
				ctx.quadraticCurveTo(controlPoint.x * mult + pos.x, controlPoint.y * mult + pos.y, (vertex.x * mult) + pos.x, (vertex.y * mult) + pos.y)
			})
		} else {
			this.vertices.forEach(vertex => {
				ctx.lineTo((vertex.x * mult) + pos.x, (vertex.y * mult) + pos.y)
			})
		}
		ctx.closePath()
		ctx.stroke()
		ctx.fillStyle = hsl2rgb(this.color)
		ctx.fill()
	}

	getControlPoint(vertex, deformation) {
		const center = this._center()
		return {
			x: (deformation * (this.vector.x + center.x) + vertex.x) / (deformation + 1),
			y: (deformation * (this.vector.y + center.y) + vertex.y) / (deformation + 1)
		}
	}

	didCollide(coordinate, position, speed) {
		let collisionPoint = null
		this.vertices.some(vertex => {
			if (vertex.didCollide(coordinate, position, speed)) {
				collisionPoint = new Vertex(vertex)
				return true
			}
			return false
		})
		return collisionPoint
	}

	createVector(polyhedronCenter) {
		this.vector = new Vector(polyhedronCenter, this._center())
	}

	translate(x, y, z) {
		this.vertices.forEach(vertex => {
			vertex.translate(x, y, z)
		})
	}

	updateColor(position) {
		const angle = this.vector.angle(new Vector(this._center(), { x: -position.x, y: -position.y, z: -position.z-200 }))

		this.color.L = Math.abs(1 - angle / 180)
	}

	rotate(phi, theta) {
		const rotatedVerts = this.vertices.map(vertex => vertex.rotate(phi, theta))
		return new Face(rotatedVerts)
	}

	_center() {
		const averages = {
			x: 0,
			y: 0,
			z: 0
		}

		this.vertices.forEach(({ x, y, z }) => {
			averages.x += x
			averages.y += y
			averages.z += z
		})
		return new Vertex({
			x: averages.x / this.vertices.length,
			y: averages.y / this.vertices.length,
			z: averages.z / this.vertices.length
		})
	}
}
