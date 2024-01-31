const doctorNote = document.getElementById('patient-appointment-modal')
const doctorNoteBg = document.getElementById('patient-appointment-background')
const doctorNoteBtn = document.getElementById('patient-appointment-modal-button')

doctorNoteBtn.addEventListener('click', () => {
    doctorNote.classList.remove('hidden')
})

doctorNoteBg.addEventListener('click', (event) => {
    event.stopPropagation()
    doctorNote.classList.add('hidden')
})