class Location {
    constructor(name, lat, lng, icon) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.icon = icon;
    }

    getLatLng() {
        return [this.lat, this.lng];
    }
}



export default Location