document.addEventListener('DOMContentLoaded', async () => {
    // get readings
    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1]

    const heartRateField = document.getElementById('heartRateField')
    const bloodSugarField = document.getElementById('bloodSugarField')
    const bodyTemperatureField = document.getElementById('bodyTemperatureField')
    const bloodPressureField = document.getElementById('bloodPressureField')
    const respirationRateField = document.getElementById('respirationRateField')

    const heartRateEl = document.getElementById('heartRateField').parentElement
    const bloodSugarEl = document.getElementById('bloodSugarField').parentElement
    const bodyTemperatureEl = document.getElementById('bodyTemperatureField').parentElement
    const bloodPressureEl = document.getElementById('bloodPressureField').parentElement
    const respirationRateEl = document.getElementById('respirationRateField').parentElement

    const reloadReadings = async () => {
        try {
            const response = await fetch('/doctor/readings/' + id)
            const readingRecord = await response.json()
            console.log(readingRecord)

            // heart rate
            const hrArr = readingRecord.pulseRate
            if (hrArr.length === 0) {
                heartRateField.textContent = "-"
            } else {
                const average = hrArr.reduce((sum, item) => sum + Number(item.value), 0) / hrArr.length
                heartRateField.textContent = Math.round(average)

                if (average >= 100) {
                    heartRateEl.style.borderColor = "crimson"
                } else if (average >= 70) {
                    heartRateEl.style.borderColor = "goldenrod"
                } else {
                    heartRateEl.style.borderColor = "green"
                }
            }

            // blood sugar
            const bsArr = readingRecord.bloodSugar
            if (bsArr.length === 0) {
                bloodSugarField.textContent = "-"
            } else {
                const average = bsArr.reduce((sum, item) => sum + Number(item.value), 0) / bsArr.length
                bloodSugarField.textContent = Math.round(average)

                if (average >= 125) {
                    bloodSugarEl.style.borderColor = "crimson"
                } else if (average >= 100) {
                    bloodSugarEl.style.borderColor = "goldenrod"
                } else {
                    bloodSugarEl.style.borderColor = "green"
                }
            }

            // body temperature
            const btArr = readingRecord.bodyTemperature
            if (btArr.length === 0) {
                bodyTemperatureField.textContent = "-"
            } else {
                const average = btArr.reduce((sum, item) => sum + Number(item.value), 0) / btArr.length
                bodyTemperatureField.textContent = Math.round(average)

                if (average >= 39) {
                    bodyTemperatureEl.style.borderColor = "crimson"
                } else if (average >= 37.8) {
                    bodyTemperatureEl.style.borderColor = "goldenrod"
                } else {
                    bodyTemperatureEl.style.borderColor = "green"
                }
            }

            // blood pressure
            const bpArr = readingRecord.bloodPressure
            if (bpArr.length === 0) {
                bloodPressureField.textContent = "-"
            } else {
                const average = bpArr.reduce((sum, item) => sum + Number(item.value), 0) / bpArr.length
                bloodPressureField.textContent = Math.round(average)

                if (average >= 140) {
                    bloodPressureEl.style.borderColor = "crimson"
                } else if (average >= 120) {
                    bloodPressureEl.style.borderColor = "goldenrod"
                } else {
                    bloodPressureEl.style.borderColor = "green"
                }
            }

            // respiration rate
            const rrArr = readingRecord.respirationRate
            if (rrArr.length === 0) {
                respirationRateField.textContent = "-"
            } else {
                const average = rrArr.reduce((sum, item) => sum + Number(item.value), 0) / rrArr.length
                respirationRateField.textContent = Math.round(average)

                if (average >= 25 || average <= 8) {
                    respirationRateEl.style.borderColor = "crimson"
                } else if (average >= 18 || average <= 12) {
                    respirationRateEl.style.borderColor = "goldenrod"
                } else {
                    respirationRateEl.style.borderColor = "green"
                }
            }

            console.log(readingRecord)
        } catch (err) {
            console.log(err.message)
        }
    }

    reloadReadings()

    // add reading
    const readingForm = document.getElementById('doctor-reading-form')
    readingForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(readingForm);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        const reading = {
            noteType: payload.type,
            value: payload.value,
            date: new Date(payload.date)
        }

        const response = await fetch('/doctor/readings/' + id, {
            method: 'POST',
            body: JSON.stringify(reading),
            headers: { "Content-Type": 'application/json' }
        })
        if (response.ok) {
            readingForm.reset()
            reloadReadings()
            alert('Reading added successfully')
        } else {
            alert('Error while creating note')
        }
    })

})