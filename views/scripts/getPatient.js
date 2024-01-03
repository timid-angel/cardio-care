// getPatients.js
document.addEventListener('DOMContentLoaded', async () => {
    const patientList = document.getElementById('patientList');

    const fetchPatients = async () => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/patients');
            if (response.ok) {
                const data = await response.json();
                renderPatients(data.patients);
                console.log(data.patients)
            } else {
                console.error('Failed to fetch patients');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderPatients = (patients) => {
        patientList.innerHTML = '';
        patients.forEach((patient) => {
            const listItem = document.createElement('div');
            listItem.classList.add('list-item');
            
            // Ensure the data structure matches the backend response
            const firstName = patient.name ? patient.name.first || '' : '';
            const middleName = patient.name ? patient.name.middle || '' : '';
            const lastName = patient.name ? patient.name.last || '' : '';
            
            listItem.textContent = `${firstName} ${middleName} ${lastName}`;
            listItem.style.marginBottom = '10px';
            listItem.style.backgroundColor = 'white';
            listItem.style.Color = 'black';
            listItem.style.padding = '20px';
            patientList.prepend(listItem);
       
        });
    };
    

    fetchPatients(); // Fetch and render patients when the page loads
});
