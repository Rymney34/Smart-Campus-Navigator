// http://localhost:3000

const express = require('express'); 
const mongoose = require('mongoose'); // Require Mongoose Library
const Marker = require('./models/Marker'); // Require Models/Marker.js File
const fetchPolygonMarkers = require('./FetchMethods/fetchPolygonMarkers')
const app = express();
const port = 3000; // Port is equal to 3000
const path = require('path') // Require path module (Handle File Paths)


// MongoDB Connect
mongoose.connect('mongodb+srv://james-harris:48De40@campusnavigationsystemc.hmo0v.mongodb.net/campNavDB') // Connect to MongoDB Database
  .then(() => console.log('Connected to MongoDB!')) // Print Success Message
  .catch(err => console.error('Connection error:', err)); // Print Error Fail Message

// Launch Website Front End 
app.use(express.static(path.join(__dirname, 'FrontEnd')));

fetchPolygonMarkers()

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`); // Print Success Message
});