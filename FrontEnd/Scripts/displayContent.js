// display.Content.js

// Function to display location data in the sidebar
const displayLocationData = (locationData) => {
    const titleElement = document.getElementById("dynamicTitle");
    const imageElement = document.getElementById("sideBarImage");
    const roomsElement = document.getElementById("dynamicRooms");
    const facilitiesElement = document.getElementById("dynamicFacilities");

    // Assuming locationData contains fields for title, image URL, rooms, and facilities
    if (titleElement && imageElement && roomsElement && facilitiesElement) {
        // Clear any previous content
        titleElement.textContent = locationData.name;
        imageElement.src = locationData.image.image;
        imageElement.alt = locationData.name;

        if (locationData.floorLocation && locationData.floorLocation.places) {
            roomsElement.textContent = `Rooms: ${locationData.floorLocation.places.map(room => room.roomNumber).join(', ')}`;
        } else {
            roomsElement.textContent = "Rooms: Not Available";
        }
        facilitiesElement.textContent = `Facilities: ${locationData.facilities}`;
    }
};

export { displayLocationData };