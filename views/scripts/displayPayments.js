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
   const renderPayments = (payments) => {
    const paymentDetails = document.getElementById('paymentDetails');
    const orderedList = document.createElement('ol');
   

    payments.forEach((payment) => {
        const listItem = document.createElement('li');
        listItem.classList.add('payment');

        const emailElement = document.createElement('span');
        emailElement.textContent = `Patient Email: ${payment.patient}`;
        emailElement.style.fontWeight='bold';

        const imageElement = document.createElement('img');
        imageElement.src = `/cardio-care/images/payments/${payment.img}`; 
        imageElement.alt = 'Receipt';
        imageElement.style.width= '200px';
        imageElement.style.height= '200px';
        imageElement.style.objectFit= 'cover';
        


        listItem.appendChild(emailElement);
        listItem.appendChild(imageElement);

        orderedList.appendChild(listItem);
    });

    paymentDetails.appendChild(orderedList);
};

 
    fetchPayments();
});
