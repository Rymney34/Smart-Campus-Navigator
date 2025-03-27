const mongoose = require('mongoose');
require('dotenv').config();

// Default connection (smart_campus_navigator)
// async function connectDB() {
//     try {
//         await mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority&appName=Campus-Navigator');
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Connection error:', error);
//     }
// }

mongoose.connect(
  process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB (smart_campus_navigator)'))
  .catch(err => console.error('Connection error (smart_campus_navigator):', err));

// Secondary connection (user_details_db)
const usersConnection = mongoose.createConnection(
  process.env.MONGO_URI
);

usersConnection.on('connected', () => {
  console.log('Connected to MongoDB (user_details_db)');
});

usersConnection.on('error', (err) => {
  console.error('Connection error (user_details_db):', err);
});


// Export both the default and secondary connections if needed later in the app
module.exports = { usersConnection };

// module.exports = connectDB();
