const doctorNote = document.getElementById('doctor-symptom-modal')
const doctorNoteBg = document.getElementById('doctor-symptom-background')
const doctorNoteBtn = document.getElementById('doctor-symptom-modal-button')

doctorNoteBtn.addEventListener('click', () => {
    doctorNote.classList.remove('hidden')
})

doctorNoteBg.addEventListener('click', (event) => {
    event.stopPropagation()
    doctorNote.classList.add('hidden')
})