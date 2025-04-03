import SideBar from '/Scripts/side-bar.js';
import Settings from '/Scripts/settings.js';

const sideBar = new SideBar();
const settings = new Settings("campus-list-container");

const displayLocationData = (locationData) => {
    // Ensure locationData is always an array
    if (!Array.isArray(locationData)) {
        locationData = [locationData]; 
    }

    const titleElement = document.getElementById("dynamicTitle");
    const imageElement = document.getElementById("sideBarImage");
    const roomsElement = document.getElementById("dynamicRooms");
    const facilitiesElement = document.getElementById("dynamicFacilities");
    const floorDropdownElement = document.getElementById("floorDropdown");
    const roomLabel = document.getElementById("roomLabel");
    const facilitiesLabel = document.getElementById("facilitiesLabel");

    if (!titleElement || !imageElement || !roomsElement || !facilitiesElement || !floorDropdownElement) return;

    roomLabel.textContent = "Rooms"
    facilitiesLabel.textContent = "Facilities"

    // Building title and image (first floor's data as default)
    titleElement.textContent = locationData[0]?.name || "Unavailable";
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

    // Function to update rooms display when a floor is selected
    const updateRoomsDisplay = (selectedFloor) => {
        const selectedFloorData = locationData.find(floorData => floorData.floors.floorNum == selectedFloor);
    
        roomsElement.innerHTML = ""; // Clear previous content
    
        if (selectedFloorData?.floorLocation?.places?.length) {
            // Only add room elements if rooms are defined and not empty
            selectedFloorData.floorLocation.places.forEach(room => {
                if (room.roomNumber) {  // Check if roomNumber exists
                    const roomElement = document.createElement("div");
                    roomElement.textContent = `${room.roomNumber}`;
                    roomsElement.appendChild(roomElement);
                }
            });
        } else {
            roomsElement.textContent = "";  // Display nothing if there are no rooms
        }
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
