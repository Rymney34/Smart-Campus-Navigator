// const mongoose = require('mongoose');
// const blocks = require("./blocks")
// const floors = require("./floors")

// async function connectDB() {
//     try {
//         await mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority&appName=Campus-Navigator');
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('Connection error:', error);
//     }
// }



// async function run() {
//     try {
//         const query = [
//             {
//                 $lookup: {
//                     from: 'blocks',           
//                     localField: 'id_block',   
//                     foreignField: '_id',      
//                     as: 'blockDetails'    
//                 }
//             },
//             {
//                 $project: {
//                     _id: 1,
//                     floorNum: 1,
//                     id_block: 1,
//                     blockDetails: 1          
//                 }
//             }
//         ];

//         const allFloors = await floors.aggregate(query).exec();
//         // allFloors.forEach(floor => {
//         //     console.log(floor.blockDetails[0]); // Выводим объект внутри blockDetails
//         // });
//         console.log(allFloors[0].blockDetails[0]); 

//         const blockName = allFloors[0].blockDetails;

//         return blockName;
        
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await mongoose.connection.close(); 
//     }
// }


// connectDB().then(() => run()).catch(console.error);