document.addEventListener('DOMContentLoaded', async () => {
    try {
        const postPaymentForm = document.getElementById('paymentForm')

        postPaymentForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const myCheckbox = document.getElementById('myCheckbox');
            if (!myCheckbox.checked) {
                alert('Please agree to the terms and conditions.');
                return;
            }

            const formInput = new FormData(postPaymentForm)
            const response = await fetch('/patient/payment/', {
                method: 'POST',
                body: formInput,
            });

            if (response.ok) {
                postPaymentForm.reset()
                alert('Payment receipt uploaded successfully');
            } else {
                const resp = await response.json()
                console.log(resp)
                alert('Failed to upload payment receipt');
            }
        })

    } catch (error) {
        console.error('An error occurred:', error);
    }
});
