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
		this.fall()
		this.move()
	}

	move() {
		this.pos.x += this.speed.x
		this.pos.y += this.speed.y
		this.pos.z += this.speed.z
	}

	fall() {
		const gravity = 0.1

		this.speed.y += gravity
		this.pos.y += this.speed.y

		if (this.isBelowGround()) this.bounce()
	}

	bounce() {
		this.speed.y *= -1
	}

	isBelowGround() {
		const result = this.vertices.some(vertex => vertex.isBelowGround(this.pos))
		return result
	}
}
