const router = require('express').Router();
const{ create, findAllPatient, findOnePatient, updatedPatient, deletedPatient } =
 require('../controllers/patient.controller');
 const {isAdmin}=require('../middleware/checkUserType');

// Create a new patient
router.post('/create',isAdmin, create);
// Retrieve all patients
router.get('/getall',isAdmin, findAllPatient);
// Retrieve a single patient with id
router.get('/getone/:id',isAdmin, findOnePatient);
// Update a patient with id
router.put('/update/:id',isAdmin, updatedPatient);
// Delete a patient with id
router.delete('/delete/:id',isAdmin, deletedPatient);

module.exports = router;