const mongoose = require('mongoose')
const Doctor = require('./model/Doctor')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const doctor = await Doctor.findOne({ email: "doctor1@gmail.com" })
        console.log(doctor)
        doctor.addNote({
            noteType: "Extra stuff",
            date: new Date(),
            description: "Patient has internal bleeding.",
        })

    } catch (err) {
        console.log(err.message)
    }
}
run()