const express = require('express')
const router = express.Router()
// controllers
const { createAdminController, createReceptionistController, createDoctorController, uploadDoctor, deleteDoctor, deleteReceptionist } = require('../controllers/accountController')
const { adminLoginController } = require('../controllers/loginController')
// middleware
const authAdmin = require('../middleware/authAdmin')

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE ADMIN LOGIN PAGE')
})
router.post('/login', adminLoginController)

// account creation
router.post('/', authAdmin, createAdminController)
router.post('/receptionists', authAdmin, createReceptionistController)
router.post('/doctors', authAdmin, uploadDoctor.single('image'), createDoctorController)

// account deletion
router.delete('/doctors/:id', authAdmin, deleteDoctor)
router.delete('/receptionists/:id', authAdmin, deleteReceptionist)

// test route
router.get('/authTEST', authAdmin, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})

module.exports = router