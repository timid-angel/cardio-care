const Patient = require('../model/Patient')
const Doctor = require('../model/Doctor')
const Calendar = require('../model/Calendar')
const jwt = require('jsonwebtoken')
const { getPatientJWTID, getDoctorJWTID } = require('./jwtIDs')

// patient appointment request
const addAppointment = async (req, res) => {
    if (!req.body?.date || !req.body?.durationMins) {
        res.status(400).json({ 'error': 'A date and duration is required.' })
        return
    }
    if (typeof req.body.date === "string") {
        req.body.date = new Date(req.body.date)
    }

    if (new Date(req.body.date) < new Date()) {
        res.status(400).json({ 'error': 'The date can not be in the past.' })
        return
    }

    try {
        const patientId = getPatientJWTID(req.cookies.jwt)
        if (!patientId) return res.sendStatus(500)
        const patient = await Patient.findOne({ _id: patientId })
        const doctor = await Doctor.findOne({ _id: patient.mainDoctor })
        const calendar = await Calendar.findOne({ _id: doctor.calendar })
        if (!patient.mainDoctor) {
            res.status(400).json({ 'error': 'The specified patient has not been assigned to a main doctor' })
            return
        }

        patient.currentAppointment = new Date(req.body.date)
        calendar.upcomingAppointments = calendar.addAppointment({
            patientId: patient._id.valueOf(),
            date: new Date(req.body.date),
            durationMins: req.body.durationMins,
            status: "unresolved" // to be accepted by the doctor
        })

        await patient.save()
        await calendar.save()
        res.sendStatus(200)

    } catch (err) {
        res.status(400).json({ 'error': err.message })
    }

}

// obtain appointments that are yet to be resolved
const getUnresolvedAppointments = async (req, res) => {
    try {
        const doctorId = getDoctorJWTID(req.cookies.jwt)
        if (!doctorId) return res.sendStatus(500)
        const doctor = await Doctor.findOne({ _id: doctorId })
        const calendar = await Calendar.findOne({ _id: doctor.calendar })
        const unresolvedApps = calendar.findUnresolved()

        res.status(200).json(unresolvedApps)

    } catch (err) {
        res.status(400).json({ 'error': err.message })
    }
}

// obtain appointments that are yet to be resolved
const getUpcomingAppointments = async (req, res) => {
    try {
        const doctorId = getDoctorJWTID(req.cookies.jwt)
        if (!doctorId) return res.sendStatus(500)
        const doctor = await Doctor.findOne({ _id: doctorId })
        const calendar = await Calendar.findOne({ _id: doctor.calendar })

        res.status(200).json(calendar.upcomingAppointments)

    } catch (err) {
        res.status(400).json({ 'error': err.message })
    }
}

// general method for changing statuses
const changeAppointmentStatus = async (req, res) => {
    try {
        if (!req.body?.status || !req.body?.appointmentId) {
            res.status(400).json({ 'error': "The appointment ID and the new status are required." })
        }
        const possibleStatuses = ["unresolved", "completed", "past", "cancelled", "upcoming"]
        if (possibleStatuses.indexOf(req.body.status) === -1) return res.json({ 'error': 'Invalid status' })
        const doctorId = getDoctor(req.cookies.jwt)
        if (!doctorId) return res.sendStatus(500)
        const doctor = await Doctor.findOne({ _id: doctorId })
        const calendar = await Calendar.findOne({ _id: doctor.calendar })
        const appointment = calendar.findAppointment(req.body.appointmentId)
        const patient = Patient.findOne({ _id: new ObjectId(appointment.patientId) })

        appointment.status = req.body.status
        // for a cancelled appointment
        if (appointment.status === "cancelled") {
            calendar.upcomingAppointments = calendar.removeAppointment(appointment._id)
            patient.currentAppointment = null
        }
        // for a completed appointment
        if (appointment.status === "completed" || appointment.status === "past") {
            calendar.upcomingAppointments = calendar.removeAppointment(appointment._id)
            calendar.oldAppointments.push(appointment)
            patient.currentAppointment = null
        }

        await patient.save()
        await calendar.save()

        res.sendStatus(200)
    } catch (err) {
        res.status(400).json({ 'error': err.message })
    }
}


module.exports = { addAppointment, getUnresolvedAppointments, changeAppointmentStatus, getUpcomingAppointments }