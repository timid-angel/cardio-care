const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const MedicalRecord = require('./model/MedicalRecord')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const patient = await Patient.findOne({ email: "medicalRecord@gmail.com" })
        const medicalRec = await MedicalRecord.findOne({ _id: patient.medicalRecord })

        const temp = medicalRec.addMedication('vaccination', {
            inn: "Cyanide",
            medType: "vaccine",
            dosage: "20ml",
            startDate: new Date('2023-11-5'),
            endDate: new Date('2023-12-5'),
            currentlyTaking: this.endDate > new Date() ? true : false
        })

    } catch (err) {
        console.log(err.message)
    }
}
run()