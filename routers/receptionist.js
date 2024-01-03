const express = require('express')
const router = express.Router()
const multer = require('multer')
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const linkController = require('../controllers/linkController')
const unlinkController = require('../controllers/unlinkController')
const paymentVerification = require('../controllers/paymentVerification')
const { createPatientController } = require('../controllers/accountController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

// login routes
router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE RECEPTIONIST LOGIN PAGE")
})
router.post('/login', receptionistLoginController)

// payment routes
router.get('/payments', paymentVerification.getPayments)
router.get('/payments/receipt', paymentVerification.getPaymentReceipt)
router.post('/payments/receipt', paymentVerification.verify)

// link routes
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)

// patient creation route
router.post('/patients', createPatientController)

// test routes
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'yes': 'YIPPIIEEEE' })
})

module.exports = router