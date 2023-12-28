const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const Doctor = require('./model/Doctor')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const doc = await Doctor.findOne({ state: "active" })
        const patient = await Patient.findOne({ dateOfBirth: { $gt: new Date("2020-12-12") } })

        if (!patient.tempDoctor) {
            patient.tempDoctor = doc._id
        } else {
            return console.log('Main doctor already exists.')
        }

        if (!doc.patients) {
            doc.patients = [patient._id]
        } else {
            const found = doc.patients.find(one => one._id.valueOf() === patient._id.valueOf())
            if (!found) {
                doc.patients.push(patient._id)
            } else {
                return console.log('The specified patient already exists.')
            }
        }

        patient.save()
        doc.save()
    } catch (err) {
        console.log(err.message)
    }
}
run()