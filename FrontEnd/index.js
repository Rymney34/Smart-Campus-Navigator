// Import Map Click Feature - Removable Feature (Developer Only Feature)
import { mapClickHandler } from "/util/mapClickHandler.js"; // REMOVE FEATURE ON LAUNCH

// Import Building Coordinates
import {
    buildingCoordsBlockO,
    buildingCoordsBlockT,
    buildingCoordsBlockM,
    buildingCoordsBlockN,
    buildingCoordsBlockD,
    buildingCoordsBlockL,
    buildingCoordsBlockB,
    buildingCoordsBlockA,
    buildingCoordsBlockF,
    buildingCoordsBlockP,
    buildingCoordsBlockC
} from '/FrontEnd/FetchMethods/fetchPolygonMarkers.js';

// Import Polygon Colour Setting
import {
    polygonStyle
} from '/util/mapPolygonColour.js';

// Import Marker Location Coordinates
import {
    locations
} from '/FrontEnd/FetchMethods/fetchLocationMarkers.js';

// Initialize the Map and Set View to Cardiff Met Landaff Campus
var map = L.map('map').setView([51.496212259288775, -3.2133038818782333], 50);

// Add OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

// Call Map Click Handler - Removable Feature (Developer Only Feature)
mapClickHandler(map); // REMOVE FEATURE ON LAUNCH

// Block O Polygon
L.polygon(buildingCoordsBlockO, polygonStyle).addTo(map);
// Block T Polygon
L.polygon(buildingCoordsBlockT, polygonStyle).addTo(map);
// Block L Polygons
L.polygon(buildingCoordsBlockL, polygonStyle).addTo(map);
// Block P Polygon
L.polygon(buildingCoordsBlockP, polygonStyle).addTo(map);
// Block B Polygon
L.polygon(buildingCoordsBlockB, polygonStyle).addTo(map);
// Block M Polygon
L.polygon(buildingCoordsBlockM, polygonStyle).addTo(map);
// Block N Polygon
L.polygon(buildingCoordsBlockN, polygonStyle).addTo(map);
// Block D Polygon
L.polygon(buildingCoordsBlockD, polygonStyle).addTo(map);
// Block F Polygon
L.polygon(buildingCoordsBlockF, polygonStyle).addTo(map);
// Block A Polygon
L.polygon(buildingCoordsBlockA, polygonStyle).addTo(map);
// Block C Polygon
L.polygon(buildingCoordsBlockC, polygonStyle).addTo(map);

// Adds Lat and Lng Values to Map
locations.forEach(function(location) {
    L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.name);
});