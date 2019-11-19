class Face {
	/**
	 *
	 * @param {Vertex[]} vertices
	 */
	constructor(vertices) {
		this.vertices = vertices
		this.vector = null
	}

	/**
	 *  @param {CanvasRenderingContext2D} ctx canvas context
	 *  @param {Vertex} pos polyhedron's position
	 */
	draw(ctx, pos, mult = 1) {
		ctx.beginPath()
		ctx.moveTo((this.vertices[0].x * mult) + pos.x, (this.vertices[0].y * mult) + pos.y)
		this.vertices.forEach(vertex => {
			ctx.lineTo((vertex.x * mult) + pos.x, (vertex.y * mult) + pos.y)
		})
		ctx.closePath()
		ctx.stroke()
		ctx.fill()
	}

	createVector(polyhedronCenter) {
		this.vector = new Vector(polyhedronCenter, this._center())
	}

	translate(dx, dy, dz) {
		this.vertices.forEach(vertex => {
			vertex.translate(dx, dy, dz)
		})
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
