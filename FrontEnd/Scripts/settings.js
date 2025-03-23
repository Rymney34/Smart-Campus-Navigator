const campusListContainer = document.getElementById("campus-list-container");

campusListContainer.backgroundColor = "rgba(0, 0, 0, 0)";

document.getElementById("settingsButton").addEventListener("click", function() {
    campusListContainer.backgroundColor = "rgba(0, 0, 0, 0)";
    displaySettingsContent();
});

function displaySettingsContent() {
    let campusListContainer = document.getElementById("campus-list-container");

    // Optional: Modify the settings content dynamically
    campusListContainer.innerHTML = 
    `
                <div id="settingsContentDiv">
                    <div id="titleContainer">
                        <h1 id="settingsTitleText" >Settings</h1>
                        <p>Click the links below</p>
                    </div>
                    <div id="fontSizeContainer">
                        <a href=""><h1>Font Size</h1></a>
                        <p id="smallFontSizeText" >Small, Medium, Large</p>
                    </div>
                    <div id="versionContainer">
                        <a href=""><h1>About the App</h1></a>
                        <p id="smallAboutAppText" >Version Info, Credits</p>
                    </div>
                    <div id="feedbackContainer">
                        <a href="feedback.html"><h1>Feedback & Support</h1></a>
                        <p id="smallFeedbackText" >Help Improve the App</p>
                    </div>
                </div>
    `;
}
