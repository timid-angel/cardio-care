const express = require('express');
const router = express.Router();
const Patient = require('../model/Patient');

// Get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific patient by ID
router.get('/:id', getPatient, (req, res) => {
  res.json(res.patient);
});

// Middleware to get a patient by ID
async function getPatient(req, res, next) {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.patient = patient;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new patient
router.post('/', async (req, res) => {
  const patient = new Patient({
    name: {
      first: req.body.firstName,
      middle: req.body.middleName,
      last: req.body.lastName,
    },
    gender: req.body.gender,
   
  });

  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a patient
router.patch('/:id', getPatient, async (req, res) => {
  if (req.body.firstName != null) {
    res.patient.name.first = req.body.firstName;
  }
  if (req.body.middleName != null) {
    res.patient.name.middle = req.body.middleName;
  }
  if (req.body.lastName != null) {
    res.patient.name.last = req.body.lastName;
  }
  // Update other properties similarly based on your model

  try {
    const updatedPatient = await res.patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a patient
router.delete('/:id', getPatient, async (req, res) => {
  try {
    await res.patient.remove();
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'An error occurred while fetching patients' });
    console.error(err);
  }
});

module.exports = router;
