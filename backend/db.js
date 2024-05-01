require('dotenv').config();
const mongoose = require("mongoose");
const dbURI = process.env.MONGODB_URI;

const connectdb = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to the database");
    } catch (error) {
        console.error("Connection error", error);
    }
}

module.exports = connectdb;
