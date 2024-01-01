const Patient = require('../model/Patient')
const MedicalRecord = require('../model/MedicalRecord')
const bcrypt = require('bcrypt')

const createPatientController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const patientDb = await Patient.findOne({ email: body.email })

        if (patientDb) {
            res.status(400).json({ 'error': 'There is a patient account assocaited with the provided email.' })
            return
        }

        // add default values to the incoming patient account
        body.password = await bcrypt.hash(body.password, 10)
        body.lastPaymentDate = new Date()
        if (!body.currentAppointment) {
            body.currentAppointment = null
        }
        if (!body.medicalRecord) {
            const medicalRec = await MedicalRecord.create({ creationDate: new Date() })
            body.medicalRecord = medicalRec._id
        }

        const data = await Patient.create(body)
        res.status(201).json({ 'success': `Created patient with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

module.exports = createPatientController