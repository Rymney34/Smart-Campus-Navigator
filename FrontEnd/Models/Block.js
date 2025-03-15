class Block {
    constructor(name, coordinates, style) {
        this.name = name;
        this.coordinates = coordinates;
        this.style = style;
    }

    addToMap(map) {
        L.polygon(this.coordinates, this.style).addTo(map);
    }
}

export default Block