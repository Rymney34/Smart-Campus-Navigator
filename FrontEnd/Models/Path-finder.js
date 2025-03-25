class PathFinder {
    constructor(map) {
        this.map = map;
        this.routingControl = null;
        this.userLatLng = null;
        this.userMarker = null;
    }

    createRoute(start, destination) {
        if (!start || !destination) {
            alert("Location not available!");
            return;
        }
        if (this.routingControl) {
            this.map.removeControl(this.routingControl);
            //this.routingControl=null;
        }
        /*this.map.eachLayer((layer) => {
            if (layer.options && layer.options.className === "leaflet-routing-container") {
                this.map.removeLayer(layer);
            }
        });*/

        this.routingControl = L.Routing.control({
            waypoints: [L.latLng(start[0], start[1]), L.latLng(destination[0], destination[1])],
            routeWhileDragging: false,
            addWaypoints: false,
            createMarker: function () { return null; },
            draggableWaypoints: false,
        }).addTo(this.map);

        setTimeout(() => {
            document.querySelectorAll(".leaflet-routing-container").forEach(el => el.style.display = "none");
        }, 10);
    }

    setupUserLocation() {
        // Locate user without auto-centering or zooming
        this.map.locate({watch:true,  enableHighAccuracy: true, setView: false });
        this.map.on('locationfound', (e) => {
            this.userLatLng = e.latlng; // Store user location
            console.log(this.userLatLng)
            if (this.userMarker) {
                this.userMarker.setLatLng(this.userLatLng); // Update marker position
            } else {
                // Add marker for the first time
                this.userMarker = L.marker(this.userLatLng).addTo(this.map)
                    .bindPopup("You are here.");
            }
        });
    
        // Prevent auto-following after first location find
        this.map.on('locationfound', () => {
            this.map.stopLocate();
        });
    
        // Prevent auto-panning or resetting view
        this.map.on('movestart moveend drag mousedown', () => {
            this.map.stopLocate();
        });
    }

    calculateETA(start,destination, document) {
        if (!start) {
            document.getElementById("eta").textContent = `Location unavailable`;
            return;
        }
        document.getElementById("eta").textContent = `Loading`;
        
    
        let router = L.Routing.control({
            waypoints: [
                L.latLng(start[0], start[1]),
                L.latLng(destination[0], destination[1])
            ],
            routeWhileDragging: false,
            createMarker: function () { return null; }, // Hide markers
            show: false, // Hide UI panel
            lineOptions: {
                styles: [{ color: "transparent", opacity: 0, weight: 0 }] 
            }
        }).addTo(this.map);
    
        setTimeout(() => {
            document.querySelectorAll(".leaflet-routing-container").forEach(el => el.style.display = "none");
        }, 0);
    
        router.route();
        
        router.on('routesfound', function (e) {
            console.log("✅ Route found:", e.routes[0]);
            let route = e.routes[0];
            let distanceMeters = route.summary.totalDistance; // Distance in meters
            let walkingSpeed = 1.39; // meters per second
            let etaSeconds = distanceMeters / walkingSpeed;
            let etaMinutes = Math.ceil(etaSeconds / 60); // Round up
            
            document.getElementById("eta").textContent = `${etaMinutes} min`;
    
            
            setTimeout(() => {
                router.getPlan().setWaypoints([]); 
                if (this.map) { // Ensure this.map exists
                    this.map.removeControl(router);  
                }
            }, 0);
        });
}
    getSelectedStartLocation(selectedValue) {
        //let selectedValue = startLocationSelect.value;
        if (selectedValue === "live") {
            return this.userLatLng ? [this.userLatLng.lat, this.userLatLng.lng] : null; 
        } else {
            return JSON.parse(selectedValue);
        }
    }
}

export default PathFinder;