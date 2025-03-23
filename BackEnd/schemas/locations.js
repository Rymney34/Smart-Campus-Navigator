const mongoose = require("mongoose")

// const locationsSchema = new mongoose.Schema({
//     _id: { type: mongoose.Schema.Types.ObjectId, auto:true },
//     idFloor: { type: mongoose.Schema.Types.ObjectId, ref: 'floors'},
//     idType: { type: mongoose.Schema.Types.ObjectId, ref: 'locationType' },
//     roomNumber: { type: String },
//     facilityName: {type: String},
//     isFacility: {type: Boolean},
//     openTime: {type: String, default: "08:00"},
//     closeTime: { type: String, default: "15:00"},
// });


const locationsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId,},
    idFloor: { type: mongoose.Schema.Types.ObjectId },
    openTime: {type: String, default: "08:00"},
    closeTime: { type: String, default: "15:00"},
    places: [
        {
        roomNumber: { type: String }, 
        idType: { type: mongoose.Schema.Types.ObjectId },
        isFacility: {type: Boolean}
        }
    ]
  });
  

module.exports = mongoose.model("Locations", locationsSchema)
