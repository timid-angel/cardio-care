const express = require('express')
const router = express.Router()


// controllers
const { createAdminController, createReceptionistController, createDoctorController, uploadDoctor, deleteDoctor, deleteReceptionist } = require('../controllers/accountController')
const { adminLoginController } = require('../controllers/loginController')
const { getDoctors } = require('../controllers/getController')
const { getReceptionists } = require('../controllers/getController')
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
router.post('/receptionist', authAdmin, createReceptionistController)
router.post('/doctors', authAdmin, uploadDoctor.single('image'), createDoctorController)


// Account creation temp
router.post('/', createAdminController)
router.post('/receptionists', createReceptionistController)
router.post('/Doctor', uploadDoctor.single('image'), createDoctorController)

// account deletion
router.delete('/doctors/:id', authAdmin, deleteDoctor)
router.delete('/receptionists/:id', authAdmin, deleteReceptionist)

router.get('/doctors', getDoctors);
router.get('/receptionists', getReceptionists);

router.delete('/doctor/:email', deleteDoctor);
router.delete('/receptionist/:email', deleteReceptionist);




router.delete('/receptionist/:id', deleteReceptionist);
// test route
router.get('/authTEST', authAdmin, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})

module.exports = router