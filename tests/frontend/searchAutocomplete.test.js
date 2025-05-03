/// <reference lib="dom" />
/**
 * @jest-environment jsdom
 */

// Setup fake DOM elements
beforeEach(() => {
  document.body.innerHTML = `
    <input id="searchBar" />
    <div id="autocompleteList"></div>
  `;
});

// Mock displayLocationData and showPopupMenu
const displayLocationData = jest.fn();
const showPopupMenu = jest.fn();

// Stub locations list and Location class
const locations = [{ name: "Block A", lat: 1, lng: 2 }];
class Location {
  constructor(name, lat, lng) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }
}

// Import and inject logic manually (simulate script setup)
const searchLogic = async (query, data) => {
  const searchBar = document.getElementById("searchBar");
  const autocompleteList = document.getElementById("autocompleteList");
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
      const match = locations.find(loc => loc.name === item.name);
      if (match) {
        const location = new Location(match.name, match.lat, match.lng);
        showPopupMenu(location);
      }
      displayLocationData([item]);
      autocompleteList.innerHTML = "";
      searchBar.value = "";
    });
    autocompleteList.appendChild(entry);
  });
};

// ----------------------------
// ✅ Unit Tests
// ----------------------------
test("renders unique suggestions and handles click", async () => {
  const fakeData = [
    { name: "Block A", title: "School of Art" },
    { name: "Block A", title: "School of Art" }, // duplicate
    { name: "Block B", title: "School of Design" },
  ];

  await searchLogic("block", fakeData);

  const items = document.querySelectorAll(".autocomplete-item");
  expect(items.length).toBe(2);
  expect(items[0].textContent).toContain("Block A");
  expect(items[1].textContent).toContain("Block B");

  items[0].click();
  expect(displayLocationData).toHaveBeenCalledWith([fakeData[0]]);
  expect(showPopupMenu).toHaveBeenCalled();
});

test("handles no input", async () => {
  document.getElementById("searchBar").value = "";
  await searchLogic("", []);
  expect(document.getElementById("autocompleteList").innerHTML).toBe("");
});