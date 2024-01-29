document.addEventListener('DOMContentLoaded', async () => {
    const doctorForm = document.getElementById('doctorForm');

    doctorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(doctorForm);

        try {
            const response = await fetch('http://localhost:3000/admin/doctor', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Doctor added successfully');
                // Handle success (redirect, update UI, etc.)
            } else {
                alert('Failed to add Doctor');
                // Handle failure (display error message, etc.)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle other errors (network issues, etc.)
        }
    });
});
