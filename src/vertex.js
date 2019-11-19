class Vertex {
    constructor(coordinates) {
        this.coordinates = coordinates
    }

    getCoordinates() {
        return this.coordinates
    }

    getWithoutZ(mult = 1) {
        return {x: this.coordinates.x * mult, y: this.coordinates.y * mult}
    }
}
