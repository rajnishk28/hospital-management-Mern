const mongoose = require('mongoose');

// Define the patient schema
const patientSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },

  fullName: {
    type: String,
    required: true
  },
 
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
 
});


const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
