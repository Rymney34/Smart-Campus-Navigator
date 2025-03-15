class Block {
    constructor(name, coordinates, style) {
        this.name = name;
        this.coordinates = coordinates;
        this.style = style;
        this.polygon = null; // Store the polygon reference
    }

    addToMap(map) {
        this.polygon = L.polygon(this.coordinates, this.style).addTo(map);
    }

    removeFromMap(map) {
        if (this.polygon) {
            map.removeLayer(this.polygon);
        }
    }
}

export default Block;