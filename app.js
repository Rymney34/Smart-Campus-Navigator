const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const path = require('path') // Require path module (Handle File Paths) Used when launching the website FrontEnd 

// MongoDB Connect
// ! Database Connection is to practice DB not real DB (Connection String needs Updating to the Correct DB) !
mongoose.connect('mongodb+srv://james-harris:48De40@campusnavigationsystemc.hmo0v.mongodb.net/campNavDB') // Connect to MongoDB Database
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Connection error:', err));

// Launch Website Front End
// Requires: const path = require('path')
// When local host is launched display the files in the folder FrontEnd as the main application.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'login.html')); // Serve login.html
});

app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Start Server on Local Host (http://localhost:3000)
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});