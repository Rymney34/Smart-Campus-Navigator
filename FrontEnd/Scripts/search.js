document.getElementById("searchBar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        performSearch();
    }
});

async function performSearch() {
    let searchBar = document.getElementById("searchBar"); 
    let query = searchBar.value.trim();

    if (query) {
        updateCampusList(query); // Fetch and display block info
    }

    // Clear the input field after search
    searchBar.value = "";
}

async function updateCampusList(query) {
    let campusListContainer = document.getElementById("campus-list-container");

    try {
        // Send request to backend to fetch the image for the block
        const response = await fetch(`http://localhost:3000/api/images/block/${query}`);
        const data = await response.json();

        if (response.ok) {
            // Update the campus list container with the block's information and image
            campusListContainer.innerHTML = `
                <div>
                    <h1>Block: ${query}</h1>
                </div>
                <div>
                    <img id="sideBarImage" src="${data.image}" alt="Image for ${query}">
                </div>
                <div id="buildingInfo">
                    <h1>|Rooms|</h1>
                    <h1>|Facilities|</h1>
                </div>
            `;
        } else {
            campusListContainer.innerHTML = `
                <div><h1>No image found for ${query}</h1></div>
            `;
        }
    } catch (error) {
        console.error("Error fetching block image:", error);
        campusListContainer.innerHTML = `
            <div><h1>Error fetching image for ${query}</h1></div>
        `;
    }
}
