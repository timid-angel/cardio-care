const express = require('express')
const router = express.Router()
const multer = require('multer')
const Patient = require('../model/Patient');
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const linkController = require('../controllers/linkController')
const unlinkController = require('../controllers/unlinkController')
const paymentVerification = require('../controllers/paymentVerification')
const { createPatientController } = require('../controllers/accountController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

// login routes
router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE RECEPTIONIST LOGIN PAGE")
})
router.post('/login', receptionistLoginController)

// payment routes
router.get('/payments', paymentVerification.getPayments)
router.get('/payments/receipt', paymentVerification.getPaymentReceipt)
router.post('/payments/receipt', paymentVerification.verify)

// link routes
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)

// patient creation route
router.post('/patients', createPatientController)

// test routes
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'yes': 'YIPPIIEEEE' })
})
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find({}, { 'name.first': 1, 'name.middle': 1, 'name.last': 1, _id: 0 });

        res.status(200).json({ patients }); // Send the list of patients as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router