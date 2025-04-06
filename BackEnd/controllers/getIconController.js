const mongoose = require('mongoose');
const express = require('express');

const locationType = require("../schemas/locationType.js")

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
            // {
            //     $lookup: {
            //         from: "blocks",
            //         localField: 'iconsImages._id',
            //         foreignField: 'idIcon',
            //         as: 'blocksIcons'
            //     }
            // },

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
        
        // console.log("TEST LOG" + res)

        return res;

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}
module.exports = {ic1};