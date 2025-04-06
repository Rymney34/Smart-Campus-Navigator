const mongoose = require('mongoose');
const express = require('express');
const Images = require("../schemas/images.js")
const icons = require("../schemas/icons.js")

async function imag1() {
    try {
        const q = [
            { 
                $match: { _id: new mongoose.Types.ObjectId("67d42d5a7a0dbb296e871bca") }
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

module.exports = {imag1};