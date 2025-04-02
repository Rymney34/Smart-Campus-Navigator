const mongoose = require('mongoose');
const { usersConnection } = require("../config/dbConnect");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['UI/UX', 'Bug Report', 'Feature Request', 'Other'],
    required: true
  },
  message: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
});


const UsersFeedback = usersConnection.model("UsersFeedback", feedbackSchema, "UsersFeedback");

module.exports = UsersFeedback;