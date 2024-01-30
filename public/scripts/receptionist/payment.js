document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('paymentForm');


    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/patient/payment', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Payment proof sent successfully');

            } else {
                alert('Failed to send payment try again!');

            }
        } catch (error) {
            console.error('Error:', error);

        }
    });
});
