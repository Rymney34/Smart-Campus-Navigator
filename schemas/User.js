const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  firstName: { type: String, required: true, unique: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean }
}, { 
  versionKey: false, // Removes "__v": 0 from Document
  collection: 'Users' // Set collection name to 'Users'
});

module.exports = mongoose.model("User", UserSchema);
