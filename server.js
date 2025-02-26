const express = require('express');
const mongoose = require('mongoose');
// Scema import 
const floors = require("./floors");

const app = express();
const port = 4000;

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
// Getting the data from db and sending it to the frontend

app.get('/blocks', async (req, res) => {
    try {
        const query = [
            {
                $lookup: {
                    from: 'blocks',
                    localField: 'id_block',
                    foreignField: '_id',
                    as: 'blockDetails'
                }
            }
        ];
        const allFloors = await floors.aggregate(query).exec();
        const blockDetails = allFloors[0].blockDetails[0];
        res.json(blockDetails); 

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error fetching data');
    }
});


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);

    });
}).catch(err => console.error('Startup error:', err));