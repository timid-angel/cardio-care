const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Patient = require('../model/Patient');
const Payment = require('../model/Payment');
const Doctor = require('../model/Doctor');
// controllers
const { receptionistLoginController } = require('../controllers/loginController')
const { linkController, unlinkController } = require('../controllers/linkageController')

const { createPatientController, uploadPatient, deletePatient } = require('../controllers/accountController')
const { getPatients } = require('../controllers/getController')
const { getPayments } = require('../controllers/getController')
const { getDoctors } = require('../controllers/getController')
// middleware
const authReceptionist = require('../middleware/authReceptionist')

// login routes
router.get('/login', (req, res) => {
    // RENDER LOGIN PAGE HERE
    res.send("THIS IS THE RECEPTIONIST LOGIN PAGE")
})
router.post('/login', receptionistLoginController)

// payment routes




// Handle GET request to /patient/payment
router.get('/payment', getPayments);


// link routes
router.post('/link', authReceptionist, linkController)
router.post('/unlink', authReceptionist, unlinkController)

// Express Router setup in your backend

// Route for linking patients with doctors
// Route for linking patients with doctors
router.post('/patients/link', async (req, res) => {
    try {
        const { patientEmail, doctorEmail, linkType } = req.body; // Assuming this data is sent from the frontend

        // Fetch patient and doctor records from MongoDB based on the provided emails
        const patient = await Patient.findOne({ email: patientEmail });
        const doctor = await Doctor.findOne({ email: doctorEmail });


        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Update patient's mainDoctor or tempDoctor based on the linkType provided
        if (linkType === 'mainDoctor') {
            patient.mainDoctor = doctor._id;
            patient.linkState = 'active'
        } else if (linkType === 'tempDoctor') {
            patient.tempDoctor = doctor._id;
            patient.linkState = 'active'
        }

        await patient.save(); // Save the updated patient record

        // Update doctor's patients array with patient's email
        doctor.patients.push(patient.email);
        await doctor.save(); // Save the updated doctor record

        return res.status(200).json({ success: true, message: 'Patient-doctor linkage updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete('/unlink/:email', async (req, res) => {
    const patientEmail = req.params.email;


    try {
        const updatedPatient = await Patient.findOneAndUpdate(
            { email: patientEmail },
            { $unset: { mainDoctor: 1, tempDoctor: 1 }, $set: { linkState: 'inactive' } },
            { new: true }
        );

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Remove patientEmail from all doctors' patients arrays
        const mainDoctorId = updatedPatient.mainDoctor;
        const tempDoctorId = updatedPatient.tempDoctor;

        const removePatientFromDoctor = async (doctorId) => {
            if (doctorId) {
                console.log(`Removing ${patientEmail} from doctor ${doctorId}`);
                await Doctor.updateOne(
                    { _id: doctorId },
                    { $pull: { patients: patientEmail } }
                );
            }
        };

        await removePatientFromDoctor(mainDoctorId);
        if (tempDoctorId && tempDoctorId !== mainDoctorId) {
            await removePatientFromDoctor(tempDoctorId);
        }

        const allDoctors = await Doctor.find({});
        for (const doctor of allDoctors) {
            await removePatientFromDoctor(doctor._id);
        }

        console.log('Patient unlinked successfully');
        res.status(200).json({ message: 'Patient unlinked successfully', patient: updatedPatient });
    } catch (error) {
        console.error('Error unlinking patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Route for updating doctor's patients array
router.post('/doctors/patients', async (req, res) => {
    try {
        const { doctorEmail, patientEmail } = req.body; // Data sent from the frontend

        // Fetch doctor record from MongoDB based on the provided email
        const doctor = await doctor.findOne({ email: doctorEmail });

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        // Update doctor's patients array with patient's email
        doctor.patients.push(patientEmail);
        await doctor.save(); // Save the updated doctor record

        return res.status(200).json({ success: true, message: 'Doctor patients updated' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
});




router.put('/deactivate-patient/:email', async (req, res) => {
    const patientEmail = req.params.email;

    try {
        const updatedPatient = await Patient.findOneAndUpdate({ email: patientEmail }, { authorized: false });

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deactivated successfully' });
    } catch (error) {
        console.error('Error deactivating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/reactivate-patient/:email', async (req, res) => {
    const patientEmail = req.params.email;

    try {
        const updatedPatient = await Patient.findOneAndUpdate({ email: patientEmail }, { authorized: true });

        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient reactivated successfully' });
    } catch (error) {
        console.error('Error reactivating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put(`/verify-payment/:email`, async (req, res) => {
    const patientEmail = req.params.email;

    try {
        // Find the payment by patient email and update the 'checked' and 'accepted' attributes
        const updatedPayment = await Payment.findOneAndUpdate(
            { patient: patientEmail },
            { checked: true, accepted: true },
            { new: true } // To return the updated document
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment verified successfully', payment: updatedPayment });
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put(`/decline-payment/:email`, async (req, res) => {
    const patientEmail = req.params.email;

    try {
        // Find the payment by patient email and update the 'checked' and 'activated' attributes
        const updatedPayment = await Payment.findOneAndUpdate(
            { patient: patientEmail },
            { checked: true, accepted: false },
            { new: true } // To return the updated document
        );

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment declined successfully', payment: updatedPayment });
    } catch (error) {
        console.error('Error declining payment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// patient routes
router.get('/patients', getPatients);
router.post('/patients', uploadPatient.single('image'), createPatientController)
router.delete('/patients/:id', authReceptionist, deletePatient)
router.get('/patients', getPatients);

// test routes
router.get('/authTEST', authReceptionist, (req, res) => {
    res.json({ 'success': 'Authenticated successfully' })
})
router.get('/Doctor', getDoctors);
module.exports = router