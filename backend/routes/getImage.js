const mongoose = require('mongoose');
const express = require('express');
const Images = require("../schemas/images.js")
const icons = require("../schemas/icons.js")

const {imag1} = require("../controllers/imageController.js");
const {ic1} = require("../controllers/iconController.js");

const app = express();


const router = express.Router();

    router.get("/image", async (req, res) => {
        try {
           
            const result = await imag1();
           
            // const base64Image = result.image.toString('base64');
           
            // res.json({ image: base64Image });
           
    
            res.send(result);
    
        } catch (e) {
            console.error("Error in /image route:", e.message);
            res.status(500).json({ error: "Failed to fetch image" });
        }
    });




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


module.exports = router;  //exporting the functions to be used in other files.  //export