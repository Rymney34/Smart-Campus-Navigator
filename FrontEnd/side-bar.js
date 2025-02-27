const sideBarButton = document.getElementById("side-barButton");
const sideBar = document.getElementById("side-bar");

// Event Listener for toggling the sidebar
sideBarButton.addEventListener("click", function() {
    sideBar.classList.toggle("active");
});