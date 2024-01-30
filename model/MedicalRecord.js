const mongoose = require('mongoose')

const vitalReading = {
    value: String,
    date: Date
}

const Medication = {
    inn: String,
    medType: String,
    dosage: String,
    startDate: Date,
    endDate: Date,
    currentlyTaking: Boolean
}

const medicalRecordSchema = mongoose.Schema({
    creationDate: Date,
    bloodPressure: [vitalReading],
    bloodSugar: [vitalReading],
    bodyTemperature: [vitalReading],
    pulseRate: [vitalReading],
    respirationRate: [vitalReading],
    allergies: [String],
    lifestyleFactors: [String],
    pastIllnersses: [String],
    geneticVulnerabilities: [String],
    currentMedication: [Medication],
    medicationHistory: [Medication],
    vaccination: [Medication]
})

medicalRecordSchema.methods.addVitalReadings = function (type, vitalReading) {
    this[type].push(vitalReading)
    this.save()
}

medicalRecordSchema.methods.addExtraInfo = function (type, info) {
    this[type].push(info)
    this.save()
}

medicalRecordSchema.methods.addMedication = function (type, medication) {
    this[type].push(medication)
    this.save()
}

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema)