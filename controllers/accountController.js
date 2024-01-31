const Admin = require('../model/Admin')
const Doctor = require('../model/Doctor')
const Calendar = require('../model/Calendar')
const Patient = require('../model/Patient')
const MedicalRecord = require('../model/MedicalRecord')
const Receptionist = require('../model/Receptionist')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcrypt')
const path = require('path')
const multer = require('multer')

// multer middleware for patients
const storagePatient = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "images", "patients"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const uploadPatient = multer({ storage: storagePatient })

// multer middleware for doctors
const storageDoctor = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "images", "doctors"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const uploadDoctor = multer({ storage: storageDoctor })

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

const createDoctorController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const doctorDb = await Doctor.findOne({ email: body.email })

        if (doctorDb) {
            res.status(400).json({ 'error': 'There is a doctor account assocaited with the provided email.' })
            return
        }

        // add default values and changes to the incoming doctor account
        if (req.file?.filename) {
            body.img = req.file.filename
        }
        body.password = await bcrypt.hash(body.password, 10)
        if (!body.calendar) {
            const calendar = await Calendar.create({ creationDate: new Date() })
            body.calendar = calendar._id
        }

        const data = await Doctor.create(body)
        res.status(201).json({ 'success': `Created doctor with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

const createPatientController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const patientDb = await Patient.findOne({ email: body.email })

        if (patientDb) {
            res.status(400).json({ 'error': 'There is a patient account assocaited with the provided email.' })
            return
        }

        // add default values and changes to the incoming patient account
        if (req.file?.filename) {
            body.img = req.file.filename
        }
        body.password = await bcrypt.hash(body.password, 10)
        body.lastPaymentDate = new Date()
        if (!body.currentAppointment) {
            body.currentAppointment = null
        }
        if (!body.medicalRecord) {
            const medicalRec = await MedicalRecord.create({ creationDate: new Date() })
            body.medicalRecord = medicalRec._id
        }

        const data = await Patient.create(body)
        res.status(201).json({ 'success': `Created patient with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

const createReceptionistController = async (req, res) => {
    try {
        const body = req.body

        if (!body || !body.email || !body.password) {
            res.status(400).json({ 'error': 'Both email and password are required' })
            return
        }
        const receptionistDb = await Receptionist.findOne({ email: body.email })

        if (receptionistDb) {
            res.status(400).json({ 'error': 'There is a receptionist account assocaited with the provided email.' })
        }

        body.password = await bcrypt.hash(body.password, 10)

        const data = await Receptionist.create(body)
        res.status(201).json({ 'success': `Created receptionist with email: ${data.email}` })

    } catch (err) {
        res.status(500).json({ 'error': err.message })
    }
}

const deletePatient = async (req, res) => {
    if (!req.params?.id) {
        return res.status(400).json({ 'error': "Route parameter not found." })
    }
    const patientId = req.params.id
    if (!isValidObjectId(patientId)) {
        return res.status(400).json({ 'error': 'Invalid ID number' })
    }

    const patient = await Patient.findOne({ _id: patientId })
    if (!patient) {
        return res.status(400).json({ 'error': 'Patient ID not found' })
    }
    if (patient.mainDoctor) {
        const doctor = await Doctor.findById(patient.mainDoctor)
        doctor.patients = doctor.patients.filter(patientId => patientId !== patient._id.toString())
        await doctor.save()
    }

    await MedicalRecord.deleteOne({ _id: patient.medicalRecord })
    await Patient.deleteOne({ _id: patientId })
    res.status(200).json({ 'success': 'Deleted patient ID: ' + patientId })
}

const deleteDoctor = async (req, res) => {
    const email = req.params.email;

    if (!email) {
        return res.status(400).json({ 'error': "Email parameter not found." });
    }

    try {
        const doctor = await Doctor.findOne({ 'email': email });

        if (!doctor) {
            return res.status(404).json({ 'error': 'Doctor with the specified email not found.' });
        }

        // Assuming `calendar` is a reference to a Calendar model
        await Calendar.deleteOne({ _id: doctor.calendar });

        // Delete the doctor using the email
        await Doctor.deleteOne({ 'email': email });

        return res.status(200).json({ 'success': 'Deleted doctor with email: ' + email });
    } catch (error) {
        return res.status(500).json({ 'error': 'Internal server error.' });
    }
};


const deleteReceptionist = async (req, res) => {
    if (!req.params?.email) {
        return res.status(400).json({ 'error': "Route parameter not found." })
    }

    const receptionistEmail = req.params.email;

    const receptionist = await Receptionist.findOne({ email: receptionistEmail })
    if (!receptionist) {
        return res.status(400).json({ 'error': 'Receptionist email not found' })
    }

    await Receptionist.deleteOne({ email: receptionistEmail })
    res.status(200).json({ 'success': 'Deleted receptionist email: ' + receptionistEmail })
}

const deactivateReceptionist = async (req, res) => {
    try {
        // Check if email parameter exists
        if (!req.params?.email) {
            return res.status(400).json({ 'error': "Route parameter not found." });
        }

        const receptionistEmail = req.params.email;

        // Find the receptionist by email
        const receptionist = await Receptionist.findOne({ email: receptionistEmail });

        if (!receptionist) {
            return res.status(400).json({ 'error': 'Receptionist email not found' });
        }

        // Update the state attribute to 'inactive' (or your desired state)
        receptionist.state = 'inactive';
        await receptionist.save();

        res.status(200).json({ 'success': 'Deactivated receptionist email: ' + receptionistEmail });
    } catch (error) {
        console.error('Error deactivating receptionist:', error);
        res.status(500).json({ 'error': 'Internal server error' });
    }
};

const deactivateDoctor = async (req, res) => {
    try {
        // Check if email parameter exists
        if (!req.params?.email) {
            return res.status(400).json({ 'error': "Route parameter not found." });
        }

        const doctorEmail = req.params.email;


        const doctor = await Doctor.findOne({ email: doctorEmail });

        if (!doctor) {
            return res.status(400).json({ 'error': 'doctor email not found' });
        }

        // Update the state attribute to 'inactive' (or your desired state)
        doctor.state = 'inactive';
        await doctor.save();

        res.status(200).json({ 'success': 'Deactivated doctor email: ' + doctorEmail });
    } catch (error) {
        console.error('Error deactivating doctor:', error);
        res.status(500).json({ 'error': 'Internal server error' });
    }
};

const reactivateDoctor = async (req, res) => {
    try {
        // Check if email parameter exists
        if (!req.params?.email) {
            return res.status(400).json({ 'error': "Route parameter not found." });
        }

        const doctorEmail = req.params.email;


        const doctor = await Doctor.findOne({ email: doctorEmail });

        if (!doctor) {
            return res.status(400).json({ 'error': 'doctor email not found' });
        }


        doctor.state = 'active';
        await doctor.save();

        res.status(200).json({ 'success': 'reactivated doctor email: ' + doctorEmail });
    } catch (error) {
        console.error('Error reactivating doctor:', error);
        res.status(500).json({ 'error': 'Internal server error' });
    }
};

const reactivateReceptionist = async (req, res) => {
    try {
        // Check if email parameter exists
        if (!req.params?.email) {
            return res.status(400).json({ 'error': "Route parameter not found." });
        }

        const receptionistEmail = req.params.email;



        const receptionist = await Receptionist.findOne({ email: receptionistEmail });

        if (!receptionist) {
            return res.status(400).json({ 'error': 'receptionist email not found' });
        }


        receptionist.state = 'active';
        await receptionist.save();

        res.status(200).json({ 'success': 'reactivated receptionist email: ' + receptionistEmail });
    } catch (error) {
        console.error('Error reactivating receptionist:', error);
        res.status(500).json({ 'error': 'Internal server error' });
    }
};

module.exports = {
    createAdminController,
    createDoctorController,
    createPatientController,
    createReceptionistController,
    uploadPatient,
    uploadDoctor,
    deletePatient,
    deleteDoctor,
    deleteReceptionist,

    deactivateReceptionist,
    deactivateDoctor,
    reactivateDoctor,
    reactivateReceptionist
}