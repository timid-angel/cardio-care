const doctorNote = {
    noteType: String,
    patient: String,
    date: Date,
    description: String
}

const dailyReadingLog = {
    noteType: String,
    date: Date,
    description: String,
    value: Number
}

const symptomsLog = {
    noteType: String,
    description: String,
    trigger: String,
    startTime: Date,
    endTime: Date
}

const doctorOrder = {
    noteType: String,
    date: Date,
    description: String,
    doctor: String,
    startTime: Date,
    endTime: Date
}

module.exports = { doctorNote, dailyReadingLog, symptomsLog, doctorOrder }