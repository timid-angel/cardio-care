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
                const patientsData = await response.json();
                renderPatients(patientsData);
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

            const imageElement = document.createElement('img');
            imageElement.src = `/cardio-care/images/payments/${payment.img}`;
            imageElement.alt = 'Receipt';
            imageElement.classList.add('payment-image');

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const verifyButton = document.createElement('button');
            verifyButton.textContent = 'Verify';
            verifyButton.classList.add('verify-btn');
            verifyButton.classList.add('button');
            verifyButton.style.backgroundColor = 'green';
            verifyButton.style.color = 'white';
            verifyButton.style.borderRadius = '5px';
            verifyButton.style.marginRight = '10px';
            verifyButton.style.padding = '5px';
            verifyButton.style.fontWeight = 'bold';

            const deactivateButton = document.createElement('button');
            deactivateButton.textContent = 'Deactivate';
            deactivateButton.classList.add('deactivate-btn');
            deactivateButton.classList.add('button');
            deactivateButton.style.backgroundColor = 'red';
            deactivateButton.style.color = 'white';
            deactivateButton.style.borderRadius = '5px';
            deactivateButton.style.padding = '5px';
            deactivateButton.style.fontWeight = 'bold';

            buttonContainer.appendChild(verifyButton);
            buttonContainer.appendChild(deactivateButton);

            listItem.appendChild(emailElement);
            listItem.appendChild(imageElement);
            listItem.appendChild(buttonContainer);

            orderedList.appendChild(listItem);
        });

        paymentDetails.appendChild(orderedList);
    };

    const renderPatients = (patients) => {
        const paymentItems = document.querySelectorAll('.payment-item');

        paymentItems.forEach((paymentItem) => {
            const emailElement = paymentItem.querySelector('span');
            const email = emailElement.textContent.split(': ')[1];

            const matchingPatient = patients.find((patient) => patient.email === email);
            if (matchingPatient) {
                const fullName = `${matchingPatient.name.first} ${matchingPatient.name.middle || ''} ${matchingPatient.name.last || ''}`;
                const fullNameElement = document.createElement('span');
                fullNameElement.textContent = `Full Name: ${fullName}`;
                fullNameElement.style.fontWeight = 'bold';
                paymentItem.insertBefore(fullNameElement, emailElement.nextSibling);
            }
        });
    };



    fetchPayments();
    fetchPatients();
});
