/**
 * @jest-environment jsdom
 */
import PathFinder from '../../FrontEnd/Models/Path-finder.js';

const mockAddTo = jest.fn(() => ({ bindPopup: jest.fn() }));
const mockSetLatLng = jest.fn();
const mockRoutingControl = {
  on: jest.fn(),
  getPlan: jest.fn(() => ({ setWaypoints: jest.fn() })),
  route: jest.fn(),
  addTo: jest.fn(() => mockRoutingControl),
  remove: jest.fn()
};

global.L = {
  Routing: {
    control: jest.fn(() => mockRoutingControl)
  },
  latLng: (lat, lng) => ({ lat, lng }),
  marker: jest.fn(() => ({
    addTo: mockAddTo,
    setLatLng: mockSetLatLng
  }))
};

describe("PathFinder", () => {
  let mapMock;
  let pathfinder;

  beforeEach(() => {
    mapMock = {
      addControl: jest.fn(),
      removeControl: jest.fn(),
      on: jest.fn(),
      locate: jest.fn(),
      stopLocate: jest.fn()
    };
    pathfinder = new PathFinder(mapMock);
    jest.clearAllMocks();
  });

  test("getSelectedStartLocation() returns live user location if available", () => {
    pathfinder.userLatLng = { lat: 51.5, lng: -3.2 };
    const result = pathfinder.getSelectedStartLocation("live");
    expect(result).toEqual([51.5, -3.2]);
  });

  test("getSelectedStartLocation() returns null if live selected and no user location", () => {
    pathfinder.userLatLng = null;
    const result = pathfinder.getSelectedStartLocation("live");
    expect(result).toBeNull();
  });

  test("getSelectedStartLocation() parses coordinates from dropdown", () => {
    const result = pathfinder.getSelectedStartLocation("[51.48, -3.22]");
    expect(result).toEqual([51.48, -3.22]);
  });

  test("createRoute() sets routing control with waypoints", () => {
    pathfinder.createRoute([51.5, -3.2], [51.49, -3.21]);
    expect(L.Routing.control).toHaveBeenCalled();
    expect(mapMock.removeControl).not.toHaveBeenCalled(); // routingControl was initially null
  });

  test("calculateETA() updates ETA in the DOM", () => {
    const mockEtaElement = { textContent: "" };
    const mockDoc = { getElementById: jest.fn(() => mockEtaElement) };

    let routesFoundCallback;
    mockRoutingControl.on.mockImplementation((event, cb) => {
      if (event === "routesfound") routesFoundCallback = cb;
    });

    pathfinder.calculateETA([51.5, -3.2], [51.49, -3.21], mockDoc);

    // simulate the callback
    routesFoundCallback({
      routes: [{ summary: { totalDistance: 1390 } }]
    });

    expect(mockDoc.getElementById).toHaveBeenCalledWith("eta");
    expect(mockEtaElement.textContent).toContain("17"); // 1390m ≈ 16.7 min -> ceil = 17
  });

  test("setupUserLocation() handles geolocation and sets marker", () => {
    const latlng = { lat: 51.51, lng: -3.2 };
    mapMock.on.mockImplementation((event, cb) => {
      if (event === "locationfound") cb({ latlng });
    });

    pathfinder.setupUserLocation();

    expect(mapMock.locate).toHaveBeenCalled();
    expect(L.marker).toHaveBeenCalledWith(latlng);
  });

  test("createRoute() removes existing routing control before adding new one", () => {
  pathfinder.routingControl = mockRoutingControl;
  pathfinder.createRoute([51.5, -3.2], [51.49, -3.21]);
  expect(mapMock.removeControl).toHaveBeenCalledWith(mockRoutingControl);
});

test("calculateETA() shows 'Location unavailable' if start is null", () => {
  const mockEta = { textContent: "" };
  const mockDoc = { getElementById: jest.fn(() => mockEta) };

  pathfinder.calculateETA(null, [51.49, -3.21], mockDoc);
  expect(mockEta.textContent).toBe("Location unavailable");
});

test("calculateETA() initially sets text to 'Loading'", () => {
  const mockEta = { textContent: "" };
  const mockDoc = { getElementById: jest.fn(() => mockEta) };

  pathfinder.calculateETA([51.5, -3.2], [51.49, -3.21], mockDoc);
  expect(mockEta.textContent).toBe("Loading");
});

});
