const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const port = 3000;
const userRoutes = require("./routes/userRoutes");
require('dotenv').config(); // Require dotenv module (Environment Variables) Used to store sensitive information such as API keys and passwords
const path = require('path') // Require path module (Handle File Paths) Used when launching the website FrontEnd 

const uri_user = process.env.MONGODB_URI_UserDB;
const uri_other = process.env.MONGODB_URI_OtherDB;

// MongoDB Connect (Users Database)
mongoose.connect(uri_user) // Connect to MongoDB Database  .then(() => console.log('Connected to MongoDB!'))
  .then(() => console.log('Connected to MongoDB (Users Database)'))
  .catch(err => console.error('Connection error:', err));

// MongoDB Connect (Others Database)
mongoose.connect(uri_other) // Connect to MongoDB Database  .then(() => console.log('Connected to MongoDB!'))
.then(() => console.log('Connected to MongoDB (Others Database)'))
.catch(err => console.error('Connection error:', err));

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Launch Website Front End
// Requires: const path = require('path')
// When local host is launched display the files in the folder FrontEnd as the main application.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'login.html')); // Serve login.html
});

// API Routes
app.use("/api", userRoutes);

app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Start Server on Local Host (http://localhost:3000)
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});