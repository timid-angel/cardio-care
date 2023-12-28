const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const Doctor = require('./model/Doctor')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run(doctorEmail) {
    try {
        const patient = await Patient.findOne({ email: "medicalRecord@gmail.com" })
        const doctor = await Doctor.findOne({ email: doctorEmail })
        patient.addOrder({
            noteType: "Medication",
            date: new Date(),
            description: "Asprin, then rat poision at 12PM everyday",
            doctor: doctor.email,
            startTime: new Date('2020-12-12'),
            endTime: new Date('2022-1-3')
        })

    } catch (err) {
        console.log(err.message)
    }
}
run("doctor1@gmail.com")