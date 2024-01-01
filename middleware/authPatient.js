const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuthentication = (req, res, next) => {
    if (!req.cookies?.jwt) {
        res.redirect('/patient/login')
        return
    }
    const token = req.cookies.jwt
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_KEY,
        (err, decoded) => {
            if (decoded.role == 3) {
                next()
                return
            }
            res.redirect('/patient/login')
        }
    )
}

module.exports = requireAuthentication