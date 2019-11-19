class Face {
	constructor(vertices) {
		this.vertices = vertices
		this.vector = null
	}

	draw(ctx, mult = 1) {
		const arr = []
		for (const vertex in this.vertices) {
			arr.push(this.vertices[vertex].getWithoutZ(mult))
		}
		ctx.beginPath()
		ctx.moveTo(arr[0].x, arr[0].y)
		for (let i = 1; i < arr.length; i++) {
			ctx.lineTo(arr[i].x, arr[i].y)
		}
		ctx.fill()
	}

	createVector(polyhedronCenter) {
		const faceCenter = this.center()
		this.vector = new Vector(polyhedronCenter, faceCenter)
	}

	center() {
		const averages = {
			x: 0,
			y: 0,
			z: 0
		}

		for (const vertex in this.vertices) {
			const { x, y, z } = vertex.getCoordinates()
			averages.x += x
			averages.y += y
			averages.z += z
		}

		return new Vertex({
			x: averages.x / this.vertices.length,
			y: averages.y / this.vertices.length,
			z: averages.z / this.vertices.length
		})
	}
}
