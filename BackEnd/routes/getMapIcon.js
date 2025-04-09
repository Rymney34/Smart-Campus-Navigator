const express = require('express');
const icons = require("../schemas/icons.js")
const iconService = require("../controllers/mapIconCntrl.js");


const router = express.Router();

// route of getting map icons 

router.get("/getIcons", async (req, res) => {
    try {
    
        const result = await iconService.mapIc1();

        // const blcN = "Block A"

        

        // const res = result.name == "Block A";
    
        // const base64Image = result.image.toString('base64');

        // console.log("TeST"+result);
    
        res.json(result);
    } catch (e) {
        console.error("Error in /image route:", e.message);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});


module.exports = router; 


