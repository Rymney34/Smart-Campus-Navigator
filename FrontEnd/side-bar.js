const sideBarButton = document.getElementById("side-barButton");
const sideBar = document.getElementById("side-bar");

// Event Listener
sideBarButton.addEventListener("click", function() {
    sideBar.classList.toggle("active");
});

// Fetch data from the backend (Express API)
fetch('/items')
  .then(response => response.json())
  .then(data => {
    // Display data in the HTML element
    const databaseRetrieveElement = document.getElementById('databaseRetrieve');

    // Assuming you want to display the names of items as a simple example
    const itemsNames = data.map(item => item.name).join(', ');  // Get all item names
    databaseRetrieveElement.innerHTML = `Items: ${itemsNames}`;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    const databaseRetrieveElement = document.getElementById('databaseRetrieve');
    databaseRetrieveElement.innerHTML = 'Error retrieving data';
  });
