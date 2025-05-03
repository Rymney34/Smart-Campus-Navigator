import SideBar from '/Scripts/side-bar.js';
import Settings from '/Scripts/settings.js';

const sideBar = new SideBar();
const settings = new Settings("campus-list-container");

const displayLocationData = (locationData) => {
    // Ensure locationData is always an array
    if (!Array.isArray(locationData)) {
        locationData = [locationData]; 
    }

    // Create and append only the necessary new elements
    const container = document.getElementById("campus-list-container");
    const contentBox = document.createElement("div");
    contentBox.id = "contentBox";
    contentBox.innerHTML = `
        <div><h1 id="dynamicTitle">Llandaff Campus</h1></div>
        <div><h2 id="dynamicBuildingTitle"></h2></div>
        <div><img id="sideBarImage" src="imageUrl" alt=""><h1></h1></div>
        <div id="dropdownContainer">
            <select id="floorDropdown"></select>
        </div>
        <div class = "blockDetailsBlock">
            <div id="buildingInfo">
                <h2 id="roomLabel"></h2>
                <h2 id="facilitiesLabel"></h2>
            </div>
            <div class="lineB"></div>
           
            <div id="buildingInfo">
                <p id="dynamicRooms"></p>
                <p id="dynamicFacilities"></p>
            </div>
        </div>
    `;

    // Append it to the container
    container.innerHTML = ''; // Clear existing content
    container.appendChild(contentBox);

    const titleElement = document.getElementById("dynamicTitle");
    const buildingTitleElement = document.getElementById("dynamicBuildingTitle");
    const imageElement = document.getElementById("sideBarImage");
    const roomsElement = document.getElementById("dynamicRooms");
    const facilitiesElement = document.getElementById("dynamicFacilities");
    const floorDropdownElement = document.getElementById("floorDropdown");
    const roomLabel = document.getElementById("roomLabel");
    const facilitiesLabel = document.getElementById("facilitiesLabel");

    if (!titleElement || !buildingTitleElement || !imageElement || !roomsElement || !facilitiesElement || !floorDropdownElement) return;

    roomLabel.textContent = "Rooms"
    facilitiesLabel.textContent = "Facilities"

    // Building title and image (first floor's data as default)
    titleElement.textContent = locationData[0]?.name || "Unavailable";
    buildingTitleElement.textContent = locationData[0]?.title || "Building Title Unavailable";
    imageElement.src = locationData[0]?.image?.image || "Image Unavailable";
    imageElement.alt = locationData[0]?.name || "Building Image";

    // Clear previous dropdown options
    floorDropdownElement.innerHTML = "";

    // Get unique floor numbers
    const floors = [...new Set(locationData.map(floorData => floorData.floors.floorNum))].sort((a, b) => a - b);

    // Populate the dropdown
    floors.forEach(floorNum => {
        const option = document.createElement("option");
        option.value = floorNum;
        option.textContent = `Floor ${floorNum}`;
        floorDropdownElement.appendChild(option);
    });

    const updateRoomsDisplay = (selectedFloor) => {
        const roomsElement = document.getElementById("dynamicRooms");
        roomsElement.innerHTML = ""; // Clear previous content
    
        // Get all entries for selected floor
        const floorEntries = locationData.filter(floorData => floorData.floors.floorNum == selectedFloor);
    
        // Extract and render all roomNumbers
        floorEntries.forEach(entry => {
            entry.floorLocation?.places?.forEach(place => {
                if (place.roomNumber) {
                    const roomElement = document.createElement("div");
                    roomElement.textContent = place.roomNumber;
                    roomsElement.appendChild(roomElement);
                }
            });
        });
    };
    
    

    // Function to update facilities display when a floor is selected
    const updateFacilitiesDisplay = (selectedFloor) => {
        // Find all entries for the selected floor
        const floorEntries = locationData.filter(floorData => floorData.floors.floorNum == selectedFloor);
        
        // Find the entry that contains locationType (facility)
        const floorWithFacility = floorEntries.find(floorData => floorData.locationType?.typeName);

        if (floorWithFacility) {
            // Display the facility name
            facilitiesElement.textContent = `${floorWithFacility.locationType.typeName}`;
        } else {
            facilitiesElement.textContent = "";
        }
    };

    // Set default floor selection
    updateRoomsDisplay(floors[0]);
    updateFacilitiesDisplay(floors[0]);

    // Open the sidebar when data is displayed
    sideBar.openSideBar();  // Call the method to open the sidebar

    // Add event listener for dropdown changes
    floorDropdownElement.addEventListener("change", (event) => {
        updateRoomsDisplay(event.target.value);
        updateFacilitiesDisplay(event.target.value);
    });
};

// Event listener for the settings button
document.getElementById("settingsButton").addEventListener("click", function() {
    settings.displaySettingsContent(); // Call the method to display the settings content
});

export { displayLocationData };
