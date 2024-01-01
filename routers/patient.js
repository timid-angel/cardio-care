const express = require('express')
// controllers
const paymentVerification = require('../controllers/paymentVerification')
const patientLoginController = require('../controllers/patientLoginController')
// middleware
const authPatient = require('../middleware/authPatient')

const router = express.Router()

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE PATIENT LOGIN PAGE')
})
router.post('/login', patientLoginController)

// payment verification routes
router.get('/payment', paymentVerification.getPage)
router.post('/payment', paymentVerification.upload.single('image'), paymentVerification.postPayment)

// test route
router.get('/authTEST', authPatient, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router