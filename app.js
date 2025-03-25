const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require("./BackEnd/routes/userRoutes");
const path = require('path') // Require path module (Handle File Paths) Used when launching the website FrontEnd 
// require('./BackEnd/dbConnect'); 
require("./BackEnd/config/dbConnect"); // Connect to MongoDB Databases

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Launch Website Front End
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'Views', 'login.html')); // Serve login.html
});

// API Routes
app.use("/api", userRoutes);

app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Start Server on Local Host (http://localhost:3000)
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
