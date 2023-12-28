const mongoose = require('mongoose')
const Doctor = require('./model/Doctor')
const Calendar = require('./model/Calendar')

mongoose.connect('mongodb://0.0.0.0:27017/cardio-test')

async function run() {
    try {
        const doctor = await Doctor.create({
            name: {
                first: "Triump",
                last: "Under the Sun"
            },
            email: "doctor1@gmail.com"
        })

        if (!doctor.calendar) {
            doctor.calendar = await Calendar.create({
                upcomingAppointments: [],
                oldAppointments: []
            })
        }
        doctor.save()
    } catch (err) {
        console.log(err.message)
    }
}
run()