import Vertex from './vertex.js'
import Vector from './vector.js'

export default class Face {
	/**
	 *
	 * @param {Vertex[]} vertices
	 */
	constructor(vertices) {
		this.vertices = vertices
		this.vector = null
		this.color = 'rgba(70,60,140,1)'
	}

	/**
	 *  @param {CanvasRenderingContext2D} ctx canvas context
	 *  @param {Vertex} pos polyhedron's position
	 *  @param {Number} deformation
	 */
	draw(ctx, pos, mult = 1, deformation) {
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
		ctx.fillStyle = this.color
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

	generateColorFromAngle(angle) {
		if (angle >= 180) return { r: 0, g: 0, b: 0 }
		return { r: Math.floor(185 - angle), g: Math.floor(175 - angle), b: Math.floor(255 - angle) }
	}

	translate(x, y, z) {
		this.vertices.forEach(vertex => {
			vertex.translate(x, y, z)
		})
	}

	updateColor(position) {
		const angle = this.vector.angle(new Vector(this._center(), { x: -position.x, y: -position.y, z: -position.z }))
		const color = this.generateColorFromAngle(angle)
		this.color = `rgba(${color.r},${color.g},${color.b},1)`
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
