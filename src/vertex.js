class Vertex {
	constructor({ x, y, z }) {
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
}
