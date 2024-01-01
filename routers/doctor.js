const express = require('express')
// controllers
const doctorLoginController = require('../controllers/doctorLoginController')
// middleware
const authDoctor = require('../middleware/authDoctor')

const router = express.Router()

// login
router.get('/login', (req, res) => {
    // render the login page here
    res.send('THIS IS THE DOCTOR LOGIN PAGE')
})
router.post('/login', doctorLoginController)

// test route
router.get('/authTEST', authDoctor, (req, res) => {
    res.send('Authenticated successfully')
})

module.exports = router