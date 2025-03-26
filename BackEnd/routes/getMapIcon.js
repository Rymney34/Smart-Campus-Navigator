const express = require('express');
const icons = require("../schemas/icons.js")
const iconService = require("../controllers/mapIconCntrl.js");


const router = express.Router();

router.get("/getIcons", async (req, res) => {
    try {
    
        const result = await iconService.mapIc1();

        // console.log(result._id)
        res.json(result);
    } catch (e) {
        console.error("Error in /image route:", e.message);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});


module.exports = router; 


