const mongoose = require('mongoose');

// Define the schema for marker locations
const markerSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    name: { type: String, required: true },
}, { collection: 'markerLocations' });  // Use the correct collection name 'markerLocations'

const Marker = mongoose.model('Marker', markerSchema);
module.exports = Marker;