const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Doctor = require('../model/Doctor')

const doctorLoginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ 'error': 'was good fam, there is nothing here' })
        return
    }

    try {
        const doctor = await Doctor.findOne({ email: email })
        if (!doctor) {
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }
        const correct = await bcrypt.compare(password, patient.password) // returns a promise apparently
        if (!correct) {
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }

        // sign the jwt and send it as a cookie upon login
        const token = jwt.sign(
            { id: patient._id, role: 2 },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: 24 * 3600 }
        )

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({ 'success': 'Correct credentials' })

    } catch (err) {
        res.status(409).json({ 'error': err.message })
    }
}

module.exports = doctorLoginController