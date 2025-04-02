const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });




// Default connection (smart_campus_navigator)
mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority)//process.env.MONGO_URI_MAIN')
  .then(() => console.log('Connected to MongoDB (smart_campus_navigator)'))
  .catch(err => console.error('Connection error (smart_campus_navigator):', err));

// Secondary connection (user_details_db)
const usersConnection = mongoose.mongoose.createConnection('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/user_details_db?retryWrites=true&w=majority');//process.env.MONGO_URI_USERS);

usersConnection.on('connected', () => {
  console.log('Connected to MongoDB (user_details_db)');
});

usersConnection.on('error', (err) => {
  console.error('Connection error (user_details_db):', err);
});


// Export both the default and secondary connections if needed later in the app
module.exports = { usersConnection };
