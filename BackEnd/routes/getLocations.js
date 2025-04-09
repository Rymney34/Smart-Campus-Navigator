const locationService = require("../controllers/getLocationController.js");
const express = require('express');
const router = express.Router();

// route of getting locations by passsing block id from front end side

router.get("/getLocations/:blockId", async (req, res) => {
    try {
          // Extracting blockId from the URL
        const { blockId } = req.params;
       

        // Call the controller function, passing blockId
        const result = await locationService.getLocation(blockId);

        res.json(result);

    } catch (e) {
        console.error("Error in /getLoc route:", e.message);
        
        res.status(500).json({ error: "Failed to fetch loc data" });
    }
});

module.exports = router;