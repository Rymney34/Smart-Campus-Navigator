const express = require('express');
const router = express.Router();
const { getUsers, createUser, loginUser } = require('../controllers/userController');

// Get all users
router.get('/users', getUsers);

// Create a new user
router.post('/users', createUser);

// Login user (without hashing passwords)
router.post('/login', loginUser);

module.exports = router;