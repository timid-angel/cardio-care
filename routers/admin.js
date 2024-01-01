const express = require('express')
const router = express.Router()
// controllers
const createReceptionistController = require('../controllers/createReceptionistController')
const createDoctorController = require('../controllers/createDoctorController')
const adminLoginController = require('../controllers/adminLoginController')
const createAdminController = require('../controllers/createAdminController')
// middleware
const authAdmin = require('../middleware/authAdmin')

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE ADMIN LOGIN PAGE')
})
router.post('/login', adminLoginController)

// account creation
router.post('/', createAdminController)
router.post('/receptionist', createReceptionistController)
router.post('/doctor', createDoctorController)

// test route
router.get('/authTEST', authAdmin, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router