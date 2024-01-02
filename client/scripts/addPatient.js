document.addEventListener('DOMContentLoaded', () => {
    const addPatientModal = document.getElementById('addPatientModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const patientForm = document.getElementById('patientForm');

    // Function to open modal
    const openModal = () => {
        addPatientModal.classList.remove('hidden');
    };

    // Function to close modal
    const closeModal = () => {
        addPatientModal.classList.add('hidden');
    };

    // Event listener to open modal on button click
    openModalBtn.addEventListener('click', openModal);

    // Event listener to close modal on button click
    closeModalBtn.addEventListener('click', closeModal);

    // Event listener to close modal if clicked outside the modal content
    addPatientModal.addEventListener('click', (event) => {
        if (event.target === addPatientModal) {
            closeModal();
        }
    });

    // Event listener for form submission
    patientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Gather form data and perform submission logic
        // Example: Use fetch to send the form data to your backend API
        const formData = new FormData(patientForm);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('http://127.0.0.1:3000/patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle successful patient addition
                console.log('Patient added successfully');
                // You might want to close the modal or perform other actions here
            } else {
                console.error('Failed to add patient');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
