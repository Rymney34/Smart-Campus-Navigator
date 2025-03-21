document.getElementById("settingsButton").addEventListener("click", function() {
    displaySettingsContent();
});

function displaySettingsContent() {
    let campusListContainer = document.getElementById("campus-list-container");

    // Optional: Modify the settings content dynamically
    campusListContainer.innerHTML = `
            <div><h1>Settings</h1></div>
                <div><img src="" alt=""><h1>Img Here</h1></div>
                <div id="buildingInfo">
                    <!--Facilities Inside Building-->
                    <h1>|Rooms|</h1>
                    <!--Rooms Inside Building-->
                    <h1>|Facilities|</h1>
                </div>
    `;
}
