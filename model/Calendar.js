const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

//calendar
const calendar = mongoose.Schema({
    oldAppointments: [{
        patientId: String,
        date: Date,
        durationMins: Number,
        status: String
    }],
    upcomingAppointments: [{
        patientId: String,
        date: Date,
        durationMins: Number,
        status: String
    }],
})

calendar.methods.addAppointment = function (appointment) {
    let i = this.upcomingAppointments.length - 1;
    if (i === -1) {
        return [appointment]
    }
    while (appointment.date < this.upcomingAppointments[i].date && i > 0) {
        i--;
    }
    this.upcomingAppointments.splice(i, 0, appointment);
    return this.upcomingAppointments
}

calendar.methods.removeAppointment = function (id) {
    const retArr = this.upcomingAppointments.filter((item) => {
        return item._id.valueOf() !== new ObjectId(id).valueOf();
    })
    return retArr
}

calendar.methods.findUnresolved = function () {
    const arr = []
    for (let i = 0; i < this.upcomingAppointments.length; i++) {
        if (this.upcomingAppointments[i].status === "unresolved") {
            arr.push(this.upcomingAppointments[i])
        }
    }
    return arr
}

calendar.methods.findAppointment = function (id) {
    for (let i = 0; i < this.upcomingAppointments.length; i++) {
        if (this.upcomingAppointments[i]._id.valueOf() === new ObjectId(id).valueOf()) {
            return this.upcomingAppointments[i]
        }
    }
}

module.exports = mongoose.model('Calendar', calendar)