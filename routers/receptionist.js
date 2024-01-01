const express = require('express')
const router = express.Router()
const multer = require('multer')
// controllers
const receptionistLoginController = require('../controllers/receptionistLoginController')
const linkController = require('../controllers/linkController')
const unlinkController = require('../controllers/unlinkController')
const paymentVerification = require('../controllers/paymentVerification')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE LOGIN PAGE YEEE")
})

router.get('/payments', paymentVerification.getPayments)
router.get('/payments/receipt', paymentVerification.getPaymentReceipt)
router.post('/payments/receipt', paymentVerification.verify)

// router.get('/payments', paymentController)

router.post('/login', receptionistLoginController)
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)
// router.post('/patient/:id', patientVerificationController)

router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'yes': 'YIPPIIEEEE' })
})

module.exports = router