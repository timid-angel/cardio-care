const doctorDashboard = (req, res) => {
    res.render('./doctorViews/doctor-dashboard')
}

const patientDashboard = (req, res) => {
    res.render('./patientViews/patient-dashboard')
}

module.exports = { patientDashboard, doctorDashboard }