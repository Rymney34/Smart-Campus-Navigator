
var bounds = L.latLngBounds(
    L.latLng(51.494, -3.216), // South-West corner
    L.latLng(51.498, -3.210)  // North-East corner
);

// Initialize the Map and Set View to Cardiff Met Landaff Campus
var map = L.map('map', {
    minZoom: 15,
    maxBounds: bounds, // Restrict panning
    maxBoundsViscosity: 1.0 // Prevents dragging outside the bounds
}).setView([51.496212259288775, -3.2133038818782333], 50);

// Add OpenStreetMap Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; CartoDB'
}).addTo(map);

var routingControl = null;
var userLatLng = null;


function setupUserLocation(map) {
    var userMarker = null;

    // Locate user without auto-centering or zooming
    map.locate({ enableHighAccuracy: true, setView: false });

    map.on('locationfound', function (e) {
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


// Add Event Listener to Display Click Events on the Map
    // Main use is to find the Coordinates of the building edges 
    // to create the polygon representing the Uni's buildings
    // Click on map and you will see the lat & long value of that specific point
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

    // Building Coordinates
// Block O
var buildingCoordsBlockO = [
    [51.496871365660304, -3.2151210308074956],
    [51.49660104392152, -3.2154268026351933],
    [51.496497477686766, -3.2151946593982],
    [51.49647409988314, -3.215216117070319],
    [51.496367229771046, -3.2150121028491823],
    [51.49638726793615, -3.2149800945581446],
    [51.49615348879516, -3.2144543459477974],
    [51.49627037851551, -3.2143041303618274],
    [51.49628373732162, -3.2143309643331124],
    [51.496303775523415, -3.2143041303618274],
    [51.49627371821741, -3.2142290641528386],
    [51.49639058235537, -3.2141114746773214]
];

// Block T
var buildingCoordsBlockT = [
    [51.496304093246195, -3.2139408944849106],
    [51.49622696236867, -3.214041273878368],
    [51.49621360354594, -3.214019863730813],
    [51.4961639881219, -3.2140903318443175],
    [51.49617066032005, -3.2141225005305123],
    [51.496066564178896, -3.2142298601894153],
    [51.49594642626896, -3.214014095353937],
    [51.49597679790534, -3.2139817186979602],
    [51.495645849960425, -3.2133381192764636],
    [51.49578945888844, -3.21317435601771],
    [51.49601990017624, -3.2136247176091697],
    [51.49609337396509, -3.213522897634538]

];
// Block M
var buildingCoordsBlockM = [
    [51.497081918880454, -3.2136515248467594],
    [51.496621594668184, -3.2142671556567897],
    [51.496507496741785, -3.214035553026056],
    [51.49661094741552, -3.2138916761118135],
    [51.49659432845972, -3.2138531746941794],
    [51.49662104587813, -3.2137941542147157],
    [51.496664461649615, -3.2137887779155294],
    [51.49669117902693, -3.213816015845681],
    [51.49680806736843, -3.2136922777967145],
    [51.496794708716, -3.213665408182001],
    [51.49698197139272, -3.2134410352802028]
];
// Block N
var buildingCoordsBlockN = [
    [51.49684814330224, -3.2136010351656434],
    [51.49670453770969, -3.2134562077599753],
    [51.49659432845972, -3.213247019219106],
    [51.496814746693175, -3.2128768743750507],
    [51.4969650312412, -3.213303096109397],
    [51.496934974371236, -3.213343578743642],
    [51.49697838984373, -3.2134400432190295]
];
// Block D
var buildingCoordsBlockD = [
    [51.49618354618045, -3.2128017428247495],
    [51.49603386923149, -3.212549971583674],
    [51.49596707842493, -3.2124280929565434],
    [51.495722978220336, -3.212753587809514],
    [51.495796138362444, -3.212866109895563],
    [51.49580281783548, -3.212860745477533],
    [51.495839554919684, -3.213001126295463],
    [51.495913028999226, -3.213091415452814],
    [51.495956445445096, -3.2130324187356223],
    [51.495916368727286, -3.2128935557570464],
    [51.495846234386335, -3.212807053772651],
    [51.495916368727286, -3.2127173557200654],
    [51.496046617931334, -3.2129733982561586],
    [51.49603659877502, -3.2129894796290923],
    [51.496220282957786, -3.2133435549813503],
    [51.49623364177857, -3.2133274854895526],
    [51.49627371821741, -3.213409258685707],
    [51.49639060762948, -3.2132258348132767]
];
// Block E
var buildingCoordsBlockE = [
    
];
// Block L
var buildingCoordsBlockL = [
    [51.49565252945548, -3.2133282934072653],
    [51.495632490967374, -3.2132899464444806],
    [51.4955423176619, -3.2134133518214574],
    [51.495448804415936, -3.2132254783789747],
    [51.49570262563719, -3.212903684584044],
    [51.49579687854288, -3.2130922590139543],
    [51.49572994655542, -3.2131844758987427],
    [51.49574604228349, -3.2132155396411815],

];
// Block B
var buildingCoordsBlockB = [
    [51.496834784661544, -3.212673014608763],
    [51.496507496741785, -3.2131098671513625],
    [51.49622696236867, -3.212560361830137],
    [51.49656047313556, -3.2121196715934746]
];
// Block A
var buildingCoordsBlockA = [
    [51.49617686676321, -3.2121097150722067],
    [51.49621082348317, -3.2120472192764287],
    [51.496136790239184, -3.2118951145887435],
    [51.49608669453465, -3.211857623068235],
    [51.49598650296033, -3.211991709756708],
    [51.495976483790784, -3.2119602004736647],
    [51.49620024471927, -3.211648434527366],
    [51.49610673282308, -3.21144453911767],
    [51.495849574119305, -3.2117931906461776],
    [51.496083672543335, -3.212265342572994],
    [51.495966464619045, -3.212427974145123],
    [51.49603650129132, -3.212544339847837],
    [51.496414230995875, -3.2120954990386967],
    [51.49646408082076, -3.212013131785399],
    [51.49638371883475, -3.2118726351181586],
    [51.49619356530447, -3.212142032272962]
];
// Block F
var buildingCoordsBlockF = [
    [51.496497477686766, -3.2118576468305275],
    [51.49635387098941, -3.211831709901383],
    [51.49635387098941, -3.2118642112612066],
    [51.496307115222876, -3.2118576111870993],
    [51.49630698524539, -3.21182988016546],
    [51.49628373732162, -3.211825484084641],
    [51.49625368000241, -3.2116377056913064],
    [51.49625368000241, -3.211610883601158],
    [51.49619022559672, -3.2116054716585634],
    [51.49618354618045, -3.211610883601158],
    [51.49610673282308, -3.211449951060264],
    [51.496180206471955, -3.2113211099784005],
    [51.496220282957786, -3.2113961999496814],
    [51.49627705791906, -3.2114070475971817],
    [51.49628707702255, -3.2112996998308656],
    [51.49641064578431, -3.21127894018926],
    [51.4963972870154, -3.2114820900438783],
    [51.49645406175622, -3.2114928069987823],
    [51.49645072206752, -3.211600095359378],
    [51.49651083642631, -3.211616248019187]
];
// Block P
var buildingCoordsBlockP = [
    [51.49546550322393, -3.2132061236918017],
    [51.49545214417801, -3.2131825630347364],
    [51.495382009122785, -3.2132684412477968],
    [51.49535343880558, -3.2132005691528325],
    [51.495373455752315, -3.2131683826446538],
    [51.49517828287418, -3.212844640342288],
    [51.49526002627111, -3.2125568389892583],
    [51.49530853418729, -3.2125335040965597],
    [51.49533952729395, -3.212592892891462],
    [51.495462163462825, -3.2124155106621974],
    [51.495592413964744, -3.212678343383364],
    [51.49550224057998, -3.212801760641478],
    [51.495602433218714, -3.2130216898995627]
];
// Block C
var buildingCoordsBlockC  = [
    [51.49589678890499, -3.2125184563830453],
    [51.495796138362444, -3.2122468255972008],
    [51.495599093467625, -3.212481110441226],
    [51.49550224057998, -3.212313574838495],
    [51.49573001154698, -3.2120043039321904],
    [51.4957033261021, -3.2119452953338627],
    [51.4958000810753, -3.211816549301148],
    [51.495849574119305, -3.2117932500518775],
    [51.49608702671106, -3.2122671604156494]
];

    // Car Park Coordinates 
// Staff Car Park 1
var carParkStaff1  = [
];
// Staff Car Park 2
var carParkStaff2  = [
];
// Staff Car Park 3
var carParkStaff3  = [
];
// Staff Car Park 4
var carParkStaff4  = [
];
// Staff Car Park 5
var carParkStaff5  = [
];
// Staff Car Park 6
var carParkStaff6  = [
];
// Clinic Car Park
var carParkClinic = [
];
// Reserverd Parking and Authorised Visitors Only
var carParkReservedParking   = [
];

// Polygon Style - Not Selected
    // Main Function is to Change the Outline, Fill Colour and Opacity
    // of The Polygons Representing the Uni Buildings
var polygonStyleIdle = {
    color: "blue",
    fillColor: "blue",
    fillOpacity: 0.5,
};
// Polygon Style - Selected
    // When User Selects a Building the Color will change
    // To highlight the current buidling being Viewed
        // ! Feature Not Implemented Yet - JH!
var polygonStyleSelected = {
    color: "Red",
    fillColor: "Red",
    fillOpacity: 0.5,
};

// Block O Polygon
L.polygon(buildingCoordsBlockO, polygonStyleSelected).addTo(map);
// Block T Polygon
L.polygon(buildingCoordsBlockT, polygonStyleIdle).addTo(map);
// Block L Polygons
L.polygon(buildingCoordsBlockL, polygonStyleIdle).addTo(map);
// Block P Polygon
L.polygon(buildingCoordsBlockP, polygonStyleIdle).addTo(map);
// Block B Polygon
L.polygon(buildingCoordsBlockB, polygonStyleIdle).addTo(map);
// Block M Polygon
L.polygon(buildingCoordsBlockM, polygonStyleIdle).addTo(map);
// Block N Polygon
L.polygon(buildingCoordsBlockN, polygonStyleIdle).addTo(map);
// Block D Polygon
L.polygon(buildingCoordsBlockD, polygonStyleIdle).addTo(map);
// Block F Polygon
L.polygon(buildingCoordsBlockF, polygonStyleIdle).addTo(map);
// Block A Polygon
L.polygon(buildingCoordsBlockA, polygonStyleIdle).addTo(map);
// Block C Polygon
L.polygon(buildingCoordsBlockC, polygonStyleIdle).addTo(map);

// Lat and Lng Values of All Markers on Map
var locations = [
    { lat: 51.49651417611058, lng: -3.2147777080535893, name: "Block O" },
    { lat: 51.496527534845214, lng: -3.212637305259705, name: "Block B" },
    { lat: 51.49623698148315, lng: -3.2115215063095097, name: "Block F" },
    { lat: 51.496687839355616, lng: -3.213887214660645, name: "Block M" },
    { lat: 51.496767991399395, lng: -3.213313221931458, name: "Block N" },
    { lat: 51.496130110815095, lng: -3.2129967212677006, name: "Block D" },
    { lat: 51.49599652212769, lng: -3.2137745618820195, name: "Block T" },
    { lat: 51.49558573446089, lng: -3.2131415605545044, name: "Block L" },
    { lat: 51.49531521373177, lng: -3.212787508964539, name: "Block P" },
    { lat: 51.49601990017624, lng: -3.212036490440369, name: "Block A" },
    { lat: 51.49580949730753, lng: -3.2121276855468754, name: "Block C" }, 
];

// Adds Lat and Lng Values to Map
locations.forEach(function(location) {
    L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.name);
});

locations.forEach(function(location) {
    var marker = L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(location.name);

    marker.on('click', function () {
        if (!userLatLng) {
            setupUserLocation(map);
            return;
        }

        // Remove previous route if it exists
        if (routingControl) {
            map.removeControl(routingControl);
        }

        // Generate route from user to clicked marker
        routingControl = L.Routing.control({
            waypoints: [
                userLatLng, // User's current location
                L.latLng(location.lat, location.lng) // Marker location
            ],
            routeWhileDragging: true,
            
        }).addTo(map);

        setTimeout(() => {
            document.querySelectorAll(".leaflet-routing-container").forEach(el => el.style.display = "none");
        }, 100);
    });
});
