const mongoose = require('mongoose');
const express = require('express');
const Images = require("../schemas/images.js")
const Icons = require("../schemas/icons.js")
const block = require("../schemas/blocks.js")
const location = require("../schemas/locations.js")

// quert to mongo db  getting all info to show in side bar by passsing right blockid 

async function getLocation(blockId) {

    
    try {
        

        if (!mongoose.Types.ObjectId.isValid(blockId)) {
            
            return res.status(400).json({ error: 'Invalid blockId' });
        }
        
        const q = [
            {
                
                    $match: { 
                        _id:  new mongoose.Types.ObjectId(blockId)
                    },
                
            },

            //Look for image of the block
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
               //Look for locationType and of the place 
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
               //Look for icon of the place 
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
        
        
        
        const blockInfo = await block.aggregate(q).exec();
            // const icons = res[0]

        // console.log(blockInfo);
        
        // console.log(res);
     

       
        return blockInfo;

    } catch (error) {
        console.error("Error in location controller:", error.message);
        throw error;
    }
}

module.exports = { getLocation};

//New Custom error