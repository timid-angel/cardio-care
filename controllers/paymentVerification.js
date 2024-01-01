const Payment = require('../model/Payment')
const path = require('path')

// image upload
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "images"))
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

// get upload page
const getPage = async (req, res) => {
    res.render('form')
}

// get pending payments
const getPayments = async (req, res) => {
    const patientList = await Payment.find({})
    const filtered = patientList.map(item => item.patient)
    res.json(filtered)
}

// get payment recepit of a single payment
const getPaymentReceipt = async (req, res) => {
    if (!req.body?.patient) {
        res.status(400).json({ 'error': 'Please enter the email' })
        return
    }

    const patient = await Payment.findOne({ patient: req.body.patient })
    console.log(patient)
    if (!patient) {
        res.status(400).json({ 'error': 'Patient not found' })
        return
    }

    const filePath = path.join(__dirname, "..", "images") + "/" + patient.img
    console.log(filePath)
    res.sendFile(filePath)
}

// add payment
const postPayment = async (req, res) => {
    if (!req.body?.email) {
        res.status(400).json({ 'error': 'Please enter your email' })
        return
    }
    const payment = await Payment.create({
        patient: req.body.email,
        img: req.file.filename
    })
}

// verify/reject receipt
const verify = async (req, res) => {
    if (!req.body?.patient) {
        res.status(400).json({ 'error': 'Please enter your email' })
        return
    }
    // "status" is a boolean value that checks if the request has been rejected or accepted
    if (!req.body?.status) {
        res.status(400).json({ 'error': 'Please enter your email' })
        return
    }

    const payment = await Payment.findOne({ patient: req.body.patient })
    if (req.body.status == "false") {
        payment.checked = true
    } else if (req.body.status == "true") {
        payment.checked = true
        payment.accepted = true
    }

    await payment.save

    // CHANGE PATIENT STATUS ONCE DONE

}


module.exports = { getPage, upload, getPayments, getPaymentReceipt, postPayment, verify }