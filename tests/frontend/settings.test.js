/// <reference lib="dom" />
/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
      <div id="settingsDiv">
        <div id="settingsButtonDiv">
          <button id="settingsButton">Settings</button>
        </div>
      </div>
      <div id="settingsContentDiv" style="display: none;">Settings content</div>
    `;
  
    const settingsButton = document.getElementById("settingsButton");
    const settingsContentDiv = document.getElementById("settingsContentDiv");
  
    settingsButton.addEventListener("click", () => {
      settingsContentDiv.style.display =
        settingsContentDiv.style.display === "none" ? "block" : "none";
    });
  });
  
  test("settings button toggles visibility of settings content", () => {
    const button = document.getElementById("settingsButton");
    const content = document.getElementById("settingsContentDiv");
  
    expect(content.style.display).toBe("none");
    button.click();
    expect(content.style.display).toBe("block");
    button.click();
    expect(content.style.display).toBe("none");
  });