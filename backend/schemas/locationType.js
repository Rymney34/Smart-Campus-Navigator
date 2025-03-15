const mongoose = require("mongoose")

const locationTypeSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto:true},
    idImage: { type: mongoose.Schema.Types.ObjectId},
    typeName: { type:String },
});

module.exports = mongoose.model("locationType", locationTypeSchema, "locationType")