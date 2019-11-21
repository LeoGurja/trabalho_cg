class Polyhedron {
	/**
	 * @param {Vertex[]} vertices polyhedron's vertices
	 * @param {Face[]} faces polyhedron's faces
	 * @param {Vertex} position initial position
	 */
	constructor(vertices, faces, position = new Vertex({ x: 0, y: 0, z: 0 })) {
		this.vertices = vertices
		this.faces = faces
		this.pos = position
		this.speed = { x: 0, y: 0, z: 0 }

		this.bounceRatio = 0.7
		this.bounce = { x: 0, y: 0, z: 0 } // representa o valor já realizado do squash
		this.bouncing = { x: 0, y: 0, z: 0 } // representa a fase atual do bounce de cada coordenada

		const center = this._center()
		this.faces.forEach(face => {
			// criar o vetor que indica o lado da frente da face
			face.createVector(center)
		})
	}

	draw(ctx, mult = 1) {
		this.faces.sort((a, b) => b._center().z - a._center().z)
		this.faces.forEach(face => {
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
		console.log(this.isBouncing())
		if (this.isBouncing()) {
			this.updateBounce()
		} else {
			this.testCollision()
			this.move()
		}
	}

	move() {
		['x', 'y', 'z'].forEach(async(c) => {
			this.pos[c] += this.speed[c]
		})
		this.speed.y += 0.7 // gravity
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
				const bounceIncrement = 0.3 * this.bounceRatio
				this.bounce[c] += bounceIncrement
				this.squash(c, 1 - bounceIncrement)
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
		const result = this.vertices.some(vertex => vertex.didCollide(coordinate, this.pos, this.speed))
		return result
	}

	squash(coordinate, value) {
		this.vertices.forEach(vertex => vertex.scale(coordinate, value))
	}

	rollBack() {
		return !this.vertices.some(vertex => !vertex.rollBack())
	}

	isBouncing() {
		return ['x', 'y', 'z'].some(c => this.bouncing[c] !== 0)
	}

	translate(x = 0, y = 0, z = 0) {
		this.pos.x += x
		this.pos.y += y
		this.pos.z += z
	}

	scale(x = 1, y = 1, z = 1) {
		this.pos.x *= x
		this.pos.y *= y
		this.pos.z *= z
	}
}
