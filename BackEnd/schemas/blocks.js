const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , auto:true},
    blockInfo: { type: String },
    name: { type: String },
    title: { type: String }
});

module.exports = mongoose.model("Blocks", blockSchema)

//Just test