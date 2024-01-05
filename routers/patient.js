const express = require('express')
// controllers
const { getPage, postPayment, upload } = require('../controllers/paymentVerification')
const { patientLoginController } = require('../controllers/loginController')
const appointmentController = require('../controllers/appointmentController')
// middleware
const authPatient = require('../middleware/authPatient')

const router = express.Router()

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE PATIENT LOGIN PAGE')
})
router.post('/login', patientLoginController)

// appointment routes
router.post('/appointments', authPatient, appointmentController.addAppointment)

// payment verification routes
router.get('/payment', getPage)
router.post('/payment', upload.single('image'), postPayment)

// test route
router.get('/authTEST', authPatient, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router