const { getDoctorJWTID } = require('./jwtIDs')
const Doctor = require('../model/Doctor')

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

module.exports = { patientDashboard, doctorDashboard, getDoctorPatients }