class Vertex {
	/**
	 * @param {{x: Number, y: Number, z: Number}} coordinates
	 */
	constructor(coordinates) {
		const { x, y, z } = coordinates
		this.x = x
		this.y = y
		this.z = z
	}

	getCoordinates() {
		return { x: this.x, y: this.y, z: this.z }
	}

	getWithoutZ(mult = 1) {
		return { x: this.x * mult, y: this.y * mult }
	}

	translate(dx = 0, dy = 0, dz = 0) {
		this.x += dx
		this.y += dy
		this.z += dz
	}

	scale(scaleX = 1, scaleY = 1, scaleZ = 1) {
		this.x *= scaleX
		this.y *= scaleY
		this.z *= scaleZ
	}

	rotate(dx, dy, dz) {
		// TODO: review method
		this.y = Math.cos(dx) * this.y - Math.sin(dx) * this.z
		this.z = Math.sin(dx) * this.y + Math.cos(dx) * this.z

		this.x = Math.cos(dy) * this.x + Math.sin(dy) * this.z
		this.z = Math.cos(dy) * this.z - Math.sin(dy) * this.x

		this.x = Math.cos(dz) * this.x - Math.sin(dz) * this.y
		this.y = Math.sin(dz) * this.x + Math.cos(dz) * this.y
	}

	static translate(vertex, dx = 0, dy = 0, dz = 0) {
		return new Vertex(vertex.x + dx, vertex.y + dy, vertex.z + dz)
	}

	static scale(vertex, scaleX = 1, scaleY = 1, scaleZ = 1) {
		return new Vertex(vertex.x * scaleX, vertex.y * scaleY, vertex.z * scaleZ)
	}
}
