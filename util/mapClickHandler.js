export function mapClickHandler(map) {
    map.on('click', function(e) {
        // Get the Latitude and Longitude of the Clicked Point
        var lat = e.latlng.lat;
        var lon = e.latlng.lng;
    
        // Display the Coordinates (Popup Format)
        L.popup()
            .setLatLng(e.latlng)
            .setContent("lat: " + lat + ", lng: " + lon)
            .openOn(map);
    });
}