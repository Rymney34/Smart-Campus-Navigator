const User = require("../schemas/User");
const Feedback = require('../schemas/feedback');
const bcrypt = require("bcryptjs");

/* Not Currently in Use (Can be used for Admin (View all Users)) */
// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new user
const createUser = async (req, res) => {
  try {
    const { firstName, surname, email, password, isAdmin = false } = req.body;

    // Create a new user object with all necessary fields
    const newUser = new User({
      firstName,
      surname,
      email,
      password,
      isAdmin
    });

    // Save the new user to the database
    await newUser.save();

    // Return the created user object in the response
    res.status(201).json({
      _id: newUser._id,
      firstName: newUser.firstName,
      surname: newUser.surname,
      email: newUser.email,
      password: newUser.password,
      isAdmin: newUser.isAdmin
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login user (Plain Text Password Comparison)
// Will Need Revision When Hashing Password
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If credentials are correct, return success message
    res.json({ message: 'Login successful' ,
      user: {
        _id: user._id,                  
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const postFeedback = async (req, res) => {
  try {
    const { userId, name, category, message } = req.body;

    // Calculate start & end of today
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Count how many feedbacks this user has submitted today
    const feedbackCount = await Feedback.countDocuments({
      userId,
      submittedAt: { $gte: startOfDay, $lte: endOfDay }
    });

    if (feedbackCount >= 3) {
      return res.status(429).json({
        error: 'Daily feedback limit reached. Come back tomorrow!'
      });
    }

    // Save the feedback if under the limit
    const feedback = new Feedback({ name, category, message, userId });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted!' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUsers, createUser, loginUser, postFeedback };