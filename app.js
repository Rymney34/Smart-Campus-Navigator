const { MongoClient } = require("mongodb")
const uri = require("./atlas_uri")

console.log(uri)

const client = new MongoClient(uri)
const dbname = "bank"

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to MongoDB Atlas: ${dbname}`);
    }catch (err) {
        console.error(`Error connecting to db ${err}`);
    } 
};
 
const main = async () => {
    try {
        await connectToDatabase();
    } catch(err) {
        console.error(`Error connecting to db ${err}`);
    } finally {
        await client.close();
    }
};

main();