class Polyhedron {
	constructor(faces) {
		this.faces = faces

		for (const face in this.faces) {
			face.createVector()
		}
	}

	draw(ctx, mult = 1) {
		for (const face in this.faces) {
			this.faces[face].draw(ctx, mult)
		}
	}

	center() {
		const averages = {
			x: 0,
			y: 0,
			z: 0
		}

		for (const face in this.faces) {
			const { x, y, z } = face.center.getCoordinates()
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
