document.addEventListener('DOMContentLoaded', async () => {
    // get notes
    const noteContainer = document.getElementById('noteContainer')
    const arr = window.location.href.split('/')
    const id = arr[arr.length - 1]

    const reloadNotes = async () => {
        let str = ""
        try {
            const response = await fetch('/doctor/notes/' + id)
            const notes = await response.json()
            for (let i = 0; i < notes.length; i++) {
                const note = notes[i]
                str += `<div class="h-min min-h-12 py-1 w-full flex justify-between items-center text-xl text-slate-700 px-4 border-t border-red-900" data-id="${note._id.toString()}"><div class="flex gap-4 items-center w-full overflow-hidden"><p>${note.description}</p></div><div class="flex gap-3 justify-end w-20"><div class=""><img src="/image/delete.svg" alt="" class="w-7"></div></div></div>`
            }
            noteContainer.innerHTML = str || noteContainer.innerHTML

        } catch (err) {
            noteContainer.innerHTML = ""
        }
    }
    await reloadNotes()


    // add note
    const noteForm = document.getElementById('doctor-note-form')
    noteForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const formData = new FormData(noteForm);
        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        if (payload.description.length <= 10) {
            alert('Descriptions must be atleast 10 characters long.')
            return
        }

        const note = {
            noteType: payload.type,
            description: payload.description
        }
        const response = await fetch('/doctor/notes/' + id, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: { "Content-Type": 'application/json' }
        })

        if (response.ok) {
            noteForm.reset()
            location.reload()
        } else {
            alert('Error while creating note')
        }
    })

    // delete note
    noteContainer.childNodes.forEach(noteEl => {
        const deleteBtn = noteEl.lastChild.lastChild
        deleteBtn.addEventListener('click', async () => {
            const noteId = noteEl.dataset.id
            const response = await fetch('/doctor/notes/' + noteId, {
                method: 'DELETE'
            })
            window.location.reload()
        })
    })
})