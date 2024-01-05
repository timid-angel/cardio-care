const path = require('path')
const fs = require('fs')

function createImageFolders() {
    if (!fs.existsSync(path.join(__dirname, "..", "images"))) fs.mkdir(path.join(__dirname, "..", "images"), (err) => {
        if (err) {
            return console.log(err.message)
        }
    })
    if (!fs.existsSync(path.join(__dirname, "..", "images", "doctors"))) fs.mkdir(path.join(__dirname, "..", "images", "doctors"), (err) => {
        if (err) {
            return console.log(err.message)
        }
    })
    if (!fs.existsSync(path.join(__dirname, "..", "images", "patients"))) fs.mkdir(path.join(__dirname, "..", "images", "patients"), (err) => {
        if (err) {
            return console.log(err.message)
        }
    })
    if (!fs.existsSync(path.join(__dirname, "..", "images", "payments"))) fs.mkdir(path.join(__dirname, "..", "images", "payments"), (err) => {
        if (err) {
            return console.log(err.message)
        }
    })

    console.log('Finished creating image directories')
}

module.exports = createImageFolders