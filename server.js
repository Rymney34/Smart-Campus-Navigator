const express = require('express');
const mongoose = require('mongoose');
// Scema import 
const floors = require("./schemas/floors.js");
const Locations = require("./schemas/locations.js");
const locationType = require("./schemas/locationType.js");
const Images = require("./schemas/images.js")
const icons = require("./schemas/icons.js")
const blocks = require("./schemas/blocks.js")

// const images = require('./images');

const {test2} = require("./test1");


const fs = require("fs").promises;


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

//Adding image to db 

// async function iconsUpload () {
    
//     try{
        
//         const imagePath = './bus.png';

    
//         const imageBuffer =  await fs.readFile(imagePath);
//         const base64I = imageBuffer.toString('base64')
//         const mimeType = 'image/png';

//         const newImage = new icons({
//             image: imageBuffer
//           });

//           const result = await newImage.save();
//           console.log(result)

//     }catch (e){
//         console.log(e.message)
//     }

// }

// iconsUpload()

//adding block documents

async function addBlock(){
    try {
        
        const doc = [
            {
               
                idFloor: "67cddfc3a2c7bca87f8ae8ee",
                openTime: "08:00",
                closeTime: "21:00",
                places: [
                  {roomNumber: "T.01"},
                  {roomNumber: "T.02"},
                  {roomNumber: "T.03"},
                ]
              },
            //   {
               
            //     idFloor: "67cddfc3a2c7bca87f8ae8ef",
            //     openTime: "08:00",
            //     closeTime: "20:00",
            //     places: [
            //         {idType: "67d1db2ceb00f496f5ff8073",
            //         isFacility:true
            //         },
                    
            //     ]
            //   },
              {
               
                idFloor: "67cddfc3a2c7bca87f8ae8ee",
                openTime: "07:00",
                closeTime: "21:00",
                places: [
                    {idType: "67d1db2ceb00f496f5ff8076",
                    isFacility:true
                    },
                    
                ]
              },

            //   {
               
            //     idFloor: "67cddf64e9c8af0f44bd1af8",
            //     openTime: "08:00",
            //     closeTime: "20:00",
            //     places: [
            //         {roomNumber: "L.020"},
            //         {roomNumber: "Global Lounge"},
            //     ]
            //   },
            {
                idFloor: "67cddfc3a2c7bca87f8ae8ef",
                openTime: "08:00",
                closeTime: "21:00",
                places: [
                    {roomNumber: "T.0002"},
                    
                ]
              },
              {
                idFloor: "67cddfc3a2c7bca87f8ae8f0",
                openTime: "08:00",
                closeTime: "21:00",
                places: [
                    {roomNumber: "T.010"},
                    {roomNumber: "T.020"},
                    {roomNumber: "T.030"},
                    {roomNumber: "T.040"},
                    {roomNumber: "T.050"},
                   
                ]
              },
             
        ];

        const result = await Locations.insertMany(doc);

        console.log(result)
    }catch(e){
        console.log(e.message)
    }

}

addBlock()

// async function addInfo(){
//     try {

//         const block = await blocks.findOne({ name: "Block L2" });
        
//         const doc = [
//             { 
//                 floorNum:0,
//                 id_block: block._id
//             },
//             { 
//                 floorNum:1,
//                 id_block: block._id
//             },
//             { 
//                 floorNum:2,
//                 id_block: block._id
//             },
//             { 
//                 floorNum:3,
//                 id_block: block._id
//             },
            
            
        
//             // {
//             //     blockInfo: "Block information",
//             //     name:"Block F",
//             //     title: "PDR(Product Design & Developemnt Research)",
//             // },

//         ];

//         const result = await floors.insertMany(doc);

//         console.log(result)
//     }catch(e){
//         console.log(e.message)
//     }

// }

// addInfo()


// async function run(){
//     try{
//         const imagePath = "./t1.png"; 
//         const imageBuffer = fs.readFileSync(imagePath);

        
  

//     }catch(e){
//         console.log(e.message);
//     }
// }





async function imag1() {
    try {
        const q = [
            { 
                $match: { _id: new mongoose.Types.ObjectId("67d0a986728ea5740fdb8e3f") }
            },
            {
                $project: {
                    _id: 0, 
                    image: 1 
                }
            }
        ];

        
        const res = await Images.aggregate(q).exec();
        
        return res[0];

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}

app.get("/image", async (req, res) => {
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


async function ic1() {
    try {
        const q = [
            { 
                $match: { _id: new mongoose.Types.ObjectId("67d0df626f2159b45ed6a6c3") }
            },
            {
                $project: {
                    _id: 0, 
                    image: 1 
                }
            }
        ];

        
        const res = await icons.aggregate(q).exec();
        
        return res[0];

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}

app.get("/icon", async (req, res) => {
    try {
       
        const result = await ic1();
       
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