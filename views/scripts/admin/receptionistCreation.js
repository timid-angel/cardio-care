document.addEventListener('DOMContentLoaded', () => {
    const receptionistForm = document.getElementById('receptionistForm');

    receptionistForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(receptionistForm);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('http://127.0.0.1:3000/admin/receptionist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Handle successful creation
                alert('Receptionist created successfully!');
            } else {
                // Handle creation failure
                alert('Receptionist creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (network issue, server down, etc.)
        }
    });
});
