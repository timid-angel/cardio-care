const express = require('express')
// controllers
const { doctorLoginController } = require('../controllers/loginController')
const appointmentController = require('../controllers/appointmentController')
// middleware
const authDoctor = require('../middleware/authDoctor')

const router = express.Router()

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE DOCTOR LOGIN PAGE')
})
router.post('/login', doctorLoginController)

// appointment routes
router.get('/unresolved-appointments', authDoctor, appointmentController.getUnresolvedAppointments)
router.patch('/appointments', authDoctor, appointmentController.changeAppointmentStatus)

// test route
router.get('/authTEST', authDoctor, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router