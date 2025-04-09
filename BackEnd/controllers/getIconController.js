const mongoose = require('mongoose');
const express = require('express');

const locationType = require("../schemas/locationType.js")

// getting icon query to  mongodb 
async function ic1() {
    try {
        const q = [
            
            {
                $lookup: {
                    from: "icons",
                    localField: 'idImage',
                    foreignField: '_id',
                    as: 'iconsImages'
                }
            },
          

            {
                $project: {
                    _id: 1, 
                    image: '$iconsImages.image',
                    typeName: 1,
                    // name:1,


                }
            }
        ];

        
        const res = await locationType.aggregate(q).exec();
        
      

        return res;

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}
module.exports = {ic1};