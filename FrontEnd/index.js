// Import Map Click Feature - Removable Feature (Developer Only Feature)
import { mapClickHandler } from "/Utility/mapClickHandler.js"; // REMOVE FEATURE ON LAUNCH

// Import Building Coordinates
import { buildingCoords } from './FetchMethods/fetchPolygonMarkers.js';

// Import Polygon Colour Setting
import {
    polygonStyle
} from './Utility/mapPolygonColour.js';

// Import Marker Location Coordinates
import {
    locations
} from './FetchMethods/fetchLocationMarkers.js';

import {
    svgIconBlockA,
    svgIconBlockB,
    svgIconBlockC,
    svgIconBlockD, svgIconBlockF,
    svgIconBlockL,
    svgIconBlockM,
    svgIconBlockN,
    svgIconBlockO,
    svgIconBlockP,
    svgIconBlockT,
} from './FetchMethods/fetchIcons.js';

import { svgIconSideBarButton } from './FetchMethods/fetchIcons.js';
//import axios from '../node_modules/axios';

document.getElementById("side-barButton").innerHTML = svgIconSideBarButton;

// Initialize the Map and Set View to Cardiff Met Landaff Campus
var map = L.map('map', {
    /*
    minZoom: 10,
    maxBounds: L.latLngBounds(
        L.latLng(51.494, -3.216), // South-West corner
        L.latLng(51.498, -3.210)  // North-East corner
    ), // Restrict panning
    maxBoundsViscosity: 1.0 // Prevents dragging outside the bounds
    */
}).setView([51.496212259288775, -3.2133038818782333], 50);

// Add OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

// -- Added --
var routingControl = null;
var userLatLng = null;
var savedLocation = null;

function setupUserLocation(map) {
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

setupUserLocation(map);

var popupMenu = document.createElement("div");
popupMenu.id = "popupMenu";
popupMenu.style.display = "none"; // Initially hidden
popupMenu.innerHTML = `
    <div id="popupHeader">
    <h3 id="destinationTitle">Directions</h3>
    <button id="popupToggle">
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </button>
</div>

<div id="popupContent">
    <div class="location-input">
        <label for="startLocationSelect" id="userLocationLabel">User Location</label>
        <select id="startLocationSelect">
            <option value="live">Live Location</option>
        </select>
    </div>

    <div class="location-input">
        <label>Target Location</label>
        <p id="destinationText"></p>
    </div>

    <!-- ETA and GO Button Row -->
    <div class="eta-go-container">
        <div class="eta-box">
            <p id="eta-label">ETA</p>
            <span id="eta">-- min</span>
        </div>
        <div class="go-button-container">
            <button id="goButton">GO</button>
        </div>
    </div>
</div>
`;
document.body.appendChild(popupMenu);

var css = document.createElement("style");
css.innerHTML = `
    #popupMenu {
        position: fixed;
        bottom: 20px;
        right: 2%;
        width: 320px;
        background: #0A152A;
        color: white;
        padding: 15px;
        border-radius: 10px;
        display: none;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-family: "Gill Sans", sans-serif;
    }
    #popupMenu h3 { margin: 0; font-size: 20pt; margin-left: 6px}
    
`;
document.head.appendChild(css);
popupMenu.style.position = "fixed";
document.body.appendChild(popupMenu); // Ensures it's not inside the map

// Get the dropdown element
const startLocationSelect = document.getElementById("startLocationSelect");

document.getElementById("startLocationSelect").addEventListener("change", function () {
    let startLocation = getSelectedStartLocation();
    
    if (startLocation && currentTargetLocation) {
        calculateETA(startLocation, currentTargetLocation);
    }
    resetGoButton()
});

document.getElementById("popupHeader").addEventListener("click", function () {
    document.getElementById("popupMenu").classList.toggle("minimized");
});
// Global variable to store the current target location
let currentTargetLocation = null;

function resetGoButton() {
    popupMenu.style.display = "block";
    const goButton = document.getElementById("goButton");
    goButton.textContent = "GO";
    goButton.style.background = "red";
    goButton.style.border = "none";

    goButton.onclick = function () {
        let startLocation = getSelectedStartLocation();
        if (!startLocation) {
            alert("Start location not available!");
            setupUserLocation(map);
            popupMenu.style.display = "none";
            return;
        }
        createRoute(startLocation, currentTargetLocation);
        popupMenu.style.display = "block";
        goButton.textContent = "END";
        goButton.style.background = "#444";
        goButton.style.border = "2px solid red";

        goButton.onclick = function () {
            if (routingControl) {
                map.removeControl(routingControl);
                routingControl = null;
            }
            resetGoButton();
            popupMenu.style.display = "none";
        };
    };
}


// Function to Show Popup Menu
function showPopupMenu(locationName, lat, lng) {
    currentTargetLocation = [lat, lng]; // Store target location globally
    document.getElementById("destinationText").textContent = locationName;
    popupMenu.style.display = "block";

    const goButton = document.getElementById("goButton");
    goButton.textContent = "GO";
    goButton.style.background = "red";
    goButton.style.border = "none";
    

    let startLocation = getSelectedStartLocation();
    console.log(startLocation+"!!!!");
    if (startLocation) {
        calculateETA(startLocation, [lat, lng]);
    }

    resetGoButton();
}

// When commented out no noticable change on website
/* 
function findLocation(locationName,lat,lng) {
    let startLocation;
    popupMenu.style.display = "block";
    let selectedValue = startLocationSelect.value;
    if (selectedValue === "live") {
        startLocation = [userLatLng.lat,userLatLng.lng]; // Use live location
    } else {
        startLocation = JSON.parse(selectedValue); // Convert stored coordinates back to an array
    }
    calculateETA(startLocation,[lat,lng]);
    return startLocation;
}
*/

function getSelectedStartLocation() {
    let selectedValue = startLocationSelect.value;
    if (selectedValue === "live") {
        return userLatLng ? [userLatLng.lat, userLatLng.lng] : null; // Use live location
    } else {
        return JSON.parse(selectedValue);
    }
}

// Function to Create Route When "GO" is Pressed
function createRoute(start, destination) {
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

function calculateETA(start,destination) {
    
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
            styles: [{ color: "transparent", opacity: 0, weight: 0 }] // 👈 Make the line invisible
        }
    }).addTo(map);

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

        
        setTimeout(() => map.removeControl(router), 0);
    });
   
}

// Call Map Click Handler - Removable Feature (Developer Only Feature)
mapClickHandler(map); // REMOVE FEATURE ON LAUNCH

// Array of block names
const blockNames = ["BlockO", "BlockT", "BlockL", "BlockP", "BlockB", "BlockM", "BlockN", "BlockD", "BlockF", "BlockA", "BlockC"];

// Add polygons for each block
blockNames.forEach(block => {
    L.polygon(buildingCoords[block], polygonStyle).addTo(map);
});

// Adds all locations to the dropdown
locations.forEach(function(location) {
    var option = document.createElement("option");
    option.value = JSON.stringify([location.lat, location.lng]); // Store coordinates as a string
    option.textContent = location.name;
    startLocationSelect.appendChild(option);
});

let iconSize = [60, 60]
let iconAnchor = [30, 30]

// Function to generate custom icons for each block type
function createCustomIcon(block, svgIcon) {
    return L.divIcon({
        className: 'custom-icon',
        html: svgIcon,
        iconSize: iconSize,
        iconAnchor: iconAnchor,
    });
}

// Map block types to SVG icons
const blockIcons = {
    "Block O": svgIconBlockO,
    "Block B": svgIconBlockB,
    "Block F": svgIconBlockF,
    "Block M": svgIconBlockM,
    "Block N": svgIconBlockN,
    "Block D": svgIconBlockD,
    "Block T": svgIconBlockT,
    "Block L": svgIconBlockL,
    "Block P": svgIconBlockP,
    "Block A": svgIconBlockA,
    "Block C": svgIconBlockC
};

// Create custom icons for each block type
const customIcons = Object.keys(blockIcons).reduce((icons, block) => {
    icons[block] = createCustomIcon(block, blockIcons[block]);
    return icons;
}, {});

// Add markers with custom icons
locations.forEach(function(location) {
    var marker = L.marker([location.lat, location.lng], {
        icon: customIcons[location.name]
    }).addTo(map)
    .bindPopup(location.name);

    marker.on('click', function () {
        savedLocation = location;
        showPopupMenu(location.name, location.lat, location.lng);
    });
});

const iconEle = document.getElementById("icn_1");

const iconG = async () => {
    try {
        const response = await fetch("./getIcons");

        const data = await response.json();

        // Test of Icon dispaying and getting for Block E
        console.log(data.filter(item => item.name === 'Block E'));

        // Test of Icon dispaying and getting for Block E in variable 
        const icon = data.filter(item => item.name === 'Block E');

    // Converting to base 64
        const base64Image = icon[0].image.toString('base64');

        // Set the image src using the base64 string
        iconEle.src = `data:image/png;base64,${base64Image}`;

        
    } catch (error) {
        console.error("Error fetching image:", error);
    }
};

const getLocationData = async () => {
    try {
    //    Block id that you would like to pass 
        const blockId = '67b90f414df331b174fe8e83';

    // link to the route
    fetch(`/getLocations/${blockId}`)
        .then(response => response.json())
        .then(data => console.log('Location Data:', data));

       
    }
    catch (error) {
        console.error("Error fetching location data:", error);
    }
};

getLocationData();
//axios.get('/icon').then((data)=> console.log(res))

iconG();