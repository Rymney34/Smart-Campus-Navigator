const express = require('express');
const mongoose = require('mongoose');
const floors = require("./floors");

// Random test!!!!!!!!!


async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority&appName=Campus-Navigator');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

const gazoz2 = async () => {
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

        return blockDetails;
}
module.exports = { gazoz2 };
        // console.log(blockDetails


connectDB().then(() => {
   
}).catch(err => console.error('Startup error:', err));

