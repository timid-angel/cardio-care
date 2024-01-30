const Patient = require('../model/Patient')
const Doctor = require('../model/Doctor')
const { getDoctorJWTID, getPatientJWTID } = require('./jwtIDs')

// check if the doctor is linked to the patient
function isLinked(patient, doctor) {
    const found = doctor.patients.find(item => item.valueOf() === patient._id.valueOf())
    return found ? true : false
}

// SYMPTOM LOGS
const addSymptom = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    const symptom = req.body
    symptom.date = new Date()
    patient.symptomLog.push(symptom)
    await patient.save()
    res.status(201).json(patient.symptomLog)
}

const getSymptomsPatient = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    res.status(200).json(patient.symptomLog)
}

const getSymptomsDoctor = async (req, res) => {
    const patient = await Patient.findOne({ email: req.body.patientEmail })
    // check if doctor is linked to patient
    if (!patient) return res.sendStatus(400)
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(500)
    const doctor = await Doctor.findById(doctorId)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    res.status(200).json(patient.symptomLog)
}

const deleteSymtpom = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    const dateReq = new Date(req.body.date).valueOf()
    if (!dateReq) {
        res.status(400).json({ 'error': 'Invalid date value' })
    }

    patient.symptomLog = patient.symptomLog.filter(item => item.date.valueOf() !== dateReq.valueOf())
    await patient.save()
    res.status(200).json(patient.symptomLog)
}


// DAILY READING LOGS
const addDailyReading = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    const dailyReading = req.body
    dailyReading.date = new Date()
    patient.dailyReading.push(dailyReading)
    await patient.save()
    res.status(201).json(patient.dailyReading)
}

const getReadingsPatient = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    res.status(200).json(patient.dailyReading)
}

const getReadingsDoctor = async (req, res) => {
    if (!req.params?.id) return res.sendStatus(400)
    const patient = await Patient.findById(req.params.id)
    // check if doctor is linked to patient
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(500)
    const doctor = await Doctor.findById(doctorId)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    if (!patient) return res.sendStatus(400)
    res.status(200).json(patient.dailyReading)
}

const deleteReading = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    const dateReq = new Date(req.body.date).valueOf()
    if (!dateReq) {
        res.status(400).json({ 'error': 'Invalid date value' })
    }

    patient.dailyReading = patient.dailyReading.filter(item => item.date.valueOf() !== dateReq.valueOf())
    await patient.save()
    res.status(200).json(patient.dailyReading)
}


// DOCTOR ORDER
// the request must also contain the patient email to which the order will be added
const addDoctorOrder = async (req, res) => {
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(400)
    const patient = await Patient.findById(req.params.id)
    const doctor = await Doctor.findById(doctorId)
    if (!patient || !doctor) return res.sendStatus(400)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    const order = {
        noteType: req.body.noteType,
        date: new Date(),
        description: req.body.description,
        doctor: doctorId.valueOf(), // doctor ID stored AS A STRING
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }
    patient.orderLog.push(order)
    await patient.save()
    res.status(201).json(patient.orderLog)
}

const getOrdersPatient = async (req, res) => {
    const patientId = getPatientJWTID(req.cookies.jwt)
    if (!patientId) return res.sendStatus(500)
    const patient = await Patient.findById(patientId)
    res.status(200).json(patient.orderLog)
}

const getOrdersDoctor = async (req, res) => {
    if (!req.params?.id) return res.sendStatus(400)
    const patient = await Patient.findById(req.params.id)
    // check if doctor is linked to patient
    if (!patient) return res.sendStatus(400)
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(500)
    const doctor = await Doctor.findById(doctorId)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    if (!patient) return res.sendStatus(400)
    res.status(200).json(patient.orderLog)
}

// request to be sent by a doctor
const deleteOrder = async (req, res) => {
    if (!req.params?.orderId || !req.params?.patientId) return res.status(400).json('Order or Patient ID not found')
    const patient = await Patient.findById(req.params.patientId)
    if (!patient) return res.status(400).json('Patient not found')
    // check if doctor is linked to patient
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(400).json('Patient not found')
    const doctor = await Doctor.findById(doctorId)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    patient.orderLog = patient.orderLog.filter(item => item._id.toString() !== req.params.orderId)
    await patient.save()
    res.sendStatus(204)
}


// DOCTOR NOTES
// the request must also contain the patient email whose value will be added to the note
const addDoctorNote = async (req, res) => {
    if (!req.params?.id) return res.sendStatus(400)
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(400)
    const patient = await Patient.findById(req.params.id)
    const doctor = await Doctor.findById(doctorId)
    if (!patient || !doctor) return res.sendStatus(400)
    if (!isLinked(patient, doctor)) return res.sendStatus(401) // unauthorized
    const note = {
        noteType: req.body.noteType,
        date: new Date(),
        description: req.body.description,
        patient: patient._id.valueOf() // patient ID stored AS A STRING
    }

    doctor.notes.push(note)
    await doctor.save()
    res.status(201).json(doctor.notes)
}

const getNotes = async (req, res) => {
    if (!req.params?.id) return res.sendStatus(400)
    const patient = await Patient.findById(req.params.id)
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(400)
    const doctor = await Doctor.findById(doctorId)
    const patientNotes = doctor.notes.filter(note => note.patient === patient._id.toString())
    res.status(200).json(patientNotes)
}

const deleteNote = async (req, res) => {
    if (!req.params?.noteId) return res.sendStatus(400)
    const doctorId = getDoctorJWTID(req.cookies.jwt)
    if (!doctorId) return res.sendStatus(400)
    const doctor = await Doctor.findById(doctorId)
    doctor.notes = doctor.notes.filter(item => item._id.toString() !== req.params.noteId)
    await doctor.save()
    res.status(200).json(doctor.notes)
}

module.exports = {
    addSymptom,
    addDailyReading,
    addDoctorOrder,
    addDoctorNote,
    getSymptomsDoctor,
    getSymptomsPatient,
    getReadingsDoctor,
    getReadingsPatient,
    getOrdersDoctor,
    getOrdersPatient,
    getNotes,
    deleteSymtpom,
    deleteReading,
    deleteOrder,
    deleteNote
}