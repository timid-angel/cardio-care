const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')
const Doctor = require('./model/Doctor')
const Calendar = require('./model/Calendar')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {

        const doc = await Doctor.findOne({ _id: new ObjectId("658d37e24dd14cfe7ed07df9") })
        const calendar = await Calendar.findOne({ _id: doc.calendar })
        const newCalendar = calendar.addAppointment({ date: new Date("2021-10-31"), durationMins: 120, status: 'incomplete' })
        calendar.upcomingAppointments = newCalendar
        calendar.save()


    } catch (err) {
        console.log(err.message)
    }
}
run()