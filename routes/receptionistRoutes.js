const express = require('express');
const router = express.Router();
const Receptionist = require('../model/Receptionist');

// Get all receptionists
router.get('/', async (req, res) => {
  try {
    const receptionists = await Receptionist.find();
    res.json(receptionists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific receptionist by ID
router.get('/:id', getReceptionist, (req, res) => {
  res.json(res.receptionist);
});

// Middleware to get a receptionist by ID
async function getReceptionist(req, res, next) {
  try {
    const receptionist = await Receptionist.findById(req.params.id);
    if (!receptionist) {
      return res.status(404).json({ message: 'Receptionist not found' });
    }
    res.receptionist = receptionist;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new receptionist
router.post('/', async (req, res) => {
  const receptionist = new Receptionist({
    name: {
      first: req.body.firstName,
      middle: req.body.middleName,
      last: req.body.lastName,
    },
    gender: req.body.gender,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: {
      city: req.body.address.city,
      subCity: req.body.address.subCity,
      woreda: req.body.address.woreda,
      houseNumber: req.body.address.houseNumber,
    }
    // Add other properties based on your model (uuid, passkey, etc.)
  });

  try {
    const newReceptionist = await receptionist.save();
    res.status(201).json(newReceptionist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a receptionist
router.patch('/:id', getReceptionist, async (req, res) => {
  if (req.body.firstName != null) {
    res.receptionist.name.first = req.body.firstName;
  }
  if (req.body.middleName != null) {
    res.receptionist.name.middle = req.body.middleName;
  }
  if (req.body.lastName != null) {
    res.receptionist.name.last = req.body.lastName;
  }
  // Update other properties similarly based on your model

  try {
    const updatedReceptionist = await res.receptionist.save();
    res.json(updatedReceptionist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a receptionist
router.delete('/:id', getReceptionist, async (req, res) => {
  try {
    await res.receptionist.remove();
    res.json({ message: 'Receptionist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
