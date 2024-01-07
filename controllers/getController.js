const Patient = require('../model/Patient')
const Payment = require('../model/Payment')
const Doctor = require('../model/Doctor')

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({}, 'name.first name.middle name.last email -_id');
        res.status(200).json({ patients }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}, 'patient img -_id'); // Adjust the fields as needed
        res.status(200).json({ payments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getDoctors = async (req, res) => {
    try {
        // Assuming the Doctor model has fields like firstName, middleName, lastName, email
        const doctors = await Doctor.find({}, 'name.first name.middle name.last email -_id');
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getPatients,
    getPayments,
    getDoctors
}