const Patient = require('../model/Patient')

const getPatients = async (req, res) => {
    try {
        const patients = await Patient.find({}, { 'name.first': 1, 'name.middle': 1, 'name.last': 1, _id: 0 });
        res.status(200).json({ patients }); // Send the list of patients as JSON
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPatients
}