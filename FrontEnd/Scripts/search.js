import { displayLocationData } from "./displayContent.js";
import { showPopupMenu } from "./index.js";
import { locations } from "../Assets/FetchMethods/fetchLocationMarkers.js";
import Location from "../Models/Location.js"
const autocompleteList = document.getElementById("autocompleteList");

searchBar.addEventListener("input", async function () {
    const query = searchBar.value.trim();
    if (!query) {
        autocompleteList.innerHTML = "";
        return;
    }

    try {
        const response = await fetch(`/getSearchData/${encodeURIComponent(query)}`);
        const data = await response.json();

        // Remove old list
        autocompleteList.innerHTML = "";

        const seen = new Set();

        data.forEach(item => {
            const building = item.name || "Unknown Block";
            const title = item.title || "Unknown School";
            const type = item.locationType?.typeName;
            const label = type ? `${type} — ${building}` : `${building} — ${title}`;

            if (seen.has(label)) return;
            seen.add(label);

            const entry = document.createElement("div");
            entry.classList.add("autocomplete-item");
            entry.textContent = label;

            entry.addEventListener("click", () => {
                const matchingItems = data.filter(d => {
                    const b = d.name || "Unknown Block";
                    const t = d.title || "Unknown School";
                    const ty = d.locationType?.typeName;
                    const lbl = ty ? `${ty} — ${b}` : `${b} — ${t}`;
                    return lbl === label;
                });
            
                if (matchingItems.length > 0) {
                    const first = matchingItems[0];
                    // This updates the popup/ETA/GO logic just like clicking a map marker
                    const match = locations.find(loc => loc.name === item.name);

                if (match) {
                    const location = new Location(match.name, match.lat, match.lng); // or however you construct it
                    showPopupMenu(location);
                } else {
                    console.warn("Could not find matching Location object for popup menu.");
                }
                displayLocationData(matchingItems); 


                }
            
                autocompleteList.innerHTML = "";
                searchBar.value = "";
            });

            autocompleteList.appendChild(entry);
        });

    } catch (error) {
        console.error("Autocomplete fetch failed", error);
        autocompleteList.innerHTML = "";
    }
});

// Hide dropdown if user clicks elsewhere
document.addEventListener("click", (event) => {
    if (!autocompleteList.contains(event.target) && event.target !== searchBar) {
        autocompleteList.innerHTML = "";
    }
});

searchBar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const firstItem = document.querySelector(".autocomplete-item");
        if (firstItem) {
            firstItem.click(); 
        } else {
            alert("No matching results found.");
        }
    }
});

