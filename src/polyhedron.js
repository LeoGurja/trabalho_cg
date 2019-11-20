class Polyhedron {
	/**
	 *
	 * @param {Face[]} faces polyhedron's faces
	 * @param {Vertex} position initial position
	 */
	constructor(faces, position = new Vertex({ x: 0, y: 0, z: 0 })) {
		this.faces = faces
		this.pos = position
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
