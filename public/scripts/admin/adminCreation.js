// scripts/adminCreation.js

document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminForm');

    adminForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(adminForm);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log(data);
            alert('Admin Creation Successful');
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    });
});
