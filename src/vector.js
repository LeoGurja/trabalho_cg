export default class Vector {
	constructor(start, end) {
		this.x = end.x - start.x
		this.y = end.y - start.y
		this.z = end.z - start.z
	}

	angle(vector) {
		// returns the angle between two vector in radians between 0 and π
		let cosine = this.times(vector) / (this.magnitude() * vector.magnitude())
		if (cosine < -1) cosine = -1
		let angle = Math.acos(cosine)
		if (isNaN(angle)) throw new Error(`${cosine} is not a valid cosine`)
		angle = 180 * angle / Math.PI
		return angle
	}

	times(vector) {
		return (this.x * vector.x + this.y * vector.y + this.z * vector.z)
	}

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2)
	}
}
