const Patient = require("../models/patient.model");

// Create and Save a new Patient
const create = async (req, res) => {
    const { fullName, age, gender, email, phone, address } = req.body;
    const doctorId = req.user.id;
    //console.log("doctorId",doctorId,"req.user",req.user);
    try {
        if (!fullName || !age || !gender || !email || !phone || !address) {
            return res.status(400).send({
                message: "All fields are required"
            });
        }
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).send({ message: "Email is already in use" });
        }
        const patient = new Patient({
            doctorId,
            fullName,
            age,
            gender,
            email,
            phone,
            address
        });

        await patient.save();
        return res.status(201).send({ message: "Patient added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error occurred", error: error.message });
    }
}

// Retrieve and return all patients from the database
const findAllPatient = async (req, res) => {
    const doctorId = req.user.id;
    try {
        const patients = await Patient.find({ doctorId });
        return res.send(patients);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error occurred" });
    }
}

// Find a single patient with an id
const findOnePatient = async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        return res.send(patient);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error occurred" });
    }
}

// Update a patient by the id in the request
const updatedPatient = async (req, res) => {
    const { id } = req.params;
    const updateField = req.body;
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, updateField, { new: true });
        if (!updatedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        return res.send(updatedPatient);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error occurred",
            error: error
        });
    }
}

// Delete a patient with the specified id in the request
const deletedPatient = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).send({ message: "Patient not found" });
        }
        return res.send({ message: "Patient deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Error occurred" });
    }
}

module.exports = {
    create,
    findAllPatient,
    findOnePatient,
    updatedPatient,
    deletedPatient,

}