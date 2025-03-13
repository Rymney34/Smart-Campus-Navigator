// Get User Location

let userLatLng = null;

export function setupUserLocation(map) {
    var userMarker = null;

    // Locate user without auto-centering or zooming
    map.locate({watch:true,  enableHighAccuracy: true, setView: false });

    map.on('locationfound', function (e) {
        console.log(e.latlng);
        userLatLng = e.latlng; // Store user location

        if (userMarker) {
            userMarker.setLatLng(userLatLng); // Update marker position
        } else {
            // Add marker for the first time
            userMarker = L.marker(userLatLng).addTo(map)
                .bindPopup("You are here.");
        }
    });

    // Prevent auto-following after first location find
    map.on('locationfound', function () {
        map.stopLocate();
    });

    // Prevent auto-panning or resetting view
    map.on('movestart moveend drag mousedown', function () {
        map.stopLocate();
    });
}

export function findLocation(locationName, lat, lng) {
    let startLocation;
    popupMenu.style.display = "block";
    let selectedValue = startLocationSelect.value;

    // Ensure that userLatLng is defined before using it
    if (selectedValue === "live") {
        if (userLatLng) {
            startLocation = [userLatLng.lat, userLatLng.lng]; // Use live location
        } else {
            //alert("User location not available yet!");
            console.log("User location not available yet!");
            return;
        }
    } else {
        startLocation = JSON.parse(selectedValue); // Convert stored coordinates back to an array
    }

    calculateETA(startLocation, [lat, lng]);
    return startLocation;
}

export function getSelectedStartLocation() {
    let selectedValue = startLocationSelect.value;
    if (selectedValue === "live") {
        return userLatLng ? [userLatLng.lat, userLatLng.lng] : null; // Use live location
    } else {
        return JSON.parse(selectedValue);
    }
}