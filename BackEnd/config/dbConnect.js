const mongoose = require('mongoose');
require('dotenv').config();

// Default connection (smart_campus_navigator)
mongoose.connect(process.env.MONGO_URI_MAIN, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB (smart_campus_navigator)'))
  .catch(err => console.error('Connection error (smart_campus_navigator):', err));

// Secondary connection (user_details_db)
const usersConnection = mongoose.mongoose.createConnection(process.env.MONGO_URI_USERS, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

usersConnection.on('connected', () => {
  console.log('Connected to MongoDB (user_details_db)');
});

usersConnection.on('error', (err) => {
  console.error('Connection error (user_details_db):', err);
});


// Export both the default and secondary connections if needed later in the app
module.exports = { usersConnection };
