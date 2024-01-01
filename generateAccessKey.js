const crypto = require('crypto')
const key = crypto.randomBytes(64).toString('hex')
const fs = require('fs')
const path = require('path')
const str = 'ACCESS_TOKEN_KEY=' + key

fs.writeFile(
    path.join(__dirname, ".env"),
    str,
    (err) => {
        if (err) {
            console.log(err.message)
        } else {
            console.log('Finished setting up environment variables')
        }
    }
)