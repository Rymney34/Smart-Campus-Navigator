/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
      <div id="side-bar" class="side-bar">
        <div id="side-barHeader">
          <div id="side-barButtonDiv">
            <button id="side-barButton">☰</button>
          </div>
        </div>
      </div>
    `;
  
    const sideBar = document.getElementById("side-bar");
    const sideBarButton = document.getElementById("side-barButton");
  
    // Mock toggle logic
    sideBarButton.addEventListener("click", () => {
      sideBar.classList.toggle("active");
    });
  });
  
  test("clicking sidebar button toggles active class", () => {
    const sideBar = document.getElementById("side-bar");
    const sideBarButton = document.getElementById("side-barButton");
  
    expect(sideBar.classList.contains("active")).toBe(false);
    sideBarButton.click();
    expect(sideBar.classList.contains("active")).toBe(true);
    sideBarButton.click();
    expect(sideBar.classList.contains("active")).toBe(false);
  });
  