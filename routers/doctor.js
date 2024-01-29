const express = require('express')
// controllers
const { doctorLoginController } = require('../controllers/loginController')
const { getUnresolvedAppointments, changeAppointmentStatus, getUpcomingAppointments } = require('../controllers/appointmentController')
const { doctorDashboard, getDoctorPatients } = require('../controllers/dashboardController')
const { getPatientList } = require('../controllers/getController')
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
    res.render('./doctorViews/login')
})
router.post('/login', doctorLoginController)

// dashboard
router.get('/dashboard', authDoctor, doctorDashboard)
router.get('/patients', authDoctor, getDoctorPatients)
router.get('/patient-list', authDoctor, getPatientList)

// appointment routes
router.get('/unresolved-appointments', authDoctor, getUnresolvedAppointments)
router.get('/upcoming-appointments', authDoctor, getUpcomingAppointments)
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
    res.json({ 'success': 'Authenticated successfully' })
})

module.exports = router