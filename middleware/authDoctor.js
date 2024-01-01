const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuthentication = (req, res, next) => {
    if (!req.cookies?.jwt) {
        res.redirect('/doctor/login')
        return
    }
    const token = req.cookies.jwt
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded) => {
            if (decoded.role == 2) {
                next()
                return
            }
            res.redirect('/doctor/login')
        }
    )
}

module.exports = requireAuthentication