const mongoose = require('mongoose');

// Default connection (smart_campus_navigator)
mongoose.connect(
  'mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB (smart_campus_navigator)'))
  .catch(err => console.error('Connection error (smart_campus_navigator):', err));

// Secondary connection (user_details_db)
const usersConnection = mongoose.createConnection(
  'mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/user_details_db?retryWrites=true&w=majority'
);

usersConnection.on('connected', () => {
  console.log('Connected to MongoDB (user_details_db)');
});

usersConnection.on('error', (err) => {
  console.error('Connection error (user_details_db):', err);
});

// Export both the default and secondary connections if needed later in the app
module.exports = { usersConnection };
