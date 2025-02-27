/*
app.js Runs Express.js Server and Creates a Mongoose Schema to retreive,
buildings data from mongodb campNavDB Database.
*/


// Requirements
const express = require("express");
const mongoose = require("mongoose");

// Set up Database Connection
const uri = "mongodb+srv://james-harris:48De40@campusnavigationsystemc.hmo0v.mongodb.net/campNavDB?retryWrites=true&w=majority&appName=CampusNavigationSystemCluster";
mongoose.connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error(`Error connecting to db: ${err}`);
  });

// Define a Schema (Buildings Schema)
const buildingsSchema = new mongoose.Schema({
  name: String,
  type: String
});

// Create a Model from the Schema
const Building = mongoose.model("Building", buildingsSchema);

// Create Express App
const app = express();
const port = 4000;

app.use(express.json());

// Show if Server is Running
app.get("/", (req, res) => {
  res.send("Hello, the server is running!");
});

// Fetch Building Data from MongoDB
app.get("/buildings", async (req, res) => {
  try {
    const buildings = await Building.find();  // Fetch data from the 'buildings' collection
    console.log(buildings);  // Log the fetched data to the console
    res.json(buildings);  // Send the data back as JSON in the response
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// Start Server
// Paste Into Browser - https://localhost:${port}\buildings');
//                    - e.g., http://localhost:4000/buildings
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});