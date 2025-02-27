const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://james-harris:48De40@campusnavigationsystemc.hmo0v.mongodb.net/campNavDB')
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Connection error:', err));


const Schema = mongoose.Schema;

const FacilitySchema = new Schema({
  facilityName: String,
  facilityOpenTime: String,
  facilityCloseTime: String,
  facilityIcon: String
});

const DataSchema = new Schema({
  name: String,
  type: String,
  facilities: [FacilitySchema],
  openTime: String,
  closeTime: String,
  rooms: [String],
  image: String
});

const Data = mongoose.model('Data', DataSchema);


app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();  // Fetch all data from the "Data" collection
    console.log('Fetched Data:', data);  // Log the data to check if it's being fetched properly
    res.json(data);  // Send the data as a JSON response
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});


// Serve static files
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Root route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
