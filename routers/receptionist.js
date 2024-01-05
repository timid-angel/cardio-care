const express = require('express')
const router = express.Router()
const Patient = require('../model/Patient');
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const { linkController, unlinkController } = require('../controllers/linkageController')
const { getPayments, getPaymentReceipt, verify } = require('../controllers/paymentVerification')
const { createPatientController, uploadPatient } = require('../controllers/accountController')
const { getPatients } = require('../controllers/getController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

// login routes
router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE RECEPTIONIST LOGIN PAGE")
})
router.post('/login', receptionistLoginController)

// payment routes
router.get('/payments', getPayments)
router.get('/payments/receipt', getPaymentReceipt)
router.post('/payments/receipt', verify)

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

module.exports = router