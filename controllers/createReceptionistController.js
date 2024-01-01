const Receptionist = require('../model/Receptionist')
const bcrypt = require('bcrypt')

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

module.exports = createReceptionistController