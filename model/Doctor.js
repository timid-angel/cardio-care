const mongoose = require('mongoose')
const Calendar = require('./Calendar')
const { doctorNote } = require('./Logs')

const schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    gender: String,
    uuid: String,
    passkey: String,
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    cellPhoneNumber: {
        type: String
    },
    adddress: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    },
    state: {
        type: String,
        default: "active"
    },
    expertise: [String],
    notes: [doctorNote],
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calendar"
    },
    patients: [] // patients

})

schema.methods.setStatus = function (str) {
    this.state = str.trim()
}

schema.methods.addNote = function (note) {
    this.notes.push(note)
    this.save()
}

module.exports = mongoose.model('Doctor', schema)