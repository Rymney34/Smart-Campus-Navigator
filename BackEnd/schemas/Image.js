const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
}, { 
    versionKey: false, // Removes "__v": 0 from Document
});

module.exports = mongoose.model('Image', ImageSchema);
