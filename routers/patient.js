const express = require('express')
// controllers
const { getPage, postPayment, upload } = require('../controllers/paymentVerification')
const { patientLoginController } = require('../controllers/loginController')
const appointmentController = require('../controllers/appointmentController')
const { patientDashboard } = require('../controllers/dashboardController')
const {
    addSymptom,
    getSymptomsPatient,
    deleteSymtpom,
    addDailyReading,
    getReadingsPatient,
    deleteReading,
    getOrdersPatient
} = require('../controllers/logController')
// middleware
const authPatient = require('../middleware/authPatient')

const router = express.Router()

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE PATIENT LOGIN PAGE')
})
router.post('/login', patientLoginController)

// dashboard
router.get('/dashboard', authPatient, patientDashboard)

// appointment routes
router.post('/appointments', authPatient, appointmentController.addAppointment)

// payment verification routes
router.get('/payment', getPage)
router.post('/payment', upload.single('image'), postPayment)

// symptom logs
router.get('/symptoms', authPatient, getSymptomsPatient)
router.post('/symptoms', authPatient, addSymptom)
router.delete('/symptoms', authPatient, deleteSymtpom)

// daily readings
router.get('/readings', authPatient, getReadingsPatient)
router.post('/readings', authPatient, addDailyReading)
router.delete('/readings', authPatient, deleteReading)

// orders
router.get('/orders', authPatient, getOrdersPatient)

// test route
router.get('/authTEST', authPatient, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})

module.exports = router