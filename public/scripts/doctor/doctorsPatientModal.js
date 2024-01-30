const doctorOrder = document.getElementById('doctor-order-modal')
const doctorNote = document.getElementById('doctor-notes-modal')
const doctorOrderBg = document.getElementById('doctor-order-background')
const doctorNoteBg = document.getElementById('doctor-notes-background')
const doctorOrderBtn = document.getElementById('doctor-order-modal-button')
const doctorNoteBtn = document.getElementById('doctor-notes-modal-button')


doctorOrderBtn.addEventListener('click', () => {
    doctorOrder.classList.remove('hidden')
})

doctorNoteBtn.addEventListener('click', () => {
    doctorNote.classList.remove('hidden')
})

doctorOrderBg.addEventListener('click', (event) => {
    event.stopPropagation()
    doctorOrder.classList.add('hidden')
})

doctorNoteBg.addEventListener('click', (event) => {
    event.stopPropagation()
    doctorNote.classList.add('hidden')
})