

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const payload = {};

        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('http://127.0.0.1:3000/doctor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Login Successful');
                window.location.href = 'doctorDashboard.html';
            } else {
                console.log("unable to login")
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (network issue, server down, etc.)
        }
    });
});
