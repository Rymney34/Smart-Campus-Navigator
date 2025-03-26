document.getElementById("searchBar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        campusListContainer.style.backgroundColor = "rgba(255, 255, 255, 1)";
        performSearch();
    }
});

function performSearch() {
    let searchBar = document.getElementById("searchBar"); 
    let query = searchBar.value.trim();

    if (query) {
        updateCampusList(query);
    }

    // Clear input field after search
    searchBar.value = "";
}

// Example: Update the campus list based on search results
function updateCampusList(query) {
    let campusListContainer = document.getElementById("campus-list-container");
    
    // Display Search Query Data
    campusListContainer.innerHTML = 
    
    `
    <div><h1>Block No. - School of ?</h1></div>
                <div><img src="" alt=""><h1>Img Here</h1></div>
                <div id="buildingInfo">
                    <!--Facilities Inside Building-->
                    <h1>|Rooms|</h1>
                    <!--Rooms Inside Building-->
                    <h1>|Facilities|</h1>
                </div>
    `;
}
