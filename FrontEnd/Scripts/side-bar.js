import Settings from '/Scripts/settings.js';  // Import the Settings class

class SideBar {
    constructor() {
        this.sideBarButton = document.getElementById("side-barButton");
        this.sideBar = document.getElementById("side-bar");
        this.sideBarHeader = document.getElementById("side-barHeader");
        this.campusListContainer = document.getElementById("campus-list-container");
        this.settingsButton = document.getElementById("settingsButton");

        // Instantiate the Settings class with the container ID
        this.settings = new Settings("campus-list-container");  // Pass the ID of the container where the settings will be displayed

        // Bind events
        this.bindEvents();
    }

    // Bind events
    bindEvents() {
        this.sideBarButton.addEventListener("click", () => this.toggleSideBar());
        this.settingsButton?.addEventListener("click", () => this.displaySettings());
    }

    // Toggle Sidebar
    toggleSideBar() {
        this.sideBar.classList.toggle("active");
        this.sideBarButton.classList.toggle("active");
        this.sideBarHeader.classList.toggle("active");

        // Change Icon based on active state
        this.updateButtonIcon();
    }

    // Update the button icon based on sidebar state
    updateButtonIcon() {
        if (this.sideBar.classList.contains("active")) {
            // If the sidebar is active, set button icon to "✖"
            this.sideBarButton.innerHTML = "✖";
        } else {
            // If the sidebar is not active, set button icon to "☰"
            this.sideBarButton.innerHTML = "☰";
        }
    }

    // Handle Settings button click
    displaySettings() {
        this.settings.displaySettingsContent();  // Call the displaySettingsContent method from the Settings class
    }

    // Optionally: Method to open sidebar when data is displayed
    openSideBar() {
        this.sideBar.classList.add("active");
        this.sideBarButton.classList.add("active");
        this.sideBarHeader.classList.add("active");

        // Update the icon when opening the sidebar manually
        this.updateButtonIcon();
    }
}

export default SideBar;
