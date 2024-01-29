const mongoose = require('mongoose')
const Doctor = require('./Doctor')
const MedicalRecord = require('./MedicalRecord')
const { dailyReadingLog, symptomsLog, doctorOrder } = require('./Logs')

const schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    gender: String,
    img: {
        type: String
    },
    password: String,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    phoneNumber: {
        type: String
    },
    adddress: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    },
    dateOfBirth: Date,
    authorized: {
        type: Boolean,
        default: true
    },
    
    linkState: {
        type: String,
        enum: ['inactive', 'active'],
        default: 'inactive' // Default value for 'linkState'
    },

    lastPaymentDate: Date,
    currentAppointment: Date,
    medicalRecord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MedicalRecord"
    },
    dailyReading: [dailyReadingLog],
    symptomLog: [symptomsLog],
    orderLog: [doctorOrder],
    mainDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    tempDoctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
})

schema.methods.changeAuthorization = function (bool) {
    this.authorized = bool
    this.save()
}

schema.methods.addDailyReading = function (dailyReading) {
    this.dailyReading.push(dailyReading)
    this.save()
}

schema.methods.addSymptom = function (symptom) {
    this.symptomLog.push(symptom)
    this.save()
}

schema.methods.addOrder = function (order) {
    this.orderLog.push(order)
    this.save()
}

module.exports = mongoose.model("Patient", schema)