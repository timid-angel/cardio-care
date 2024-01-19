document.addEventListener('DOMContentLoaded', async () => {
    const paymentDetails = document.getElementById('paymentDetails');

    const fetchPayments = async () => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/payment');
            if (response.ok) {
                const payments = await response.json();
                renderPayments(payments.payments);
            } else {
                console.error('Failed to fetch payments');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/patients');
            if (response.ok) {
                const data = await response.json();
                renderPatients(data.patients);
            } else {
                console.error('Failed to fetch patients');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderPayments = (payments) => {
        const orderedList = document.createElement('ol');
        orderedList.classList.add('payment-list');

        payments.forEach((payment) => {
            const listItem = document.createElement('li');
            listItem.classList.add('payment-item');

            const emailElement = document.createElement('span');
            emailElement.textContent = `Patient Email: ${payment.patient}`;
            emailElement.style.fontWeight = 'bold';
            emailElement.style.paddingTop = '40px';
            emailElement.style.padding = '20px';
            emailElement.style.display = 'block';

        
            const imageElement = document.createElement('img');
            imageElement.src = `/cardio-care/images/payments/${payment.img}`;
            imageElement.alt = 'No Receipt';
            imageElement.classList.add('payment-image');
            imageElement.style.padding = '30px';
            imageElement.style.padding = '10px';

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            buttonContainer.style.marginBottom='50px';

            const verifyButton = document.createElement('button');
            verifyButton.textContent = 'Verify';
            verifyButton.classList.add('verify-btn');
            verifyButton.classList.add('button');
            verifyButton.style.backgroundColor = 'green';
            verifyButton.style.color = 'white';
            verifyButton.style.borderRadius = '5px';
            verifyButton.style.marginRight = '10px';
            verifyButton.style.marginLeft = '10px';
            verifyButton.style.padding = '5px';
            verifyButton.style.fontWeight = 'bold';
            verifyButton.style.width = '150px';

            const deactivateButton = document.createElement('button');
            deactivateButton.textContent = 'Deactivate';
            deactivateButton.classList.add('button');
            deactivateButton.style.backgroundColor = 'red';
            deactivateButton.style.color = 'white';
            deactivateButton.style.borderRadius = '5px';
            deactivateButton.style.padding = '5px';
            deactivateButton.style.fontWeight = 'bold';
            deactivateButton.style.width = '150px';

            verifyButton.addEventListener('click', async () => {
                const confirmMessage = confirm('Are you sure you want to verify this payment?');
                if (confirmMessage) {
               
                    const paymentItem = deactivateButton.parentElement.parentElement;
                    verifyButton.style.display = 'none';
                    imageElement.style.display = 'none';
                    deactivateButton.style.display = 'none';
                    paymentItem.style.display = 'none';

                   
                }
            });




            // Append elements to DOM
            buttonContainer.appendChild(verifyButton);
            buttonContainer.appendChild(deactivateButton);
            listItem.appendChild(emailElement);
            listItem.appendChild(imageElement);
            listItem.appendChild(buttonContainer);
            orderedList.appendChild(listItem);
        });

        paymentDetails.appendChild(orderedList);
    };

    
    
   
    fetchPayments();

});
