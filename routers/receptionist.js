const express = require('express')
const router = express.Router()
const Patient = require('../model/Patient');
const Payment = require('../model/Payment');
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const { linkController, unlinkController } = require('../controllers/linkageController')

const { createPatientController, uploadPatient } = require('../controllers/accountController')
const { getPatients } = require('../controllers/getController')
const { getPayments } = require('../controllers/getController')
const { getDoctors } = require('../controllers/getController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

// login routes
router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE RECEPTIONIST LOGIN PAGE")
})
router.post('/login', receptionistLoginController)

// payment routes




// Handle GET request to /patient/payment
router.get('/payment', getPayments);


// link routes
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)

// patient routes
router.post('/patients', uploadPatient.single('image'), createPatientController)
router.get('/patients', getPatients);

// test routes
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'yes': 'YIPPIIEEEE' })
})
router.get('/Doctor', getDoctors);
module.exports = router