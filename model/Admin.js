const mongoose = require('mongoose')

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
    adddress: {
        city: String,
        subCity: String,
        woreda: Number,
        houseNumber: Number
    }
})

module.exports = mongoose.model('Admin', schema)