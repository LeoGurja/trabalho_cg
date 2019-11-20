class Icosahedron extends Polyhedron {
	constructor(position = new Vertex({ x: 0, y: 0, z: 0 })) {
		const vertices =
		[
			new Vertex({ x: 0, y: 0, z: 100 }),
			new Vertex({ x: 89.4, y: 0, z: 44.7 }),
			new Vertex({ x: 27.6, y: 85.1, z: 44.7 }),
			new Vertex({ x: -72.4, y: 52.6, z: 44.7 }),
			new Vertex({ x: -72.4, y: -52.6, z: 44.7 }),
			new Vertex({ x: 27.6, y: -85.1, z: 44.7 }),
			new Vertex({ x: 72.4, y: 52.6, z: -44.7 }),
			new Vertex({ x: -27.6, y: 85.1, z: -44.7 }),
			new Vertex({ x: -89.4, y: 0, z: -44.7 }),
			new Vertex({ x: -27.6, y: -85.1, z: -44.7 }),
			new Vertex({ x: 72.4, y: -52.6, z: -44.7 }),
			new Vertex({ x: 0, y: 0, z: -100 })
		]

		const faces = [
			new Face([vertices[0], vertices[1], vertices[2]]),
			new Face([vertices[0], vertices[2], vertices[3]]),
			new Face([vertices[0], vertices[3], vertices[4]]),
			new Face([vertices[0], vertices[4], vertices[5]]),
			new Face([vertices[0], vertices[5], vertices[1]]),
			new Face([vertices[11], vertices[7], vertices[6]]),
			new Face([vertices[11], vertices[8], vertices[7]]),
			new Face([vertices[11], vertices[9], vertices[8]]),
			new Face([vertices[11], vertices[10], vertices[9]]),
			new Face([vertices[11], vertices[6], vertices[10]]),
			new Face([vertices[2], vertices[1], vertices[6]]),
			new Face([vertices[2], vertices[7], vertices[3]]),
			new Face([vertices[3], vertices[8], vertices[4]]),
			new Face([vertices[4], vertices[9], vertices[5]]),
			new Face([vertices[5], vertices[10], vertices[1]]),
			new Face([vertices[6], vertices[7], vertices[2]]),
			new Face([vertices[7], vertices[8], vertices[3]]),
			new Face([vertices[8], vertices[9], vertices[4]]),
			new Face([vertices[9], vertices[10], vertices[5]]),
			new Face([vertices[10], vertices[6], vertices[1]])
		]
		super(vertices, faces, position)
	}
}
