const mongoose = require("mongoose");
// const mongoURL = "mongodb://127.0.0.1:27017/hotels";
require('dotenv').config();
const mongoURL = process.env.DB_URL;


mongoose.connect(mongoURL)
const db = mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected');
});

db.on('error', (err) => {
    console.error('Connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db;