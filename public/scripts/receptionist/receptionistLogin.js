document.addEventListener('DOMContentLoaded', () => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('errorDiv');
    const entryField = document.getElementById('entryField');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(loginForm);
        const email = formData.get('email')
        const password = formData.get('password')
        if (!emailRegex.test(email)) {
            errorDiv.classList.remove('hidden');
            errorDiv.classList.add('block');
            errorDiv.textContent = 'Please enter a valid email';
            return
        }
        if (password.length < 6) {
            errorDiv.classList.remove('hidden');
            errorDiv.classList.add('block');
            errorDiv.textContent = 'Password length must be atleast 6 characters';
            return
        }

        const payload = {};
        for (const [key, value] of formData.entries()) {
            payload[key] = value;
        }

        try {
            const response = await fetch('/receptionist/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 404 || response.status === 409) {
                errorDiv.classList.remove('hidden');
                errorDiv.classList.add('block');
                errorDiv.textContent = 'Invalid email or password';
                return
            }

            if (response.status === 403) {
                errorDiv.classList.remove('hidden');
                errorDiv.classList.add('block');
                errorDiv.textContent = 'Your account has been deactivated. Contact your hospital for support';
                return
            }

            if (response.ok) {
                window.location.href = '/receptionist/dashboard';
            } else {
                console.log("unable to login")
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    entryField.addEventListener('click', () => {
        if (errorDiv.classList.contains('block')) {
            errorDiv.classList.remove('block')
            errorDiv.classList.add('hidden')
        }
    })
});





