class Location {
    constructor(name, lat, lng, icon = null) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
        this.icon = icon;  // Optional, can be set later
    }

    getLatLng() {
        return [this.lat, this.lng];
    }

    createMarker(map, showPopupMenu) {
        if (!this.icon) {
            console.warn(`No icon assigned to ${this.name}`);
            return null;
        }

        const marker = L.marker(this.getLatLng(), {
            icon: this.icon
        }).addTo(map)
          .bindPopup(this.name);

        marker.on('click', () => {
            showPopupMenu(this.name, this.lat, this.lng);
        });

        return marker;
    }
}



export default Location