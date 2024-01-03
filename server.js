const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors= require('cors')
const cookieParser = require('cookie-parser')
const ejs = require('ejs')
require('dotenv').config()
const PORT = process.env.PORT || 3000

// routers
const receptionistRouter = require('./routers/receptionist')
const adminRouter = require('./routers/admin')
const patientRouter = require('./routers/patient')
const doctorRouter = require('./routers/doctor')

// db connection and server startup
mongoose.connect('mongodb+srv://lidiyamkt:111@cluster0.y4kxaub.mongodb.net/cardio-test')
    .then(() => {
        app.listen(PORT)
        console.log('Server listening on port', PORT)
    })

// middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.set('view engine', "ejs")


// routes
app.use('/receptionist', receptionistRouter)
app.use('/admin', adminRouter)
app.use('/patient', patientRouter)
app.use('/doctor', doctorRouter)