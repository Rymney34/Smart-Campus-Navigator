import { displayLocationData } from "./displayContent.js";
document.getElementById("searchBar").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        let campusListContainer = document.getElementById("campus-list-container");
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
async function updateCampusList(query) {
    try {
        const response = await fetch(`/getSearchData/${encodeURIComponent(query)}`);
        const data = await response.json();

        if (!data || data.length === 0) {
            document.getElementById("campus-list-container").innerHTML = "<p>No results found.</p>";
            return;
        }

        // ✅ Reuse the same layout renderer
        displayLocationData(data);

    } catch (error) {
        console.error("Search error:", error);
        document.getElementById("campus-list-container").innerHTML = "<p>Something went wrong while searching.</p>";
    }
}