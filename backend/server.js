const express = require('express');


// const icons = require("./schemas/icons.js")
// const blocks = require("./schemas/blocks.js")
const getDb = require("./config/db.js")

const imgSend = require("./routes/getImage.js");
const iconSend = require("./routes/getIcon.js");
const iconAllSend = require("./routes/getMapIcon.js");
const getLocations = require("./routes/getLocations.js");

const fs = require("fs").promises;


const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('./FrontEnd/Views')); 

getDb.then(() => {
    
    app.listen(port, () => {
        console.log(`Server running on port http://localhost:${port}`);
        
    });
}).catch(err => console.error('Startup error:', err));





//Adding image to db 

// async function iconsUpload () {
    
//     try{
        
//         const imagePath = './icon-block-e-23.png';
    
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

// icnSend()
app.use(imgSend);

app.use(getLocations);

// app.use(iconSend);

app.use(iconAllSend);

