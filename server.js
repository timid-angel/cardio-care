const mongoose = require('mongoose')
const Patient = require('./model/Patient')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const patient = await Patient.create({
            name: {
                first: "bel",
                last: 'air'
            },
            email: "adsfsadfa",
            phoneNumber: "56396523",
            dateOfBirth: Date.now(),
            authorized: "YES"
        })
        console.log(patient)
    } catch (err) {
        console.log(err.message)
    }
}

run()