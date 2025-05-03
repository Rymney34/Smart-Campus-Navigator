/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
      <select id="floorDropdown"></select>
      <div id="dynamicRooms"></div>
    `;
  });
  
  function populateDropdown(floors) {
    const dropdown = document.getElementById("floorDropdown");
    dropdown.innerHTML = "";
  
    floors.forEach(floorNum => {
      const option = document.createElement("option");
      option.value = floorNum;
      option.textContent = `Floor ${floorNum}`;
      dropdown.appendChild(option);
    });
  }
  
  function updateRoomsDisplay(selectedFloor, locationData) {
    const roomsElement = document.getElementById("dynamicRooms");
    const selectedFloorData = locationData.find(d => d.floors.floorNum == selectedFloor);
  
    roomsElement.innerHTML = "";
    if (selectedFloorData?.floorLocation?.places?.length) {
      selectedFloorData.floorLocation.places.forEach(room => {
        const div = document.createElement("div");
        div.textContent = room.roomNumber;
        roomsElement.appendChild(div);
      });
    }
  }
  
  test("dropdown populates floor options correctly", () => {
    populateDropdown([0, 1, 2]);
  
    const options = Array.from(document.querySelectorAll("#floorDropdown option"));
    expect(options.map(o => o.textContent)).toEqual(["Floor 0", "Floor 1", "Floor 2"]);
  });
  
  test("selecting a floor updates room display", () => {
    const sampleData = [
      {
        floors: { floorNum: 1 },
        floorLocation: { places: [{ roomNumber: "O.101" }, { roomNumber: "O.102" }] }
      }
    ];
  
    updateRoomsDisplay(1, sampleData);
  
    const roomElements = Array.from(document.querySelectorAll("#dynamicRooms div"));
    expect(roomElements.map(el => el.textContent)).toEqual(["O.101", "O.102"]);
  });
  