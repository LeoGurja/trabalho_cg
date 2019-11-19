class Polyhedron {
    constructor(faces) {
        this.faces = faces
    }

    draw(ctx, mult=1) {
        for (const face in this.faces) {
            this.faces[face].draw(ctx, mult)
        }
	}
	
	update() {
		
	}
}