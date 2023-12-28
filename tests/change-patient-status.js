const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const { ObjectId } = require('mongodb')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')


async function run() {
    const patient = await Patient.findOne({
        _id: new ObjectId('658d259721e48d6c171a1f40')
    })

    patient.changeAuthorization("NAH FAMILY")
}

run()