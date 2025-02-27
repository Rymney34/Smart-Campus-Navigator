const sideBarButton = document.getElementById("side-barButton");
const sideBar = document.getElementById("side-bar");

// Event Listener
sideBarButton.addEventListener("click", function() {
    sideBar.classList.toggle("active");
});
