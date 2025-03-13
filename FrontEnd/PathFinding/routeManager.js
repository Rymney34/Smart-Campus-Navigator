// Calculate Route

// Function to Create Route When "GO" is Pressed
export function createRoute(start, destination) {
    if (!start || !destination) {
        alert("Location not available!");
        return;
    }

    // Remove existing route if it exists
    if (routingControl) {
        map.removeControl(routingControl);
    }

    // Create route using Leaflet Routing Machine
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start[0], start[1]),
            L.latLng(destination[0], destination[1])
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false, 

    }).addTo(map);

    setTimeout(() => {
        document.querySelectorAll(".leaflet-routing-container").forEach(el => el.style.display = "none");
    }, 10);

    popupMenu.style.display = "none"; // Hide the popup after starting the route
}