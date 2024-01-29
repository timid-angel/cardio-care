const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    gender: String,
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
    address: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    },
    state: {
        type: String,
        default: "active"
    }
})

module.exports = mongoose.model('Receptionist', schema)