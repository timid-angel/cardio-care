const mongoose = require('mongoose')
const Patient = require('./model/Patient')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const patient = await Patient.findOne({ email: "medicalRecord@gmail.com" })

        patient.addDailyReading({
            noteType: "bodyTemperature",
            date: new Date(),
            description: "As per the daily requirements",
            value: "100"
        })

    } catch (err) {
        console.log(err.message)
    }
}
run()