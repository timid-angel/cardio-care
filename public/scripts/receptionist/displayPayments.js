document.addEventListener('DOMContentLoaded', async () => {
    const paymentDetails = document.getElementById('paymentDetails');

    const fetchPayments = async () => {
        try {
            const response = await fetch('/receptionist/payment');
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

    const verifyPayment = async (patientEmail, isAccepted) => {
        try {
            const response = await fetch(`/receptionist/verify-payment/${patientEmail}`, {
                method: 'PUT',
                body: JSON.stringify({ isAccepted }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert(`Payment ${isAccepted ? 'verified' : 'declined'} successfully`);
                fetchPayments();
            } else {
                const data = await response.json();
                if (response.status === 404) {
                    alert(`Error ${isAccepted ? 'verifying' : 'declining'} Payment: Payment not found`);
                } else {
                    alert(`Error ${isAccepted ? 'verifying' : 'declining'} Payment: ${data.error}`);
                }
            }
        } catch (error) {
            console.error(`Error ${isAccepted ? 'verifying' : 'declining'} payment:`, error);
            alert(`Error ${isAccepted ? 'verifying' : 'declining'} Payment: Something went wrong`);
        }
    };


    const declinePayment = async (patientEmail, isAccepted = false) => {
        try {
            const response = await fetch(`/receptionist/decline-payment/${patientEmail}`, {
                method: 'PUT',
                body: JSON.stringify({ isAccepted }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert(`Payment ${isAccepted ? 'accepted' : 'declined'} successfully`);
                fetchPayments();
            } else {
                const data = await response.json();
                if (response.status === 404) {
                    alert(`Error ${isAccepted ? 'accepting' : 'declining'} Payment: Payment not found`);
                } else {
                    alert(`Error ${isAccepted ? 'accepting' : 'declining'} Payment: ${data.error}`);
                }
            }
        } catch (error) {
            console.error(`Error ${isAccepted ? 'accepting' : 'declining'} payment:`, error);
            alert(`Error ${isAccepted ? 'accepting' : 'declining'} Payment: Something went wrong`);
        }
    };

    const renderPayments = (payments) => {
        const orderedList = document.createElement('ol');
        orderedList.classList.add('payment-list');

        payments.forEach((payment) => {
            // Skip rendering if the payment has been accepted
            if (payment.accepted === true) {
                return;
            }

            const listItem = document.createElement('li');
            listItem.classList.add('payment-item');

            const emailElement = document.createElement('span');
            emailElement.textContent = `Patient Email: ${payment.patient}`;
            emailElement.style.fontWeight = 'bold';
            emailElement.style.paddingTop = '40px';
            emailElement.style.padding = '5px';
            emailElement.style.display = 'block';

            const checkStatus = document.createElement('span');
            checkStatus.textContent = `Payment checked: ${payment.checked}`;
            checkStatus.style.fontWeight = 'bold';
            checkStatus.style.paddingTop = '40px';
            checkStatus.style.padding = '5px';
            checkStatus.style.display = 'block';

            const acceptStatus = document.createElement('span');
            acceptStatus.textContent = `Payment Accepted: ${payment.accepted}`;
            acceptStatus.style.fontWeight = 'bold';
            acceptStatus.style.paddingTop = '40px';
            acceptStatus.style.padding = '5px';
            acceptStatus.style.display = 'block';

            const imageElement = document.createElement('img');
            imageElement.src = `/cardio-care/images/payments/${payment.img}`;
            imageElement.alt = 'No Receipt';
            imageElement.classList.add('payment-image');
            imageElement.style.padding = '30px';
            imageElement.style.padding = '10px';

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            buttonContainer.style.marginBottom = '50px';

            const verifyButton = document.createElement('button');
            verifyButton.textContent = 'Verify';
            verifyButton.classList.add('verify-btn');
            verifyButton.classList.add('button');
            verifyButton.style.backgroundColor = '#318346';
            verifyButton.style.color = 'white';
            verifyButton.style.borderRadius = '5px';
            verifyButton.style.marginRight = '10px';
            verifyButton.style.marginLeft = '10px';
            verifyButton.style.padding = '5px';
            verifyButton.style.fontWeight = 'bold';
            verifyButton.style.width = '150px';

            verifyButton.addEventListener('click', async () => {
                const confirmMessage = confirm('Are you sure you want to verify this payment?');
                if (confirmMessage) {
                    await verifyPayment(payment.patient, true);
                }
            });

            const declineButton = document.createElement('button');
            declineButton.textContent = 'Decline';
            declineButton.classList.add('decline-btn');
            declineButton.classList.add('button');
            declineButton.style.backgroundColor = '#B90B0B';
            declineButton.style.color = 'white';
            declineButton.style.borderRadius = '5px';
            declineButton.style.marginRight = '10px';
            declineButton.style.marginLeft = '10px';
            declineButton.style.padding = '5px';
            declineButton.style.fontWeight = 'bold';
            declineButton.style.width = '150px';

            declineButton.addEventListener('click', async () => {
                const confirmMessage = confirm('Are you sure you want to decline this payment?');
                if (confirmMessage) {
                    await declinePayment(payment.patient);
                }
            });

            // Append elements to DOM
            buttonContainer.appendChild(verifyButton);
            buttonContainer.appendChild(declineButton);
            listItem.appendChild(emailElement);
            listItem.appendChild(acceptStatus);
            listItem.appendChild(checkStatus);
            listItem.appendChild(imageElement);
            listItem.appendChild(buttonContainer);
            orderedList.appendChild(listItem);
        });

        paymentDetails.innerHTML = '';
        paymentDetails.appendChild(orderedList);
    };

    fetchPayments();
});
