// scripts/adminLogin.js

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
            const response = await fetch('http://127.0.0.1:3000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Login Successful');
                window.location.href = 'adminDashboard.html';
            } else {
                // Handle login failure (incorrect credentials, server error, etc.)
                console.log("Unable to log you in");
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (network issue, server down, etc.)
        }
    });
});



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






// scripts/adminLogin.js

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
            const response = await fetch('http://127.0.0.1:3000/receptionist/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Login Successful');
                window.location.href = 'receptionDashboard.html';
            } else {
                console.log("unable to login")
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (network issue, server down, etc.)
        }
    });
});




// scripts/adminLogin.js

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
            const response = await fetch('http://127.0.0.1:3000/patient/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert('Login Successful');
                window.location.href = 'patientDashboard.html';
            } else if (response.status === 403) {
                alert('Your account has been deactivated. Please contact your hospital for support.');
            } else {
                console.log("Unable to login");
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (network issue, server down, etc.)
        }
    });
});
