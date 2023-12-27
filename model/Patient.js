const mongoose = require('mongoose')
const Doctor = require('./Doctor')

const schema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        middle: String,
        last: {
            type: String,
            required: true
        }
    },
    gender: String,
    uuid: String,
    passkey: String,
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    adddress: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    authorized: {
        type: String,
        default: true
    },
    lastPaymentDate: Date,
    cuurentAppointment: Date,
    pastAppointments: [Date],
    medicalRecord: [],
    dailyReading: [],
    symptomLog: [],
    orderLog: [],
    mainDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
        // required: true
    },
    tempDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
})

module.exports = mongoose.model("Patient", schema)