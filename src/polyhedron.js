
import Face from './face.js'
import Vertex from './vertex.js'
import Vector from './vector.js'
import { canvas } from './index.js'

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
		this.speed = { x: 20, y: 0, z: 5 }
		this.accel = { x: 0, y: 0.3, z: 0 }
		this.phi = 0
		this.theta = 0
		this.deltaPhi = 0.009
		this.deltaTheta = 0.01
		this.collisionVertex = null

		this.bounceRatio = 0.2
		this.bounce = { x: 0, y: 0, z: 0 } // representa o valor já realizado do squash
		this.bouncing = { x: 0, y: 0, z: 0 } // representa a fase atual do bounce de cada coordenada

		this.deformation = 0
		this.deformationSpeed = 0

		this.goingToCenter = false
	}

	draw(ctx, mult = 1, curved) {
		mult = (this.pos.z / 1000 < 0.8) ? 2 - 2 * (this.pos.z / 1000) : 0.4
		this.transformed.forEach(face => {
			face.draw(ctx, this.pos, mult, this.deformation)
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
		this.deformFaces()
		if (this.isBouncing()) {
			this.updateBounce()
		} else {
			this.testCollision()
			this.move()
		}
		this.transformed.forEach(face => face.updateColor(this.pos))
	}

	rotate() {
		this.phi += this.deltaPhi
		this.theta += this.deltaTheta
		const center = this._center()

		this.transformed = this.faces.map(face => face.rotate(this.phi, this.theta))
		this.transformed.sort((a, b) => b._center().z - a._center().z)
		this.transformed.forEach(face => {
			face.createVector(center)
		})
	}

	move() {
		if (this.goingToCenter) {
			['x', 'y', 'z'].forEach(coordinate => {
				this.pos[coordinate] += 0.05 * this.vectorToCenter[coordinate]

				this.vectorToCenter[coordinate] -= 0.05 * this.vectorToCenter[coordinate]
			})
			return
		}
		['x', 'y', 'z'].forEach(async(c) => {
			this.pos[c] += this.speed[c]
			this.speed[c] += this.accel[c]
		})
	}

	toggleMode() {
		this.toggleDeform()
		this.toggleMovement()
		this.toggleRotation()
	}

	getVectorToCenter() {
		return new Vector(this.pos, { x: canvas.width / 2, y: canvas.height / 2, z: 100 })
	}

	deformFaces() {
		this.deformation += this.deformationSpeed
		if (this.deformation >= 3 || this.deformation <= 0) this.deformationSpeed *= -1
	}

	toggleMovement() {
		if (this.accel.y !== 0) {
			this.speed = { x: 0, y: 0, z: 0 }
			this.accel = { x: 0, y: 0, z: 0 }
			this.goingToCenter = true
			this.vectorToCenter = this.getVectorToCenter()
		} else {
			this.speed = { x: 20, y: 0, z: 5 }
			this.accel = { x: 0, y: 0.3, z: 0 }
			this.goingToCenter = false
		}
	}

	toggleDeform() {
		if (this.deformationSpeed === 0) this.deformationSpeed = 0.03
		else this.deformationSpeed = 0

		this.deformation = 0
	}

	toggleRotation() {
		if (this.deltaPhi !== 0) {
			this.deltaPhi = 0
			this.deltaTheta = 0
		} else {
			this.deltaPhi = 0.009
			this.deltaTheta = 0.01
		}
	}

	testCollision() {
		['x', 'y', 'z'].forEach(async(coordinate) => {
			if (this.didCollide(coordinate)) {
				this.bouncing[coordinate] = 1 // começa um bounce nessa coordenada
				this.bounce = { x: 0, y: 0, z: 0 }
			}
		})
	}

	updateBounce() {
		['x', 'y', 'z'].forEach(coordinate => {
			if (this.bounce[coordinate] >= this.bounceRatio) this.bouncing[coordinate] = 2 // início da fase 2

			if (this.bouncing[coordinate] === 1) {
				const bounceIncrement = 0.5 * this.bounceRatio
				this.bounce[coordinate] += bounceIncrement
				this.squash(1 - bounceIncrement)
				return
			}

			if (this.bouncing[coordinate] === 2) {
				const success = this.rollBack()
				if (!success) { // fim do bounce
					this.bouncing[coordinate] = 0
					this.speed[coordinate] *= -0.97
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
