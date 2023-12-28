const mongoose = require('mongoose')
const Patient = require('./model/Patient')
const { ObjectId } = require('mongodb')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')


async function run(changedProperties) {
    const res = await Patient.updateOne({ _id: new ObjectId('658d259721e48d6c171a1f40') }, changedProperties)
    console.log(res)
}

run({ authorized: true })