document.addEventListener('DOMContentLoaded', async () => {
    const patientForm = document.getElementById('patientForm');
    
    patientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(patientForm);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('http://localhost:3000/receptionist/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Patient added successfully');
                // Fetch and render the updated list of patients after successful addition
                fetchAndRenderPatients(); // Call the function to update the dashboard
            } else {
                alert('Failed to add patient');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
