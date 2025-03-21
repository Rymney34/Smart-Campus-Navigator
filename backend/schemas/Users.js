const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , auto:true},
    email:{ type: String, required: true},
    password:{type: String, required: true},
    isAdmin : {type: Boolean},
    name: {type:String,required: true, unique: true},
    surname:{type:String,required: true}

})