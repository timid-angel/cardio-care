// creates new patient
const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const MedicalRecord = require('./model/MedicalRecord')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {

        const medicalRec = await MedicalRecord.create({})

        const patient = await Patient.create({
            name: {
                first: "Medical",
                last: 'Record'
            },
            email: "medicalRecord@gmail.com",
            phoneNumber: "56396523",
            dateOfBirth: new Date("2003-12-21"),
            authorized: true,
            medicalRecord: medicalRec
        })

        console.log(patient)
    } catch (err) {
        console.log(err.message)
    }
}
run()