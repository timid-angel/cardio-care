const Payment = require('../model/Payment')
const Patient = require('../model/Patient')
const path = require('path')

// image upload
const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "images", "payments"))
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {

    if (allowedImageTypes.includes(file.mimetype)) {
        cb(null, true); 
    } else {
        console.log('invalid file type ')
        cb(new Error('Invalid file type. Only images (JPEG, PNG, GIF) are allowed.'), false); // Reject the file
    }
};

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
    if (!patient) {
        res.status(400).json({ 'error': 'Patient not found' })
        return
    }

    const filePath = path.join(__dirname, "..", "images", "payments") + "/" + patient.img
    console.log(filePath)
    res.sendFile(filePath)
}

// add payment
const postPayment = async (req, res) => {
    if (!req.body?.email) {
        res.status(400).json({ 'error': 'Please enter your email' })
        return
    }

    const email = req.body?.email
    try {
        /* // checking if email is present in the db */
        const exists = await Patient.findOne({ email });
        if (!exists) {
            res.status(404).json({ error: 'Incorrect email' });
            return;
        }

        /* // checking if the input Email matches the logged in account */
        const patientId = getPatientJWTID(req.cookies.jwt)
        if (!patientId) return res.sendStatus(400)
        const patient = await Patient.findById(patientId)
        if (patient.email !== email) {
            res.status(404).json({ error: 'The input email doesnt match to this account' });
            return;
        }

        const payment = await Payment.create({
            patient: req.body.email,
            img: req.file.filename
        })
        res.sendStatus(201)

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }


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
        await payment.save
        return
    }

    payment.checked = true
    payment.accepted = true
    await payment.save

    // CHANGE PATIENT STATUS ONCE DONE
    const patient = await Patient.findOne({ email: payment.patient })
    const date = new Date(Number(path.basename(payment.img)))
    patient.lastPaymentDate = date
    patient.authorized = true
    await patient.save()
    res.sendStatus(200)
}


module.exports = { getPage, upload, getPayments, getPaymentReceipt, postPayment, verify }