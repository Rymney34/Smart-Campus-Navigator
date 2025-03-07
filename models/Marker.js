const mongoose = require('mongoose'); // Require Mongoose

const markerSchema = new mongoose.Schema({
  blockName: {type: String}, // Block Name "Block O"
  //coordinates: {type: String} // Coordinates ([51.1,  -3.2], [51.2, -3])
}, { collection: 'map-visuals' }); 

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;