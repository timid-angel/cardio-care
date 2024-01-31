document.addEventListener('DOMContentLoaded', () => {
    const exportDataSection = document.getElementById('export-data');
    const exportButton = exportDataSection.querySelector('.button button');
    const paymentForm = document.getElementById('paymentForm');
    const paymentDetailsList = document.getElementById('paymentDetails');
    const myCheckbox = document.getElementById('myCheckbox');

    exportButton.addEventListener('click', async () => {
        try {
            // const selectedFile = document.getElementById('myDropdown1').value;
            // const selectedFormat = document.getElementById('myDropdown2').value;
            // const selectedDestination = document.getElementById('myDropdown3').value;

            const response = await fetch('patient/export-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //     file: selectedFile,
                //     format: selectedFormat,
                //     destination: selectedDestination,
                // }),
            });

            if (response.ok) {
                console.log('Export successful');
            } else {
                console.error('Export failed');
            }
        } catch (err) {
            console.error(err);
        }
    });
    paymentForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!myCheckbox.checked) {
            alert('Please agree to the terms and conditions.');
            return;
        }

        try {
            const formData = new FormData(paymentForm);
            const response = await fetch('/payment/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const paymentDetails = await response.json();
                paymentDetailsList.innerHTML = '';

                for (const [key, value] of Object.entries(paymentDetails)) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${key}: ${value}`;
                    paymentDetailsList.appendChild(listItem);
                }
            } else {
                console.error('Payment submission failed');
            }
        } catch (err) {
            console.error(err);
        }
    });
});
