const User = require("../schemas/User");

// Fetch all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new user
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
    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getUsers, createUser, loginUser };
