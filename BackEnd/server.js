const express = require('express'); 
const mongoose = require('mongoose');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");

const imgSend = require("./routes/getImage.js");
const facilitiesIcons = require("./routes/getFacilitiesIcons.js");
const iconAllSend = require("./routes/getMapIcon.js");
const getLocations = require("./routes/getLocations.js");
const getSearchData = require("./routes/getSearchData.js")

const path = require('path') // Used when launching the website FrontEnd 
// require('./BackEnd/dbConnect'); 
require("./config/dbConnect.js"); // Connect to MongoDB Databases

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

app.use(facilitiesIcons);

// Launch Website Login.html First
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'FrontEnd', 'Views', 'login.html'));
});

// Serve Front End Folder
app.use(express.static(path.resolve(__dirname, '..', 'FrontEnd')));

// API Routes
app.use("/api", userRoutes);
app.use( imgSend);
app.use( getLocations);
app.use( iconAllSend);
app.use( getSearchData)


// Start Server on Local Host (http://localhost:3000)
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
