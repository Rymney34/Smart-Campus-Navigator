const express = require('express');
const mongoose = require('mongoose');
// Scema import 
const floors = require("./floors");
const Locations = require("./locations.js");
const locationType = require("./locationType");
const Images = require("./images.js")
// const images = require('./images');

const {test2} = require("./test1");


const fs = require("fs");


const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('front')); 



//Server and db connection 

async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority&appName=Campus-Navigator');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
    }
}





async function run(){
    try{
        const imagePath = "./t1.png";  // Change to your image path
        const imageBuffer = fs.readFileSync(imagePath);

  

    }catch(e){
        console.log(e.message);
    }
}





async function imag1() {
    try {
        const q = [
            { 
                $match: { _id: new mongoose.Types.ObjectId("67c080d1b861b5153f6f83d2") }
            },
            {
                $project: {
                    _id: 0, // Exclude _id
                    image: 1 // Include only image field
                }
            }
        ];

        
        const res = await Images.aggregate(q).exec();
        
        return res[0];

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error; // Re-throw to be caught in the route
    }
}

app.get("/image", async (req, res) => {
    try {
       
        const result = await imag1();
       
        const base64Image = result.image.toString('base64');
       
        res.json({ image: base64Image });
    } catch (e) {
        console.error("Error in /image route:", e.message);
        res.status(500).json({ error: "Failed to fetch image" });
    }
});


app.get('/test2', async (req, res) => {
    try {
        const result = await test2();
        res.send(result); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
        
    });
}).catch(err => console.error('Startup error:', err));