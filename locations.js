const mongoose = require("mongoose")

const locationsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    idFloor: { type: mongoose.Schema.Types.ObjectId},
    idType: { type: mongoose.Schema.Types.ObjectId },
    roomNumber: { type: String },
    facilityName: {type: String},
    isFacility: {type: Boolean},
    openTime: {type: String, default: "08:00"},
    closeTime: { type: String, default: "15:00"},
});

module.exports = mongoose.model("locations", locationsSchema)
