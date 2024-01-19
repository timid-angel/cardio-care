document.addEventListener('DOMContentLoaded', async () => {
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

    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/Doctor', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                return data.doctors; // Return doctors' data
            } else {
                console.error('Failed to fetch doctors');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const populateDoctorDropdown = async () => {
        const doctors = await fetchDoctors(); // Fetch doctors' data
        const selectDoctor = document.getElementById('doctorList');
        selectDoctor.innerHTML = ''; // Clear existing options

        const defaultOption = document.createElement('option');
        defaultOption.value = 'default';
        defaultOption.textContent = 'Select a Doctor';
        selectDoctor.appendChild(defaultOption);

        doctors.forEach((doctor) => {
            const doctorOption = document.createElement('option');
            doctorOption.value = doctor.email;

            const fullName = `${doctor.name?.first || ''} ${doctor.name?.middle || ''} ${doctor.name?.last || ''}`;
            doctorOption.textContent = `${fullName.trim()} - ${doctor.email}`;

            selectDoctor.appendChild(doctorOption);
        });
    };

    const showModal = async (email) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');

        const emailContainer = document.createElement('div');
        emailContainer.textContent = `Patient Email: ${email}`;
        emailContainer.style.float = 'left';
        emailContainer.style.paddingRight = '400px';
        emailContainer.style.paddingBottom = '50px';

        const selectDoctor = document.createElement('select');
        selectDoctor.name = 'doctors';
        selectDoctor.id = 'doctorList';

        const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.alignItems = 'center';
        contentContainer.appendChild(emailContainer);
        contentContainer.appendChild(selectDoctor);

        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.style.marginRight = '20px';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.backgroundColor = '#4CAF50';
        saveButton.style.color = 'white';
        saveButton.style.border = 'none';
        saveButton.style.padding = '10px 24px';
        saveButton.style.textAlign = 'center';
        saveButton.style.textDecoration = 'none';
        saveButton.style.display = 'inline-block';
        saveButton.style.fontSize = '16px';
        saveButton.style.marginRight = '10px';
        saveButton.style.cursor = 'pointer';

        saveButton.addEventListener('mouseover', () => {
            saveButton.style.backgroundColor = '#45a049';
        });
        saveButton.addEventListener('mouseout', () => {
            saveButton.style.backgroundColor = '#4CAF50';
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.clear = 'both';
        buttonContainer.appendChild(closeButton);
        buttonContainer.appendChild(saveButton);

        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';

        const innerModal = document.createElement('div');
        innerModal.style.backgroundColor = 'white';
        innerModal.style.padding = '20px';
        innerModal.style.border = '1px solid black';
        innerModal.style.width = '700px';
        innerModal.style.height = '200px';
        innerModal.style.display = 'flex';
        innerModal.style.flexDirection = 'column';
        innerModal.appendChild(contentContainer);
        innerModal.appendChild(buttonContainer);

        modal.appendChild(innerModal);

        document.body.appendChild(modal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });

        // Populate the doctor dropdown within the modal
        await populateDoctorDropdown();
    };

    const renderPatients = (patients) => {
        const patientList = document.getElementById('patientList');
        patientList.innerHTML = '';

        patients.forEach((patient, index) => {
            const listItem = document.createElement('li');
            listItem.style.display = 'flex';
            listItem.style.alignItems = 'center';
            listItem.style.marginBottom = '10px';
            listItem.style.backgroundColor = 'white';
            listItem.style.color = 'black';
            listItem.style.padding = '20px';

            const patientInfo = document.createElement('div');
            patientInfo.style.flex = '1';
            patientInfo.style.display = 'flex';
            patientInfo.style.flexDirection = 'column';
            patientInfo.style.gap = '5px';

            const patientName = document.createElement('span');
            const fullName = `${index + 1}. ${patient.name?.first || ''} ${patient.name?.middle || ''} ${patient.name?.last || ''}`;
            patientName.textContent = fullName.trim() || 'No Name Available';
            patientName.style.fontWeight = 'bold';
            patientInfo.appendChild(patientName);

            const patientEmail = document.createElement('span');
            const emailIcon = document.createElement('i');
            emailIcon.classList.add('fas');
            emailIcon.classList.add('fa-envelope');
            emailIcon.style.marginRight = '5px';
            patientEmail.appendChild(emailIcon);

            patientEmail.textContent = `${patient.email || 'No Email Available'}`;
            patientEmail.style.color = 'blue';
            patientInfo.appendChild(patientEmail);

            listItem.appendChild(patientInfo);

            const icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-link');
            icon.style.color = 'red';
            icon.style.marginLeft = '5px';
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => {
                showModal(patient.email);
            });

            listItem.appendChild(icon);
            patientList.appendChild(listItem);
        });
    };

    fetchPatients();
});
