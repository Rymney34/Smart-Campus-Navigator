
const express = require('express');
const icons = require("../schemas/icons.js")
const {ic1} = require("../controllers/iconController.js");


const router = express.Router();

router.get("/icon", async (req, res) => {
    try {
    
        const result = await ic1();
    
        const base64Image = result.image.toString('base64');
    
        res.json({ image: base64Image });
    } catch (e) {
        console.error("Error in /image route:", e.message);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});

module.exports = router; 
