document.addEventListener('DOMContentLoaded', async () => {
    // get readings
    const orderContainer = document.getElementById('readingsContainer')
    const units = {
        "pulseRate": "bpm",
        "bodyTemperature": "°C",
        "bloodPressure": "mmHg Sys.",
        "bloodSugar": "mg/dL",
        "respirationRate": "breaths/min"
    }
    const formatting = {
        "pulseRate": "Heart Rate",
        "bodyTemperature": "Body Temperature",
        "bloodPressure": "Blood Pressure",
        "bloodSugar": "Blood Sugar",
        "respirationRate": "Respiration Rate"
    }
    const reloadReadings = async () => {
        let str = ""
        try {
            const response = await fetch('/patient/readings/')
            const readings = await response.json()
            for (let i = readings.length - 1; i >= 0; i--) {
                const reading = readings[i]
                str += `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900"><div class="flex gap-4 overflow-hidden w-full"><p class=" flex items-center justify-center">${formatting[reading.noteType]}: ${reading.value} ${units[reading.noteType]} at ${new Date(reading.date).toLocaleDateString()}</p></div></div></div>`
            }

            orderContainer.innerHTML = str || orderContainer.innerHTML
        } catch (err) {
            console.log(err)
        }
    }

    reloadReadings()

    // add reading
    const readingForm = document.getElementById('patient-reading-form')
    readingForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(readingForm);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        if (!Number.isInteger(Number(payload.value)) || payload.value.length == 0) {
            alert('Please enter an integer value.')
            return
        }

        const reading = {
            noteType: payload.type,
            value: payload.value,
            date: new Date(payload.date)
        }

        const response = await fetch('/patient/readings/', {
            method: 'POST',
            body: JSON.stringify(reading),
            headers: { "Content-Type": 'application/json' }
        })

        if (response.ok) {
            readingForm.reset()
            reloadReadings()
            alert('Reading added successfully')
        } else {
            alert('Error while creating record')
        }
    })
})