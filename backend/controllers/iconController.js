const mongoose = require('mongoose');
const express = require('express');
const Images = require("../schemas/images.js")
const icons = require("../schemas/icons.js")

async function ic1() {
    try {
        const q = [
            { 
                $match: { _id: new mongoose.Types.ObjectId("67d43744e7f924ee1e6f23b0") }
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
module.exports = {ic1};