const Admin = require('../model/Admin')
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

module.exports = createAdminController