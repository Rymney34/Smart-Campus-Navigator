const mongoose = require("mongoose")

const floorSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    floorNum: { type: Number },
    id_block: { type: mongoose.Schema.Types.ObjectId } 
});

module.exports = mongoose.model("Floor", floorSchema)
