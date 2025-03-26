const mongoose = require('mongoose');
const express = require('express');
const Images = require("../schemas/images.js")
const icons = require("../schemas/icons.js")
const blocks = require("../schemas/blocks.js")

async function mapIc1() {
    try {
        const q = [
            
            {

                $lookup:{
                    from: 'icons',
                    localField: 'idIcon',
                    foreignField: '_id',
                    as: 'icons'
                }
            },

            {
                $project: {
                    _id: 1, 
                    name:1,
                    idIcon: 1,
                    image: { $arrayElemAt: ["$icons.image", 0] } 
                    
                }
            
            }
        ];

        
        const res = await blocks.aggregate(q).exec();
            // const icons = res[0]

        // console.log(res[0].image)
        
        // console.log(res);
        // console.log(icons)

        

       
        return res;

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}

module.exports = {mapIc1};

