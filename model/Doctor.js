const mongoose = require('mongoose')
const Calendar = require('./Calendar')

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
        type: String
    },
    cellPhoneNumber: {
        type: String,
        required: true
    },
    adddress: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    },
    state: {
        type: String,
        default: true
    },
    expertise: [String],
    notes: [],
    calendar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Calendar",
        required: true
    },
    patients: [String]

})

schema.methods.setStatus = function (str) {
    this.state = str.trim()
}

module.exports = mongoose.model('Doctor', schema)