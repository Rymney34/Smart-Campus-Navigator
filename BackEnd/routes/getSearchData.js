const express = require('express');
const blocks = require("../schemas/blocks.js")

const searchService = require("../controllers/getSearchDetails.js");



const router = express.Router();

// route for search, getting data (search term) from front end and then passsing to query and getting matched data

router.get("/getSearchData/:searchTerm", async (req, res) => {
    try {
          // Extracting blockId from the URL
        const {searchTerm} = req.params;
       

        // Call the controller function, passing blockId
        const result = await searchService.getSearchDetails(searchTerm);
        
        res.json(result);

        console.log(result)

    } catch (e) {
        console.error("Error in Search route:", e.message);
        
        res.status(500).json({ error: "Failed to fetch search data" });
    }
});


module.exports = router; 