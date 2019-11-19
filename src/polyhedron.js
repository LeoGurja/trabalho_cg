class Polyhedron {
	constructor(faces) {
		this.faces = faces
		this.center = this._center()
		for (const index in this.faces) {
			const face = this.faces[index]
			face.createVector(this.center)
		}
	}

	draw(ctx, mult = 1) {
		for (const index in this.faces) {
			const face = this.faces[index]
			face.draw(ctx, mult)
		}
	}

	_center() {
		const averages = {
			x: 0,
			y: 0,
			z: 0
		}

		for (const index in this.faces) {
			const face = this.faces[index]

			const { x, y, z } = face.center
			averages.x += x
			averages.y += y
			averages.z += z
		}

		return new Vertex({
			x: averages.x / this.faces.length,
			y: averages.y / this.faces.length,
			z: averages.z / this.faces.length
		})
	}

	update() {

	}
}
