const { getDoctorJWTID, getPatientJWTID } = require('./jwtIDs')
const Doctor = require('../model/Doctor')
const Patient = require('../model/Patient')
const MedicalRecord = require('../model/MedicalRecord')

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


const patientDashboard = async (req, res) => {
    const patientID = getPatientJWTID(req.cookies.jwt)
    const patient = await Patient.findById(patientID)
    const doctor = await Doctor.findById(patient.mainDoctor)
    const medicalRecord = await MedicalRecord.findById(patient.medicalRecord.toString())
    let name
    let fName
    if (patient.name.middle) {
        name = patient.name.first + " " + patient.name.middle[0] + ". " + patient.name.last
        fName = patient.name.first + " " + patient.name.middle[0] + "." + patient.name.last[0]
    } else {
        name = patient.name.first + " " + patient.name.last
        fName = patient.name.first + " " + patient.name.last[0]
    }

    let doctorName
    if (doctor?.name) {
        if (doctor.name.middle) {
            doctorName = doctor.name.first + " " + doctor.name.middle[0] + ". " + doctor.name.last
        } else {
            doctorName = doctor.name.first + " " + doctor.name.last
        }
    }

    res.render('./patientViews/patient-dashboard', {
        name,
        fName,
        gender: patient.gender,
        image: patient.img,
        email: patient.email,
        id: patient._id.toString(),
        birthdate: patient.dateOfBirth ? patient.dateOfBirth.toLocaleDateString() : null,
        phone: patient.phoneNumber,
        address: patient.address ? patient.address.subCity + " Woreda " + patient.address.woreda + ", " + patient.address.houseNumber : null,
        doctorName,
        doctorEmail: doctor ? doctor.email || "Not Available" : null,
        doctorPhone: doctor ? doctor.phoneNumber || "Not Available" : null,
        expertise: doctor ? doctor.expertise[0] || 'General Medicine' : null,
        doctorId: doctor ? doctor._id.toString() : null,
        doctorImage: doctor ? doctor.img : null,
        paymentDate: patient.lastPaymentDate ? patient.lastPaymentDate.toLocaleDateString() : null,
        geneticVulnerabilities: medicalRecord.geneticVulnerabilities.length === 0 ? ["-"] : medicalRecord.geneticVulnerabilities,
        allergies: medicalRecord.allergies.length === 0 ? ["-"] : medicalRecord.allergies,
        vaccinations: medicalRecord.vaccination.length === 0 ? ["-"] : medicalRecord.vaccination,
        recentMedication: medicalRecord.currentMedication.length === 0 ? ["-"] : medicalRecord.currentMedication
    })
}

const patientLogs = async (req, res) => {
    res.render('./patientViews/patient-log')
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

    let name
    let fName
    if (patient.name.middle) {
        name = patient.name.first + " " + patient.name.middle[0] + ". " + patient.name.last
        fName = patient.name.first + " " + patient.name.middle[0] + "." + patient.name.last[0]
    } else {
        name = patient.name.first + " " + patient.name.last
        fName = patient.name.first + " " + patient.name.last[0]
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
        fName,
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


const receptionistDashboard = (req, res) => {
    res.render('./receptionistViews/receptionDashboard');
}

const paymentsPage = (req, res) => {
    res.render('./receptionistViews/paymentpage');
}

const addPatient = (req, res) => {
    res.render('./receptionistViews/addPatient');
}

const adminDashboard = (req, res) => {
    res.render('./adminViews/adminDashboard');
}
const addDoctor = (req, res) => {
    res.render('./adminViews/addDoctor');
}

const manageDoctors = (req, res) => {
    res.render('./adminViews/manage-Doctor');
}

const manageReceptionits = (req, res) => {
    res.render('./adminViews/manage-Recep');
}

const getAppointment = (req, res) => {
    res.render('./patientViews/appointment')
}

const getAdminPatients = (req, res) => {
    res.render('./adminViews/patientList')
}

const getAllPatients = async (req, res) => {
    const patients = await Patient.find({})
    res.status(200).json(patients)
}

module.exports = { patientDashboard, doctorDashboard, getDoctorPatients, getPatientDetails, patientLogs, receptionistDashboard, paymentsPage, addPatient, adminDashboard, addDoctor, manageDoctors, manageReceptionits, getAppointment, getAllPatients, getAdminPatients }