const mongoose = require('mongoose');

// Define schema for an Item
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  facilities: [String]  // Array of strings for facilities
});

// Create and export the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
