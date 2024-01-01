const express = require('express')
const paymentVerification = require('../controllers/paymentVerification')

const router = express.Router()

router.get('/payment', paymentVerification.getPage)
router.post('/payment', paymentVerification.upload.single('image'), paymentVerification.postPayment)

module.exports = router