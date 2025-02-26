const mongoose = require("mongoose")

const imagesSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
   image: { type: String },
});

module.exports = mongoose.model("locations", locationsSchema)