
async function fetchBuildingData() {
    try {
        const response = await fetch('/api/buildings'); 
        const data = await response.json(); 


        const campusListContainer = document.getElementById('campus-list-container');


        if (data.length > 0) {

            const campusList = document.createElement('ul');
            data.forEach(building => {
                const listItem = document.createElement('li');
                

                const facilitiesList = building.facilities && Array.isArray(building.facilities) 
                    ? building.facilities.map(facility => {

                        return `${facility.facilityName} (Open: ${facility.facilityOpenTime} - Close: ${facility.facilityCloseTime})`;
                    }).join(', ')
                    : 'No facilities listed';
                
                listItem.textContent = `${building.name} - ${building.type} | Open: ${building.openTime} - Close: ${building.closeTime} | Facilities: ${facilitiesList}`;
                campusList.appendChild(listItem);
            });


            campusListContainer.appendChild(campusList);
        } else {
            campusListContainer.innerHTML = '<p>No building data available</p>';
        }
    } catch (error) {
        console.error('Error fetching building data:', error);
    }
}


fetchBuildingData();