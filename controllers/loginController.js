const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Receptionist = require('../model/Receptionist')
const Patient = require('../model/Patient')
const Doctor = require('../model/Doctor')
const Admin = require('../model/Admin')

const receptionistLoginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ 'error': 'No email or password provided.' })
        return
    }

    try {
        const receptionist = await Receptionist.findOne({ email: email })
        if (!receptionist) {
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }
        const correct = await bcrypt.compare(password, receptionist.password) // returns a promise apparently
        if (!correct) {
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }

        // sign the jwt and send it as a cookie upon login
        const token = jwt.sign(
            { id: receptionist._id, role: 1 },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: 24 * 3600 }
        )

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({ 'success': 'Correct credentials' })

    } catch (err) {
        res.status(409).json({ 'error': err.message })
    }

}

const patientLoginController = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Please provide email and password' });
        return;
    }

    try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            res.status(409).json({ error: 'Incorrect email or password' });
            return;
        }

        const correctPassword = await bcrypt.compare(password, patient.password);
        if (!correctPassword) {
            res.status(409).json({ error: 'Incorrect email or password' });
            return;
        }

        if (!patient.authorized) {
            res.status(403).json({ error: 'Account not authorized' });
            alert('Your account has been deactivated contact your hospital for support')
            return;
        }

        const token = jwt.sign(
            { id: patient._id, role: 3 },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '24h' }
        );

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600000 });
        res.status(200).json({ success: 'Correct credentials' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const doctorLoginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ 'error': 'No email or password provided.' })
        return
    }

    try {
        const doctor = await Doctor.findOne({ email: email })
        if (!doctor) {
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }
        const correct = await bcrypt.compare(password, doctor.password) // Fixed variable name to 'doctor'
        if (!correct) {
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }

        // sign the jwt and send it as a cookie upon login
        const token = jwt.sign(
            { id: doctor._id, role: 2 },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: 24 * 3600 }
        )

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({ 'success': 'Correct credentials' })

    } catch (err) {
        res.status(409).json({ 'error': err.message })
    }
}

const adminLoginController = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ 'error': 'No email or password provided.' })
        return
    }

    try {
        const admin = await Admin.findOne({ email: email })
        if (!admin) {
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }
        const correct = await bcrypt.compare(password, admin.password) // returns a promise apparently
        if (!correct) {
            res.cookie('jwt', '', { httpOnly: true, maxAge: 1 })
            res.status(409).json({ 'error': 'Incorrect email or password' })
            return
        }

        // sign the jwt and send it as a cookie upon login
        const token = jwt.sign(
            { id: admin._id, role: 0 },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: 24 * 3600 }
        )

        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 3600000 })
        res.status(200).json({ 'success': 'Correct credentials' })

    } catch (err) {
        res.status(409).json({ 'error': err.message })
    }

}

module.exports = { receptionistLoginController, doctorLoginController, patientLoginController, adminLoginController }