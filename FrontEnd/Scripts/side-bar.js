document.addEventListener("DOMContentLoaded", function () {
    const sideBarButton = document.getElementById("side-barButton");
    const sideBar = document.getElementById("side-bar");
    const sideBarHeader = document.getElementById("side-barHeader");
    const campusListContainer = document.getElementById("campus-list-container");
  
    // Event Listener for toggling the sidebar
    sideBarButton.addEventListener("click", function () {
      sideBar.classList.toggle("active");
      sideBarButton.classList.toggle("active");
      sideBarHeader.classList.toggle("active");
  
      // Change Icon when Active
      sideBarButton.innerHTML = sideBarButton.innerHTML === "☰" ? "✖" : "☰";
  
      // Toggle background color
      if (sideBar.classList.contains("active")) {
        campusListContainer.style.backgroundColor = "rgba(255, 255, 255, 1)";
      }
  
      document.getElementById("settingsButton").addEventListener("click", function() {
        campusListContainer.style.backgroundColor = "rgba(255, 255, 255, 0)";
        displaySettingsContent();
      });
    });
  });
  