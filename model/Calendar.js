const mongoose = require('mongoose')

//calendar
const calendar = mongoose.Schema({
    oldAppointments: [{
        date: Date,
        durationMins: Number,
        status: String
    }],
    upcomingAppointments: [{
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

calendar.methods.removeAppointment = function (appointment) {
    const retArr = this.upcomingAppointments.filter((item) => {
        return !(item.date.getTime() === appointment.date.getTime() && item.durationMins === appointment.durationMins);
    })
    return retArr
}

calendar.methods.changeStatus = function (appointment, status) {
    let idx
    const appo = this.upcomingAppointments.find((item, index) => {
        idx = index
        return item.date.getTime() === appointment.date.getTime() && item.durationMins === appointment.durationMins
    })

    if (!appo) {
        console.log('change stauts error: appointment not found')
        return
    }
    this.upcomingAppointments.splice(idx, 1)
    appo.status = status

    if (status === "completed" || status === "past") {
        this.oldAppointments.push(appo)
    }

    return { upcomingAppointments: this.upcomingAppointments, oldAppointments: this.oldAppointments, status: status }
}

const Calendar = mongoose.model('Calendar', calendar)
module.exports = Calendar