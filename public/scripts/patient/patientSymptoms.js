document.addEventListener('DOMContentLoaded', async () => {
    // get symptoms
    const symptomContainer = document.getElementById('symptomContainer')
    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1]

    const reloadSymptoms = async () => {
        let str = ""
        try {
            const response = await fetch('/patient/symptoms')
            const symptoms = await response.json()
            for (let i = 0; i < symptoms.length; i++) {
                const symptom = symptoms[i]
                str += `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900" data-id="${symptom._id.toString()}"><div class="flex gap-4 items-center w-full overflow-hidden"><p>${symptom.description}</p></div><div class="flex gap-3 justify-end w-20"><div class=""><img src="/image/delete.svg" alt="" class="w-7"></div></div></div>`
            }
            symptomContainer.innerHTML = str || `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900"><div class="flex gap-4 overflow-hidden w-full"><p class=" flex items-center justify-center">You don't have any logged symptoms.</p></div></div>`

        } catch (err) {
            console.log(err)
        }
    }
    await reloadSymptoms()

    // add note
    const symptomForm = document.getElementById('doctor-symptom-form')
    symptomForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(symptomForm);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }
        const symptom = {
            description: payload.description,
            startTime: new Date(payload.startTime),
            endTime: new Date(payload.endTime),
            trigger: payload.trigger
        }
        const response = await fetch('/patient/symptoms/', {
            method: 'POST',
            body: JSON.stringify(symptom),
            headers: { "Content-Type": 'application/json' }
        })

        if (response.ok) {
            location.reload()
        } else {
            alert('Error while creating note')
        }
    })

    // delete symptom
    symptomContainer.childNodes.forEach(symptomEl => {
        const deleteBtn = symptomEl.lastChild.lastChild
        deleteBtn.addEventListener('click', async () => {
            const symtpomId = symptomEl.dataset.id
            const response = await fetch('/patient/symptoms/' + symtpomId, {
                method: 'DELETE'
            })
            reloadSymptoms()
        })
    })
})