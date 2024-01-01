const mongoose = require('mongoose')

const payment = mongoose.Schema({
    patient: String,
    checked: {
        type: Boolean,
        default: false
    },
    accepted: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        unique: true,
        required: true
    }
})

module.exports = mongoose.model("Payment", payment)