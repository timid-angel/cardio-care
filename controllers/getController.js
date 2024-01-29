const Patient = require('../model/Patient')
const Payment = require('../model/Payment')
const Doctor = require('../model/Doctor')
const { getDoctorJWTID } = require('./jwtIDs')
const Receptionist = require('../model/Receptionist')

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({}, 'name.first name.middle name.last email  linkState  authorized mainDoctor  tempDoctor');
        res.status(200).json({ patients });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}, 'patient img _id checked accepted');
        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}, 'name.first name.middle name.last email  state expertise patients -_id');
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPatientList = async (req, res) => {
    try {
        const doctorID = getDoctorJWTID(req.cookies.jwt)
        const doctor = await Doctor.findById(doctorID)
        const patients = []

        const run = async () => {
            for (let i = 0; i < doctor.patients.length; i++) {
                const patient = await Patient.findById(doctor.patients[i])
                patients.push({
                    name: patient.name,
                    _id: patient._id.toString(),
                    email: patient.email,
                    address: patient.address,
                    img: patient.img,
                    gender: patient.gender,
                    dateOfBirth: patient.dateOfBirth
                })
            }
        }
        await run()
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getReceptionists = async (req, res) => {
    try {
        const receptionists = await Receptionist.find({}, 'name.first name.middle name.last email  state  -_id');
        res.status(200).json({ receptionists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPatients,
    getPayments,
    getDoctors,
    getPatientList,
    getReceptionists
}