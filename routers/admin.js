const express = require('express')
const router = express.Router()
// controllers
const { createAdminController, createReceptionistController, createDoctorController, uploadDoctor, deleteDoctor, deleteReceptionist, deactivateReceptionist, deactivateDoctor, reactivateDoctor, reactivateReceptionist, deletePatient } = require('../controllers/accountController')
const { adminLoginController } = require('../controllers/loginController')
const { getDoctors } = require('../controllers/getController')
const { getReceptionists } = require('../controllers/getController')
// middleware
const authAdmin = require('../middleware/authAdmin')
const { adminDashboard, addDoctor, manageDoctors, manageReceptionits, getAllPatients, getAdminPatients } = require('../controllers/dashboardController')

// login
router.get('/', (req, res) => res.redirect('/admin/dashboard'))
router.get('/login', (req, res) => {
    res.render('./adminViews/login')
})
router.post('/login', adminLoginController)
router.get('/logout', (req, res) => {
    res.cookie('jwt', 1, { maxAge: 1 }).redirect('/admin/login')
})

// admin pages
router.get('/dashboard', authAdmin, adminDashboard);
router.get('/doctorRegistration', authAdmin, addDoctor);
router.get('/doctorManagement', authAdmin, manageDoctors);
router.get('/receptionistManagement', authAdmin, manageReceptionits);
router.get('/patients', authAdmin, getAdminPatients)
router.get('/patient-list', authAdmin, getAllPatients)

// account creation
router.post('/', authAdmin, createAdminController)
router.post('/receptionist', authAdmin, createReceptionistController)
router.post('/doctors', authAdmin, uploadDoctor.single('image'), createDoctorController)

// Account creation temp
router.post('/', authAdmin, createAdminController)
router.post('/receptionists', authAdmin, createReceptionistController)
router.post('/Doctor', authAdmin, uploadDoctor.single('image'), createDoctorController)

// account deletion
router.delete('/patients/:id', authAdmin, deletePatient)
router.delete('/doctors/:id', authAdmin, deleteDoctor)
router.delete('/receptionists/:id', authAdmin, deleteReceptionist)

router.get('/doctors', authAdmin, getDoctors);
router.get('/receptionists', authAdmin, getReceptionists);

router.delete('/doctor/:email', authAdmin, deleteDoctor);
router.delete('/receptionist/:email', authAdmin, deleteReceptionist);

router.put('/receptionist/deactivate/:email', authAdmin, deactivateReceptionist);
router.put('/doctor/deactivate/:email', authAdmin, deactivateDoctor);

router.put('/doctor/reactivate/:email', authAdmin, reactivateDoctor);
router.put('/receptionist/reactivate/:email', authAdmin, reactivateReceptionist);



router.delete('/receptionist/:id', authAdmin, deleteReceptionist);
// test route
router.get('/authTEST', authAdmin, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})
module.exports = router