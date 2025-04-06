
const express = require('express');
const icons = require("../schemas/icons.js")
const locationType = require("../schemas/locationType.js")
const {ic1} = require("../controllers/getIconController.js");


const router = express.Router();

router.get("/getFacilitiesicons", async (req, res) => {
    try {
    
        const result = await ic1();
    
        // const base64Image = result.image.toString('base64');
        // console.log(result);

        res.json(result);
    } catch (e) {
        console.error("Error in /image route:", e.message);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});

module.exports = router; 
