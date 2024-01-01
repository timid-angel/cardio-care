const express = require('express')
const router = express.Router()
// controllers
const receptionistLoginController = require('../controllers/receptionistLoginController')
const linkController = require('../controllers/linkController')
const unlinkController = require('../controllers/unlinkController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE LOGIN PAGE YEEE")
})

router.post('/login', receptionistLoginController)
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)
// router.post('/patient/:id', patientVerificationController)
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'yes': 'YIPPIIEEEE' })
})

module.exports = router