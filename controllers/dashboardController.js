const { getDoctorJWTID } = require('./jwtIDs')
const Doctor = require('../model/Doctor')
const Patient = require('../model/Patient')

const doctorDashboard = async (req, res) => {
    const doctorID = getDoctorJWTID(req.cookies.jwt)
    const doctor = await Doctor.findById(doctorID)
    res.render('./doctorViews/doctor-dashboard', {
        name: doctor.name.first + " " + doctor.name.middle[0] + ". " + doctor.name.last,
        image: '/doctors/' + doctor.img,
        email: doctor.email,
        id: doctor._id.toString(),
        phone: doctor.phoneNumber,
        expertise: doctor.expertise[0]
    })
}

const getDoctorPatients = async (req, res) => {
    const doctorID = getDoctorJWTID(req.cookies.jwt)
    const doctor = await Doctor.findById(doctorID)
    res.render('./doctorViews/patient-list', { name: doctor.name.first + " " + doctor.name.middle[0] + ". " + doctor.name.last })
}


const patientDashboard = (req, res) => {
    res.render('./patientViews/patient-dashboard')
}

// middleware to check if the doctor and the specified patient are linked
const isLinked = (doctor, patient) => {
    return doctor.patients.indexOf(patient._id.toString()) !== -1
}

const getPatientDetails = async (req, res) => {
    const patientID = req.params.id
    const doctorID = getDoctorJWTID(req.cookies.jwt)
    const doctor = await Doctor.findById(doctorID)
    const patient = await Patient.findById(patientID)
    if (!isLinked(doctor, patient)) {
        return res.redirect('/doctor/patients')
    }

    let doctor_name
    if (patient.mainDoctor.toString() === doctor._id.toString()) {
        doctor_name = doctor.name.first + " " + doctor.name.middle + " " + doctor.name.last
    } else {
        const mainDoc = await Doctor.findById(patient.mainDoctor)
        doctor_name = mainDoc.name.first + " " + mainDoc.name.middle + " " + mainDoc.name.last
    }

    let app_date
    if (!patient.currentAppointment || new Date(patient.currentAppointment) < new Date()) {
        app_date = ""
    } else {
        app_date = new Date(patient.currentAppointment).toLocaleString() + " - Dr." + doctor_name
    }


    res.status(200).render('./doctorViews/doctor-patient', {
        full_name: patient.name.first + " " + patient.name.middle + " " + patient.name.last,
        id: patient._id.toString(),
        gender: patient.gender,
        dateOfBirth: new Date(patient.dateOfBirth).toLocaleString(),
        address: patient.address.subCity + ", Woreda " + patient.address.woreda + ", " + patient.address.houseNumber,
        email: patient.email,
        phone: patient.phoneNumber,
        doctor_name,
        payment_date: new Date(patient.lastPaymentDate).toLocaleString(),
        image: '/patients/' + patient.img,
        app_date,
        h: app_date ? 12 : 0
    })
}

module.exports = { patientDashboard, doctorDashboard, getDoctorPatients, getPatientDetails }