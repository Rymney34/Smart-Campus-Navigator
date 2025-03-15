class Location {
    constructor(name, lat, lng) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.icon = null;
    }

    getLatLng() {
        return [this.lat, this.lng];
    }
}



export default Location