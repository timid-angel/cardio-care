document.addEventListener('DOMContentLoaded', async () => {
    const patientForm = document.getElementById('patientForm');

    patientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(patientForm);

        try {
            const response = await fetch('http://localhost:3000/receptionist/patients', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Patient added successfully');
                // Handle success (redirect, update UI, etc.)
            } else {
                alert('Failed to add patient');
                // Handle failure (display error message, etc.)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle other errors (network issues, etc.)
        }
    });
});
