import { canvas } from './index.js'

export default class Vertex {
	/**
	 * @param {{x: Number, y: Number, z: Number}} coordinates
	 */
	constructor(coordinates) {
		const { x, y, z } = coordinates
		this.x = x
		this.y = y
		this.z = z
		this.history = []
	}

	getCoordinates() {
		return { x: this.x, y: this.y, z: this.z }
	}

	getWithoutZ(mult = 1) {
		return { x: this.x * mult, y: this.y * mult }
	}

	translate(x = 0, y = 0, z = 0) {
		this.x += x
		this.y += y
		this.z += z
	}

	scale(coordinate, value) {
		this.history.push({ x: this.x, y: this.y, z: this.z })
		this[coordinate] *= value
	}

	rollBack() {
		if (this.history.length === 0) return false
		const { x, y, z } = this.history.pop()
		this.x = x
		this.y = y
		this.z = z
		return true
	}

	rotate(phi, theta) {
		const cphi = Math.cos(phi)
		const sphi = Math.sin(phi)
		const ctheta = Math.cos(theta)
		const stheta = Math.sin(theta)

		const z = this.z * ctheta + this.y * stheta
		let y = this.y * ctheta - this.z * stheta
		const x = this.x * cphi - y * sphi
		y = y * cphi + this.x * sphi
		return new Vertex({ x, y, z })
	}

	static translate(vertex, x = 0, y = 0, z = 0) {
		return new Vertex(vertex.x + x, vertex.y + y, vertex.z + z)
	}

	static scale(vertex, x = 1, y = 1, z = 1) {
		return new Vertex(vertex.x * x, vertex.y * y, vertex.z * z)
	}

	didCollide(coordinate, pos, speed) {
		const c = {
			x: canvas.width,
			y: canvas.height,
			z: Infinity
		}
		const position = this[coordinate] + pos[coordinate]

		if (speed[coordinate] === 0) return false
		if (speed[coordinate] > 0) {
			return position > c[coordinate]
		} else {
			return position < 0
		}
	}
}
