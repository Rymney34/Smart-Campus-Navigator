/**
 * @jest-environment jsdom
 */

jest.mock('../../FrontEnd/Scripts/side-bar.js', () => {
  return jest.fn().mockImplementation(() => ({
    openSideBar: jest.fn(),
  }));
});

jest.mock('../../FrontEnd/Scripts/settings.js', () => {
  return jest.fn().mockImplementation(() => ({
    displaySettingsContent: jest.fn(),
  }));
});


beforeEach(() => {
  document.body.innerHTML = `
    <div id="campus-list-container"></div>
    <div id="settingsButton"></div>
  `;
});

test("renders title and image", async () => {

  const { displayLocationData } = await import('../../FrontEnd/Scripts/displayContent.js');
  const mockData = [{
    name: "Block A",
    title: "Science",
    image: { image: "mock.png" },
    floors: { floorNum: 1 },
    floorLocation: { places: [{ roomNumber: "A.101" }] }
  }];

  displayLocationData(mockData);

  expect(document.getElementById("dynamicTitle").textContent).toBe("Block A");
  expect(document.getElementById("sideBarImage").src).toContain("mock.png");
});


test("creates dropdown options for multiple floors", async () => {
  const { displayLocationData } = await import('../../FrontEnd/Scripts/displayContent.js');

  const mockData = [
    { name: "Block A", title: "Science", image: { image: "img.png" }, floors: { floorNum: 1 }, floorLocation: { places: [] } },
    { name: "Block A", title: "Science", image: { image: "img.png" }, floors: { floorNum: 2 }, floorLocation: { places: [] } },
  ];

  displayLocationData(mockData);

  const options = [...document.querySelectorAll("#floorDropdown option")].map(opt => opt.textContent);
  expect(options).toContain("Floor 1");
  expect(options).toContain("Floor 2");
});


test("handles missing name and image fallback", async () => {
  const { displayLocationData } = await import('../../FrontEnd/Scripts/displayContent.js');

  const mockData = [{
    title: "Arts",
    image: null,
    floors: { floorNum: 0 },
    floorLocation: { places: [] }
  }];

  displayLocationData(mockData);

  expect(document.getElementById("dynamicTitle").textContent).toBe("Unavailable");
  expect(document.getElementById("sideBarImage").alt).toBe("Building Image");
});


test("clears previous DOM before rendering new content", async () => {
  const { displayLocationData } = await import('../../FrontEnd/Scripts/displayContent.js');

  document.getElementById("campus-list-container").innerHTML = "<span id='oldContent'>Old</span>";

  const mockData = [{
    name: "Block X",
    title: "Math",
    image: { image: "mock.png" },
    floors: { floorNum: 0 },
    floorLocation: { places: [] }
  }];

  displayLocationData(mockData);

  expect(document.getElementById("oldContent")).toBeNull(); // old content removed
});