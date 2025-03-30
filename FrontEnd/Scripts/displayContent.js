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

    if (!titleElement || !imageElement || !roomsElement || !facilitiesElement || !floorDropdownElement) return;

    // Update building title and image (first floor's data as default)
    titleElement.textContent = locationData[0]?.name || "Unknown Building";
    imageElement.src = locationData[0]?.image?.image || "default-image.jpg";
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

        if (selectedFloorData?.floorLocation?.places?.length) {
            roomsElement.textContent = `Rooms: ${selectedFloorData.floorLocation.places.map(room => room.roomNumber).join(', ')}`;
        } else {
            roomsElement.textContent = "Rooms: No rooms available on this floor.";
        }
    };

    // Set default floor selection
    updateRoomsDisplay(floors[0]);

    // Add event listener for dropdown changes
    floorDropdownElement.addEventListener("change", (event) => {
        updateRoomsDisplay(event.target.value);
    });
};

export { displayLocationData };
