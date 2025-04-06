const mongoose = require('mongoose');
const express = require('express');

const blocks = require("../schemas/blocks.js")

async function getSearchDetails(searchTerm) {
    try {

        // if(searchTerm == null ){
        //     return res.status(400).json({ error: 'Can not search zero' });
        // }


        const q = [
            
            
           
        {
            $lookup: {
                from:'images',
                localField: 'idImage',
                foreignField: '_id',
                pipeline: [{
                    $project: { _id: 0,image: 1 }
                }],
                as: 'block.image'
            }
            

        },
        {
            $unwind: {
                path: '$block.image',
                preserveNullAndEmptyArrays: true,
            }
        },
        //Look for floor realted to the block 
        {
            $lookup: {
                
                from: 'floors',
                localField: '_id',
                foreignField: 'id_block',
                pipeline: [{
                    $project: { _id: 1,floorNum: 1 }
                }],
                as: 'floors.block',
            
            
            }
        },

        {
            $unwind: {
                path: '$floors.block',
                preserveNullAndEmptyArrays: true
            }
        },
        //look for location table realted to particular table and floor 
        {
            $lookup: {
                from: 'locations',
                localField: 'floors.block._id',
                foreignField: 'idFloor',
                pipeline: [{
                    $project: { _id: 0, opentime: 1, closetime: 1, places: 1 }
                }],
                as: 'locations.floor'
            }
            
            
        },

        {
                $unwind: {
                    path: '$locations.floor',
                    preserveNullAndEmptyArrays: true
                }
        }, 
        //Look for locationType and of the place Í
        {
            $lookup: {
                from: 'locationType',
                localField: 'locations.floor.places.idType',
                foreignField: '_id',
                pipeline: [{
                    $project: { _id: 0, typeName: 1, idImage: 1 }
                }],
                as: 'places.locType'
                
            }
        },
        {
            $unwind: {
                path: '$places.locType',
                preserveNullAndEmptyArrays: true
            }
        },
        //Look for icon  
        {
            $lookup : {
                from : 'icons',
                localField : 'places.locType.idImage',
                foreignField : '_id',
                pipeline: [{
                    $project: { _id: 0, image: 1 }
                }],
                as: 'locationIcon'
            }
        },
        {
            $unwind: {
                path: '$locationIcon',
                preserveNullAndEmptyArrays: true
            }
        },



        {
            $match: {
            $or: [
                { name: { $regex: searchTerm, $options: "i" } },
                { title: { $regex: searchTerm, $options: "i" }}, 
                { 'places.locType.typeName': { $regex: searchTerm, $options: "i" } },
                { 'locations.floor.places.roomNumber': { $regex: searchTerm, $options: "i" }} 
            ]
            }
        },


        // Step 6: Project the desired result
        {
            $project: {
                _id: 1,
                name: 1,
                title: 1,
                image: '$block.image',
                floors: '$floors.block',
                floorLocation: '$locations.floor',
                locationType: '$places.locType',
                locationImage: '$locationIcon'
            
                
            }
        }

        ];

        
        const res = await blocks.aggregate(q).exec();
        
        console.log("Search" + res)

        return res;

    } catch (error) {
        console.error("Error in imag1:", error.message);
        throw error;
    }
}
module.exports = {getSearchDetails};