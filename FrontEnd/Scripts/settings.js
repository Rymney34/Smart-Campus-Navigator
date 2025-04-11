class Settings {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    displaySettingsContent() {
        this.container.innerHTML = `
            <div id="settingsContentDiv">

                <div id="titleContainer">
                 
                    <h1 id="settingsTitleText">Settings</h1>
                    <p>Click the links below</p>
                </div>
                <div id="versionContainer">
                    <a href="about.html"><h1 id="setTitleText" >About the App</h1></a>
                    <p id="smallAboutAppText">Version Info, Credits</p>
                </div>
                <div id="feedbackContainer">
                    <a href="feedback.html"><h1 id="setTitleText" >Feedback & Support</h1></a>
                    <p id="smallFeedbackText">Help Improve the App</p>
                </div>
            </div>
        `;
    }
}



// Export the Settings class so it can be used elsewhere
export default Settings;
