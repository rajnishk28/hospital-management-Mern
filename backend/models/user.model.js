const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: { type: String, 
    enum: ['user'], default: 'user' 
},
   
},{timestamps:true});

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
