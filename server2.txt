const mongoose = require('mongoose')
const Patient = require('./model/Patient')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const patient = await Patient.findOne({ email: "medicalRecord@gmail.com" })

        patient.addSymptom({
            noteType: "bodyTemperature",
            date: new Date(),
            description: "Body temperature rose to 40 degrees Celsius and I collapsed.",
            trigger: "Touching grass",
            startTime: new Date("2023-12-28"),
            endTime: new Date("2023-12-29")
        })

    } catch (err) {
        console.log(err.message)
    }
}
run()