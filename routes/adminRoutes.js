const express = require('express');
const router = express.Router();
const Admin = require('../model/Admin');

// Get all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific admin by ID
router.get('/:id', getAdmin, (req, res) => {
  res.json(res.admin);
});

// Middleware to get an admin by ID
async function getAdmin(req, res, next) {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.admin = admin;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new admin
router.post('/', async (req, res) => {
  const admin = new Admin({
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
    const newAdmin = await admin.save();
    res.status(201).json(newAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an admin
router.patch('/:id', getAdmin, async (req, res) => {
  if (req.body.firstName != null) {
    res.admin.name.first = req.body.firstName;
  }
  if (req.body.middleName != null) {
    res.admin.name.middle = req.body.middleName;
  }
  if (req.body.lastName != null) {
    res.admin.name.last = req.body.lastName;
  }
  // Update other properties similarly based on your model

  try {
    const updatedAdmin = await res.admin.save();
    res.json(updatedAdmin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an admin
router.delete('/:id', getAdmin, async (req, res) => {
  try {
    await res.admin.remove();
    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
