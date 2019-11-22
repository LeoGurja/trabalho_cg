import Vector from '../src/vector'

describe('angle', () => {
	it('should calculate angles', () => {
		const x = new Vector({ x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: 0 })
		const y = new Vector({ x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 0 })

		expect(x.angle(y)).toBe(Math.PI / 2)

		expect(x.angle(x)).toBe(0)
	})
})
