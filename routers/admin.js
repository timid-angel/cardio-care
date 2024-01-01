const express = require('express')
const router = express.Router()
const createReceptionistController = require('../controllers/createReceptionistController')

router.post('/receptionist', createReceptionistController)

module.exports = router