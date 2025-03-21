document.addEventListener("DOMContentLoaded", function () {
    const sideBarButton = document.getElementById("side-barButton");
    const sideBar = document.getElementById("side-bar");
    const sideBarHeader = document.getElementById("side-barHeader");

    // Event Listener for toggling the sidebar
    sideBarButton.addEventListener("click", function () {
        sideBar.classList.toggle("active");
        sideBarButton.classList.toggle("active");
        sideBarHeader.classList.toggle("active");

        // Change Icon when Active
        sideBarButton.innerHTML = sideBarButton.innerHTML === "☰" ? "✖" : "☰";
    });
});
