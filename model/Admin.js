const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
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
    }
})

module.exports = mongoose.model('Admin', schema)