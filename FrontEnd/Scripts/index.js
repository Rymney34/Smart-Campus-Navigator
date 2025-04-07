// Import Map Click Feature - Removable Feature (Developer Only Feature)
import { mapClickHandler } from "../Tools/MapTools/mapClickHandler.js";

// Import Function that ignores the OSRM warning that we are using OSRM's Demo Server (We know)
import { suppressOSRMSWarning } from "../Tools/MapTools/suppressWarnings.js";

import PathFinder from "../Models/Path-finder.js"
import Location from "../Models/Location.js"
import Block from "../Models/Block.js"
// Import Building Coordinates
import { buildingCoords } from '../Assets/FetchMethods/fetchPolygonMarkers.js';

// Import Polygon Colour Setting
import {
    polygonStyle
} from '../Tools/MapTools/mapPolygonColour.js';

// Import Marker Location Coordinates
import {
    locations
} from '../Assets/FetchMethods/fetchLocationMarkers.js';

// Import Marker Location Coordinates
import {
    extendedLocations
} from '../Assets/FetchMethods/fetchLocationMarkers.js';

import { displayLocationData } from '../Scripts/displayContent.js';

/*
import {svgIconBlockO, svgIconBlockB, svgIconBlockM, svgIconBlockT, svgIconBlockD, svgIconBlockF, svgIconBlockN, svgIconBlockL, svgIconBlockC, svgIconBlockP, svgIconBlockA, svgIconBlockE
} from '../Assets/FetchMethods/fetchIcons.js';
*/

/*
import { svgIconSideBarButton } from './FetchMethods/fetchIcons.js';
document.getElementById("side-barButton").innerHTML = svgIconSideBarButton;
*/

// Suppress OSRM demo server warning
suppressOSRMSWarning();


console.log(L.Routing)

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
var p;


/*document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ Leaflet and Routing Machine fully loaded.");
    console.log(L.Routing)
    p = new PathFinder(map);
    p.setupUserLocation();
});*/
p = new PathFinder(map);
p.setupUserLocation();

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
    let startLocation = p.getSelectedStartLocation(startLocationSelect.value);
    
    if (startLocation && currentTargetLocation) {
        p.calculateETA(startLocation, currentTargetLocation, document);
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
        let startLocation = p.getSelectedStartLocation(startLocationSelect.value);
        if (!startLocation) {
            alert("Start location not available! Please allow the website to acess your live location on your browser.");
            p.setupUserLocation();
            popupMenu.style.display = "none";
            return;
        }
        p.createRoute(startLocation, currentTargetLocation);
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
function showPopupMenu(location) {
    currentTargetLocation = [location.lat, location.lng];
    document.getElementById("destinationText").textContent = location.name;
    popupMenu.style.display = "block";

    let startLocation = p.getSelectedStartLocation(startLocationSelect.value);
    if (startLocation) {
        p.calculateETA(startLocation, [location.lat, location.lng], document);
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

// Call Map Click Handler (Developer Only Feature)
mapClickHandler(map);

// Array of block names
const blockNames = ["BlockO", "BlockT", "BlockL", "BlockP", "BlockB", "BlockM", "BlockN", "BlockD", "BlockF", "BlockA", "BlockC"];
const blockObjects = [];

blockNames.forEach(blockName => {
    if (buildingCoords[blockName]) {
        const block = new Block(blockName, buildingCoords[blockName], polygonStyle);
        block.addToMap(map);
        blockObjects.push(block);
    }
});

// Adds all locations to the dropdown
locations.forEach(function(location) {
    var option = document.createElement("option");
    option.value = JSON.stringify([location.lat, location.lng]); // Store coordinates as a string
    option.textContent = location.name;
    startLocationSelect.appendChild(option);
});

/*
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
}*/

/*
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
    "Block C": svgIconBlockC,
    "Block E": svgIconBlockE,
};

// Create custom icons for each block type
/*const customIcons = Object.keys(blockIcons).reduce((icons, block) => {
    icons[block] = createCustomIcon(block, blockIcons[block]);
    return icons;
}, {});*/

/*
const locationObjects = locations.map(locData => {
    const loc = new Location(locData.name, locData.lat, locData.lng, L.divIcon({
        className: 'custom-icon',
        html: blockIcons[locData.name],
        iconSize: [60, 60],
        iconAnchor: [30, 30]
    }));
    loc.createMarker(map, showPopupMenu);
    return loc;
});

const locationMap = {};
locationObjects.forEach(loc => {
    locationMap[loc.name] = loc;
});
*/

/*
// Function to create the marker with a base64 PNG icon
const createMarkerWithIcon = (location, blockIconsMap, showPopupMenu) => {
    const blockImage = blockIconsMap[location.name]; // Get the base64 PNG for this block
    
    // Create the custom icon
    let icon;
    if (blockImage) {
        icon = L.divIcon({
            className: 'custom-icon',
            html: `<img src="data:image/png;base64,${blockImage}" alt="${location.name}" style="width: 60px; height: 60px;" />`,
            iconSize: [60, 60],
            iconAnchor: [30, 30],
        });
        
    } else {
        console.error(`No image found for ${location.name}`);
        icon = L.divIcon({
            className: 'custom-icon',
            html: `<span>${location.name}</span>`,
            iconSize: [60, 60],
            iconAnchor: [30, 30],
        });
    }

    // Create a marker with the icon
    const marker = L.marker([location.lat, location.lng], { icon: icon });

    // Add the click event listener to the marker
    marker.on('click', async () => {
        console.log("Clicked Marker blockId requested :", location);
        console.log("blockId being sent:", location.blockId);
    
        if (!location.blockId) {
            console.error("Error: blockId is undefined!");
            return;
        }
    
        const locationData = await fetchLocationData(location.blockId);
    
        if (locationData.length > 0) {
            console.log("Received Data:", locationData);
    
            // Pass the entire array instead of just one object
            displayLocationData(locationData);
            showPopupMenu(locationData[0]);
        } else {
            console.error("No data received for block ID:", location.blockId);
        }
    });
    
    return marker;
};
*/

// Function to fetch location data based on the blockId
const fetchLocationData = async (blockId) => {
    try {
        const response = await fetch(`/getLocations/${blockId}`);
        let data = await response.json();

        // Ensure it's always an array
        return Array.isArray(data) ? data : [data];
    } catch (error) {
        console.error("Error fetching location data:", error);
        return [];
    }
};

const iconG = async () => {
    try {
        // Fetch all block icons from the server (base64 images)
        const response = await fetch("/getIcons");
        const data = await response.json();

        // Map the block names to their corresponding base64 PNG
        const blockIconsMap = data.reduce((map, item) => {
            if (item.name && item.image) {
                map[item.name] = item.image; // Store the base64 image for each block by name
            }
            return map;
        }, {});

        // Create location objects with custom icons (base64 PNGs)
        locations.forEach(locData => {
            const blockImage = blockIconsMap[locData.name];
            const icon = blockImage ? L.divIcon({
                className: 'custom-icon',
                html: `<img src="data:image/png;base64,${blockImage}" alt="${locData.name}" style="width: 60px; height: 60px;" />`,
                iconSize: [60, 60],
                iconAnchor: [30, 30],
            }) : L.divIcon({
                className: 'custom-icon',
                html: `<span>${locData.name}</span>`,
                iconSize: [60, 60],
                iconAnchor: [30, 30],
            });

            const location = new Location(locData.name, locData.lat, locData.lng);
            location.icon = icon;
            const marker = L.marker(location.getLatLng(), { icon });

            marker.on('click', async () => {
                console.log("Clicked marker for:", locData.name, ":", locData.blockId);
                console.log("Requesting data for block ID:", locData.blockId);
            
                try {
                    const locationData = await fetchLocationData(locData.blockId);
                    console.log("Data received from server:", locationData);
            
                    if (locationData.length > 0) {
                        displayLocationData(locationData);
                        showPopupMenu(location);
                    } else {
                        console.warn("No matching data found for block ID:", locData.blockId);
                    }
                } catch (err) {
                    console.error("Error during data fetch:", err);
                }
            });
            marker.addTo(map);
        });

    } catch (error) {
        console.error("Error fetching icons:", error);
    }
};

const getAllIcons = async () => {
    try {
        // Fetch all block icons from the server (base64 images)
        const response = await fetch("/getFacilitiesicons");
        const data = await response.json();

        console.log("Icons fetched:", data);


    } catch (error) {
        console.error("Error fetching icons:", error);
    }
};

const displayExtendedLocations = async () => {
    try {
        // Fetch facility icons from the server
        const response = await fetch("/getFacilitiesicons");
        const data = await response.json();

        // Map facility types (typeName) to base64 icons
        const facilityIconsMap = data.reduce((map, item) => {
            if (item.typeName && item.image) {
                map[item.typeName] = item.image;
            }
            return map;
        }, {});

        // Loop through extendedLocations and place markers with custom icons
        extendedLocations.forEach(locData => {
            const facilityImage = facilityIconsMap[locData.name]; // locData.name matches typeName
            const icon = facilityImage ? L.divIcon({
                className: 'custom-icon',
                html: `<img src="data:image/png;base64,${facilityImage}" alt="${locData.name}" style="width: 50px; height: 50px;" />`,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
            }) : L.divIcon({
                className: 'custom-icon',
                html: `<span>${locData.name}</span>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
            });

            const marker = L.marker([locData.lat, locData.lng], { icon });

            marker.addTo(map);
        });

    } catch (error) {
        console.error("Error displaying extended locations:", error);
    }
};

//getAllIcons()
iconG(showPopupMenu);
displayExtendedLocations()