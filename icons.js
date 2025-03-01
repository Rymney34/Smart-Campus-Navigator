const mongoose = require("mongoose")

const iconsSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId,auto:true  },
   image: { type: Buffer },
   
});

module.exports = mongoose.model("icons", iconsSchema)