const express = require('express');
const mongoose = require('mongoose');


async function connectDB() {
    try {
        await mongoose.connect('mongodb+srv://first_db_userT:Gazoz_228@campus-navigator.qe53f.mongodb.net/smart_campus_navigator?retryWrites=true&w=majority&appName=Campus-Navigator');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection error:', error);
    }
}

module.exports = connectDB();