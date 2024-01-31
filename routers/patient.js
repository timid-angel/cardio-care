const express = require('express')
// controllers
const { getPage, postPayment, upload } = require('../controllers/paymentVerification')
const { patientLoginController } = require('../controllers/loginController')
const appointmentController = require('../controllers/appointmentController')
const multer = require('multer')
const path = require('path')
const { patientDashboard, patientLogs, getAppointment } = require('../controllers/dashboardController')
const {
    addSymptom,
    getSymptomsPatient,
    deleteSymtpom,
    addDailyReading,
    getReadingsPatient,
    deleteReading,
    getOrdersPatient,
    handleExport,
    handleImport,
    getMedicalPatient
} = require('../controllers/logController')
// middleware
const authPatient = require('../middleware/authPatient')

const router = express.Router()

// login
router.get('/', (req, res) => res.redirect('/patient/dashboard'))
router.get('/login', (req, res) => {
    res.render('./patientViews/login')
})
router.post('/login', patientLoginController)
router.get('/logout', (req, res) => {
    res.cookie('jwt', 1, { maxAge: 1 }).redirect('/patient/login')
})

// dashboard
router.get('/dashboard', authPatient, patientDashboard)

// appointment routes
router.get('/appointments', authPatient, getAppointment)
router.post('/appointments', authPatient, appointmentController.addAppointment)

// payment verification routes
router.get('/payment', getPage)
router.post('/payment', upload.single('image'), postPayment)

// log page
router.get('/logs', authPatient, patientLogs)

// symptom logs
router.get('/symptoms', authPatient, getSymptomsPatient)
router.post('/symptoms', authPatient, addSymptom)
router.delete('/symptoms/:id', authPatient, deleteSymtpom)

// daily readings
router.get('/readings', authPatient, getReadingsPatient)
router.get('/med-readings', authPatient, getMedicalPatient)
router.post('/readings', authPatient, addDailyReading)
router.delete('/readings', authPatient, deleteReading)

// orders
router.get('/orders', authPatient, getOrdersPatient)

// test route
router.get('/authTEST', authPatient, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})

const storage = multer.diskStorage({
    destination: 'importUploads/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}`);
    }
});

const fileFilter = (req, file, cb) => {

    const isJsonFile = file.originalname.startsWith('jsonFile-') || file.originalname.endsWith('.json');

    if (isJsonFile) {
        console.log('vallid type')
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only files with names starting with "jsonFile-" or with a .json extension are allowed.'), false); // Reject the file
    }
};

const u = multer({ storage: storage, fileFilter: fileFilter });
router.post('/importRecord', u.single('jsonFile'), authPatient, handleImport, (req, res) => {
    res.json({ "message": "successfully imported" })
})

router.get('/exportRecord', authPatient, handleExport, (req, res) => {
    res.json({ "message": "successfully exported" })
})

module.exports = router