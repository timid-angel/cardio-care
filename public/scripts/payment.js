document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('paymentForm');

    
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const formData = new FormData(form);
      
        try {
            const response = await fetch('http://localhost:3000/patient/payment', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                alert('Payment proof sent successfully');
                // Handle success (redirect, update UI, etc.)
            } else {
                alert('Failed to send payment try again!');
                // Handle failure (display error message, etc.)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle other errors (network issues, etc.)
        }
    });
});
