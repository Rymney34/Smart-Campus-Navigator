export const getAllIcons = async () => {
    try {
        // Fetch all block icons from the server (base64 images)
        const response = await fetch("/getFacilitiesicons");
        const data = await response.json();

        console.log("Icons fetched:", data);


    } catch (error) {
        console.error("Error fetching icons:", error);
    }
};

// Function to get all location data by iterating over blockIds
export const getAllLocationData = async () => {
        // List of block IDs
    const blockIDList = [
        "67b916474df331b174fe8e85", "67cb4e7f1c224389bba721b7", "67cb56401f88ff0276348311", "67cb56401f88ff0276348312", "67cb56401f88ff0276348313", "67cb56401f88ff0276348310", 
        "67cb56401f88ff0276348316", "67cb56401f88ff0276348315", "67cb56401f88ff0276348314", "67b90f414df331b174fe8e83", "67cb4e7f1c224389bba721b8", "67cb49e353dce04fb8017212"
    ];
    try {
        // Fetch data for all blockIds from blockIDList and aggregate the results
        const locationDataPromises = blockIDList.map(async (blockId) => {
            try {
                const response = await fetch(`/getLocations/${blockId}`);
                let data = await response.json();

                // Ensure it's always an array
                return Array.isArray(data) ? data : [data];
            } catch (error) {
                console.error("Error fetching location data for blockId:", blockId, error);
                return [];
            }
        });

        // Wait for all the promises to resolve
        const allLocationData = await Promise.all(locationDataPromises);
        
        // Flatten the array of arrays into a single array
        const flattenedData = allLocationData.flat();

        // Log the location data
        console.log("All location data:", flattenedData);

        // Return the location data
        return flattenedData;
    } catch (error) {
        console.error("Error fetching all location data:", error);
        return [];
    }
};
