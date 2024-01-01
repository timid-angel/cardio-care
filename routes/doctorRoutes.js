const express = require('express');
const router = express.Router();
const Doctor = require('../model/Doctor');
const Calendar = require('../model/Calendar');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific doctor by ID
router.get('/:id', getDoctor, (req, res) => {
  res.json(res.doctor);
});

// Middleware to get a doctor by ID
async function getDoctor(req, res, next) {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.doctor = doctor;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new doctor
router.post('/', async (req, res) => {
  const doctor = new Doctor({
    name: {
      first: req.body.firstName,
      middle: req.body.middleName,
      last: req.body.lastName,
    },
    gender: req.body.gender,
    // Add other properties based on your model (email, phoneNumber, etc.)
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a doctor
router.patch('/:id', getDoctor, async (req, res) => {
  if (req.body.firstName != null) {
    res.doctor.name.first = req.body.firstName;
  }
  if (req.body.middleName != null) {
    res.doctor.name.middle = req.body.middleName;
  }
  if (req.body.lastName != null) {
    res.doctor.name.last = req.body.lastName;
  }
  // Update other properties similarly based on your model

  try {
    const updatedDoctor = await res.doctor.save();
    res.json(updatedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a doctor
router.delete('/:id', getDoctor, async (req, res) => {
  try {
    await res.doctor.remove();
    res.json({ message: 'Doctor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/create-doctor', async (req, res) => {
  try {
      const { firstName, lastName, email } = req.body; // Assuming this data comes from the request body

      const doctor = await Doctor.create({
          name: {
              first: firstName,
              last: lastName
          },
          email: email
      });

      if (!doctor.calendar) {
          doctor.calendar = await Calendar.create({
              upcomingAppointments: [],
              oldAppointments: []
          });
      }

      await doctor.save();

      return res.status(201).json({ message: 'Doctor created successfully' });
  } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
