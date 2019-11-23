import Face from './face.js'
import Vertex from './vertex.js'

export default class Polyhedron {
	/**
	 * @param {Vertex[]} vertices polyhedron's vertices
	 * @param {Face[]} faces polyhedron's faces
	 * @param {Vertex} position initial position
	 */
	constructor(vertices, faces, position = new Vertex({ x: 0, y: 0, z: 0 })) {
		this.vertices = vertices
		this.faces = faces
		this.transformed = faces
		this.pos = position
		this.speed = { x: 20, y: 0, z: 0 }
		this.phi = 0
		this.theta = 0
		this.collisionVertex = null

		this.bounceRatio = 0.2
		this.bounce = { x: 0, y: 0, z: 0 } // representa o valor já realizado do squash
		this.bouncing = { x: 0, y: 0, z: 0 } // representa a fase atual do bounce de cada coordenada
	}

	draw(ctx, mult = 1) {
		this.transformed.forEach(face => {
			face.draw(ctx, this.pos, mult)
		})
	}

	_center() {
		const averages = {
			x: 0,
			y: 0,
			z: 0
		}

		this.faces.forEach(face => {
			const { x, y, z } = face._center()
			averages.x += x
			averages.y += y
			averages.z += z
		})

		return new Vertex({
			x: averages.x / this.faces.length,
			y: averages.y / this.faces.length,
			z: averages.z / this.faces.length
		})
	}

	update() {
		this.rotate()
		if (this.isBouncing()) {
			this.updateBounce()
		} else {
			this.testCollision()
			this.move()
		}
		this.transformed.forEach(face => face.updateColor(this.pos))
	}

	rotate() {
		this.phi += 0.009
		this.theta += 0.01
		const center = this._center()

		this.transformed = this.faces.map(face => face.rotate(this.phi, this.theta))
		this.transformed.sort((a, b) => b._center().z - a._center().z)
		this.transformed.forEach(face => {
			face.createVector(center)
		})
	}

	move() {
		['x', 'y', 'z'].forEach(async(c) => {
			this.pos[c] += this.speed[c]
		})
		this.speed.y += 0.3 // gravity
	}

	testCollision() {
		['x', 'y', 'z'].forEach(async(c) => {
			if (this.didCollide(c)) {
				this.bouncing[c] = 1 // começa um bounce nessa coordenada
				this.bounce = { x: 0, y: 0, z: 0 }
			}
		})
	}

	updateBounce() {
		['x', 'y', 'z'].forEach(c => {
			if (this.bounce[c] >= this.bounceRatio) this.bouncing[c] = 2 // início da fase 2

			if (this.bouncing[c] === 1) {
				const bounceIncrement = 0.5 * this.bounceRatio
				this.bounce[c] += bounceIncrement
				this.squash(1 - bounceIncrement)
				return
			}

			if (this.bouncing[c] === 2) {
				const success = this.rollBack()
				if (!success) { // fim do bounce
					this.bouncing[c] = 0
					this.speed[c] *= -0.97
				}
			}
		})
	}

	didCollide(coordinate) {
		return this.transformed.some(face => {
			const collisionPoint = face.didCollide(coordinate, this.pos, this.speed)
			if (!collisionPoint) return false
			this.collisionVertex = collisionPoint
			return true
		})
	}

	squash(value) {
		this.vertices.forEach(vertex => vertex.squash(this.collisionVertex, value))
	}

	rollBack() {
		return !this.vertices.some(vertex => !vertex.rollBack())
	}

	isBouncing() {
		return ['x', 'y', 'z'].some(c => this.bouncing[c] !== 0)
	}
}
