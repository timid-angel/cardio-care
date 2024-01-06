const express = require('express')
const router = express.Router()
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const { linkController, unlinkController } = require('../controllers/linkageController')
const { getPayments, getPaymentReceipt, verify } = require('../controllers/paymentVerification')
const { createPatientController, uploadPatient, deletePatient } = require('../controllers/accountController')
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
router.get('/patients', getPatients);
router.post('/patients', uploadPatient.single('image'), createPatientController)
router.delete('/patients/:id', authReceptionist, deletePatient)

// test routes
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})

module.exports = router