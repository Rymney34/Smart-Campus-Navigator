import { displayLocationData } from "./displayContent.js";
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
                displayLocationData(data.filter(d => {
                    const b = d.name || "Unknown Block";
                    const t = d.title || "Unknown School";
                    const ty = d.locationType?.typeName;
                    const lbl = ty ? `${ty} — ${b}` : `${b} — ${t}`;
                    return lbl === label;
                }));
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

