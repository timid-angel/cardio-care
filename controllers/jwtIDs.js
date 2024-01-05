const jwt = require('jsonwebtoken')

// get patient through the web token
const getPatientJWTID = (token) => {
    let patientId
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded) => {
            patientId = decoded.id
        }
    )
    return patientId
}

// get doctor through the web token
const getDoctorJWTID = (token) => {
    let doctor
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded) => {
            doctor = decoded.id
        }
    )
    return doctor
}

module.exports = { getPatientJWTID, getDoctorJWTID }