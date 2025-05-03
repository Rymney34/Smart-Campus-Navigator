/// <reference lib="dom" />
/**
 * @jest-environment jsdom
 */

// Setup fake DOM structure before each test
beforeEach(() => {
  document.body.innerHTML = `
    <div id="popupMenu">
      <div id="popupHeader"></div>
      <div id="popupContent">
        <div class="location-input">
          <select id="startLocationSelect">
            <option value="live">Live Location</option>
          </select>
        </div>
        <div class="location-input">
          <p id="destinationText"></p>
        </div>
        <div class="eta-go-container">
          <div class="eta-box">
            <span id="eta">-- min</span>
          </div>
          <div class="go-button-container">
            <button id="goButton">GO</button>
          </div>
        </div>
      </div>
    </div>
  `;
});

// Mock the PathFinder class
const mockCalculateETA = jest.fn();
const mockCreateRoute = jest.fn();
const mockRemoveControl = jest.fn();
const mockGetSelectedStartLocation = jest.fn(() => [51.5, -3.2]);

class FakePathFinder {
  constructor(map) {
    this.map = map;
    this.routingControl = { remove: mockRemoveControl };
  }
  calculateETA(...args) {
    return mockCalculateETA(...args);
  }
  createRoute(...args) {
    return mockCreateRoute(...args);
  }
  getSelectedStartLocation() {
    return mockGetSelectedStartLocation();
  }
}

let showPopupMenu;

beforeEach(() => {
  const popupMenu = document.getElementById("popupMenu");
  const startLocationSelect = document.getElementById("startLocationSelect");
  const destinationText = document.getElementById("destinationText");
  const eta = document.getElementById("eta");
  const goButton = document.getElementById("goButton");

  let currentTargetLocation = null;
  const p = new FakePathFinder(null);

  const resetGoButton = () => {
    popupMenu.style.display = "block";
    goButton.textContent = "GO";
    goButton.style.background = "red";
    goButton.style.border = "none";

    goButton.onclick = () => {
      const startLocation = p.getSelectedStartLocation();
      if (!startLocation) return;
      p.createRoute(startLocation, currentTargetLocation);
      goButton.textContent = "END";
      goButton.style.background = "#444";
      goButton.style.border = "2px solid red";
      goButton.onclick = () => {
        p.routingControl.remove();
        popupMenu.style.display = "none";
        resetGoButton();
      };
    };
  };

  showPopupMenu = (location) => {
    currentTargetLocation = [location.lat, location.lng];
    destinationText.textContent = location.name;
    popupMenu.style.display = "block";
    const startLocation = p.getSelectedStartLocation();
    if (startLocation) {
      p.calculateETA(startLocation, currentTargetLocation, document);
    }
    resetGoButton();
  };
});


test("popup displays destination and calculates ETA", () => {
  const fakeLocation = { name: "Block Z", lat: 51.5, lng: -3.2 };
  showPopupMenu(fakeLocation);

  expect(document.getElementById("popupMenu").style.display).toBe("block");
  expect(document.getElementById("destinationText").textContent).toBe("Block Z");
  expect(mockCalculateETA).toHaveBeenCalled();
});

test("clicking GO calls createRoute, then END removes route", () => {
  const fakeLocation = { name: "Block Y", lat: 51.5, lng: -3.2 };
  showPopupMenu(fakeLocation);

  const goButton = document.getElementById("goButton");
  goButton.click();
  expect(mockCreateRoute).toHaveBeenCalled();

  goButton.click(); // now should remove
  expect(mockRemoveControl).toHaveBeenCalled();
});

test("start location dropdown contains default and additional options", () => {
    const select = document.getElementById("startLocationSelect");
  
    const newOption = document.createElement("option");
    newOption.value = "custom";
    newOption.textContent = "Block A";
    select.appendChild(newOption);
  
    expect(select.children.length).toBeGreaterThanOrEqual(2);
    expect(select.options[1].textContent).toBe("Block A");
  });

test("calculateETA is passed correct arguments", () => {
    const fakeLocation = { name: "Cafe", lat: 51.499, lng: -3.201 };
    showPopupMenu(fakeLocation);
  
    const expectedTarget = [51.499, -3.201];
    const expectedStart = [51.5, -3.2];
  
    expect(mockCalculateETA).toHaveBeenCalledWith(expectedStart, expectedTarget, document);
  });
  