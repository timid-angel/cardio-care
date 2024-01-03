const Admin = require('../model/Admin')
const Doctor = require('../model/Doctor')
const Calendar = require('../model/Calendar')
const Patient = require('../model/Patient')
const MedicalRecord = require('../model/MedicalRecord')
const Receptionist = require('../model/Receptionist')
const bcrypt = require('bcrypt')

const createAdminController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const adminDb = await Admin.findOne({ email: body.email })

        if (adminDb) {
            res.status(400).json({ 'error': 'There is a admin account assocaited with the provided email.' })
            return
        }

        // add default values to the incoming admin account
        body.password = await bcrypt.hash(body.password, 10)

        const data = await Admin.create(body)
        res.status(201).json({ 'success': `Created admin with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

const createDoctorController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const doctorDb = await Doctor.findOne({ email: body.email })

        if (doctorDb) {
            res.status(400).json({ 'error': 'There is a doctor account assocaited with the provided email.' })
            return
        }

        // add default values to the incoming doctor account
        body.password = await bcrypt.hash(body.password, 10)
        if (!body.calendar) {
            const calendar = await Calendar.create({ creationDate: new Date() })
            body.calendar = calendar._id
        }

        const data = await Doctor.create(body)
        res.status(201).json({ 'success': `Created doctor with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

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

const createReceptionistController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const receptionistDb = await Receptionist.findOne({ email: body.email })

        if (receptionistDb) {
            res.status(400).json({ 'error': 'There is a receptionist account assocaited with the provided email.' })
        }

        body.password = await bcrypt.hash(body.password, 10)

        const data = await Receptionist.create(body)
        res.status(201).json({ 'success': `Created receptionist with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

module.exports = { createAdminController, createDoctorController, createPatientController, createReceptionistController }