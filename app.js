const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const path = require('path') // Require path module (Handle File Paths) Used when launching the website FrontEnd 
require('./dbConnect'); // Connect to MongoDB Databases

const app = express();
const port = 3000;

/* Working on Multiple Database Connections at the Moment

// MongoDB Connect
// ! Database Connection is to practice DB not real DB (Connection String needs Updating to the Correct DB) !
mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/user_details_db?retryWrites=true&w=majority') // Connect to MongoDB Database  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

*/

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Launch Website Front End
// Requires: const path = require('path')
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
