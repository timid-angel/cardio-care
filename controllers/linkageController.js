const Patient = require('../model/Patient')
const Doctor = require('../model/Doctor')

const linkController = async (req, res) => {
    try {
        const { doctorEmail, patientEmail } = req.body;

        const patient = await Patient.findOne({ email: patientEmail });
        const doctor = await Doctor.findOne({ email: doctorEmail });

        if (!patient || !doctor) {
            return res.status(400).json({ error: 'Patient or Doctor not found' });
        }

        const doctorUpdated = await Doctor.findOneAndUpdate(
            { email: doctorEmail },
            { $addToSet: { patients: patientEmail } },
            { new: true }
        );

        if (!doctorUpdated) {
            return res.status(400).json({ error: 'Failed to update doctor' });
        }

        return res.status(200).json({
            success: `Patient: ${patientEmail} has been linked with Doctor: ${doctorEmail}.`
        });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};


const unlinkController = async (req, res) => {
    try {
        // the type attribute determines whether the requests links OR unlinks the doctor
        const { doctorEmail, patientEmail, type } = req.body
        const patient = await Patient.findOne({ email: patientEmail })
        const doctor = await Doctor.findOne({ email: doctorEmail })

        const key = type === "main" ? "mainDoctor" : type === "temp" ? "tempDoctor" : 0
        if (!key) {
            res.status(400).json({ 'error': "Invalid 'type' input" })
        }

        const patientIdx = doctor.patients.indexOf(patient._id)
        if (patientIdx === -1) {
            res.status(400).json({ "error": "Patient is not linked to doctor" })
        }
        if (!patient[key]) {
            res.status(400).json({ "error": `Patient does not have a doctor` })
        }
        patient[key] = null
        doctor.patients.splice(patientIdx, 1)

        patient.save()
        doctor.save()
    } catch (err) {
        res.status(400).json({ "error": err.message })
    }

}

module.exports = { linkController, unlinkController }