document.addEventListener('DOMContentLoaded', () => {
    const appointmentContainer = document.getElementById('appointmentContainer')
    const form = document.getElementById('patient-appointment-form')

    const reloadAppointments = async () => {
        const response = await fetch('/patient/rel-appointments')
        const appointments = await response.json()
        let str = ""
        appointments.forEach(appointment => {
            str += `<div class="py-4 flex bg-neutral-50 rounded-md" data-id=${appointment._id.toString()}><div class="w-1/6"><p>${appointment.status}</p></div><div class="w-3/12"><p>${new Date(appointment.date).toLocaleDateString()}</p></div><div class="w-1/6"><p>${appointment.durationMins} Minutes</p></div><div class="w-4/12"><p>Dr. ${appointment.doctorName}</p></div><div class="w-1/12"><button class="text-white font-semibold bg-red-700 hover:bg-red-800 rounded-lg px-2 py-1 text-center mx-auto">Delete</button></div></div>`
        })

        appointmentContainer.innerHTML = str || appointmentContainer.innerHTML


        appointmentContainer.childNodes.forEach(appointment => {
            const deleteBtn = appointment.lastChild

            deleteBtn.addEventListener('click', async () => {
                const id = appointment.dataset.id

                try {
                    await fetch('/patient/appointments/' + id, {
                        method: 'DELETE'
                    })
                    if (appointmentContainer.childNodes.length === 1) {
                        window.location.reload()
                    }
                    reloadAppointments()

                } catch (err) {
                    console.log(err)
                }
            })
        })

    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(form);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }
        console.log(payload)
        if (!payload.date) {
            alert('Please enter a date')
            return
        }
        if (new Date(payload.date) < new Date()) {
            alert('Please enter a valid date for your appointment.')
            return
        }
        if (!payload.startTime) {
            alert('Please enter a starting time')
            return
        }
        if (!payload.endTime) {
            alert('Please enter an ending time')
            return
        }

        const arr1 = payload.startTime.split(':')
        const startMins = Number(arr1[0]) * 60 + Number(arr1[1])
        const arr2 = payload.endTime.split(':')
        const endMins = Number(arr2[0]) * 60 + Number(arr2[1])

        if (endMins - startMins < 0) {
            alert('Please enter a proper start and end times')
            return
        }
        if (endMins - startMins > 120) {
            alert('Appointments can not be longer than 2 hours')
            return
        }

        const appointment = {
            date: payload.date,
            durationMins: endMins - startMins
        }

        try {
            const response = await fetch('/patient/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });

            if (response.ok) {
                window.location.reload()
            } else {
                console.log("Server Error")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    })

    reloadAppointments()
})