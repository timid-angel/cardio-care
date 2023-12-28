const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const MedicalRecord = require('./model/MedicalRecord')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const patient = await Patient.findOne({ email: "medicalRecord@gmail.com" })
        const medicalRec = await MedicalRecord.findOne({ _id: patient.medicalRecord })

        medicalRec.addVitalReadings('allergies', 'NUTS')

    } catch (err) {
        console.log(err.message)
    }
}
run()