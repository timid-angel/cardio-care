const express = require('express')
// controllers
const { doctorLoginController } = require('../controllers/loginController')
const { getUnresolvedAppointments, changeAppointmentStatus } = require('../controllers/appointmentController')
const {
    getSymptomsDoctor,
    getReadingsDoctor,
    addDoctorOrder,
    getOrdersDoctor,
    deleteOrder,
    addDoctorNote,
    getNotes,
    deleteNote
} = require('../controllers/logController')
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
router.get('/unresolved-appointments', authDoctor, getUnresolvedAppointments)
router.patch('/appointments', authDoctor, changeAppointmentStatus)

// symptoms
router.get('/symptoms', authDoctor, getSymptomsDoctor)

// readings
router.get('/readings', authDoctor, getReadingsDoctor)

// doctor orders
router.get('/orders', authDoctor, getOrdersDoctor)
router.post('/orders', authDoctor, addDoctorOrder)
router.delete('/orders', authDoctor, deleteOrder)

// doctor notes
router.get('/notes', authDoctor, getNotes)
router.post('/notes', authDoctor, addDoctorNote)
router.delete('/notes', authDoctor, deleteNote)

// test route
router.get('/authTEST', authDoctor, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router