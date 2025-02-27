// http://localhost:3000

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// MongoDB Connect
mongoose.connect('mongodb+srv://james-harris:48De40@campusnavigationsystemc.hmo0v.mongodb.net/campNavDB')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

const facilitySchema = new mongoose.Schema({
  facilityName: String,
  facilityOpenTime: String,
  facilityCloseTime: String,
  facilityIcon: String
});

const buildingSchema = new mongoose.Schema({
  name: String,
  type: String,
  facilities: [facilitySchema],
  openTime: String,
  closeTime: String,
  rooms: [String],
  image: String
});

const Building = mongoose.model('Building', buildingSchema);

app.use(express.static(path.join(__dirname, 'FrontEnd')));

app.get('/api/buildings', (req, res) => {
  Building.find()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error('Error retrieving data:', err);
      res.status(500).send('Internal Server Error');
    });
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'index.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});