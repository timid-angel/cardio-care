const Doctor = require('../model/Doctor')
const Calendar = require('../model/Calendar')
const bcrypt = require('bcrypt')

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

module.exports = createDoctorController