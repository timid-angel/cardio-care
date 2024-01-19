document.addEventListener('DOMContentLoaded', async () => {
    const fetchDoctors = async () => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/Doctor');
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

    
   
    const showModal = async (email) => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
    
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'center';

      
    
        const title = document.createElement('h2');
        title.textContent = 'Patient Doctor Linkage';
        title.style.fontSize = '2em';
        header.appendChild(title);
    
        const emailContainer = document.createElement('div');
        emailContainer.textContent = `Patient Email: ${email}`;
        emailContainer.style.marginBottom = '20px';
        emailContainer.style.fontWeight = 'bold';
    
   
        const label = document.createElement('label');
        label.for = 'doctorEmail';
        label.textContent = 'Link Doctor';
        label.style.fontWeight = 'bold';
    
        const input = document.createElement('input');
        input.type = 'email';
        input.id = 'doctorEmail';
        input.name = 'doctorEmail';
        input.placeholder = 'Enter Doctor Email';
        input.style.marginBottom = '10px';
        input.style.padding= '10px';
    
        const linkAsMainButton = document.createElement('button');
        linkAsMainButton.textContent = 'Link as Main Doctor';
        linkAsMainButton.style.backgroundColor = '#3498db'; // Blue color
        linkAsMainButton.style.color = 'white';
        linkAsMainButton.style.border = '1px none'; // Black frame
        linkAsMainButton.style.padding = '4px 8px'; // Decreased padding
        linkAsMainButton.style.cursor = 'pointer';
        linkAsMainButton.style.marginRight = '10px';
        linkAsMainButton.style.marginBottom = '5px'; 
        linkAsMainButton.style.width = '500px'; 
        linkAsMainButton.style.borderRadius='5px'
        
        
        
        // Added margin bottom

linkAsMainButton.addEventListener('mouseover', () => {
    linkAsMainButton.style.backgroundColor = '#2980b9'; // Darker blue on hover
});
linkAsMainButton.addEventListener('click', async () => {
    const doctorEmail = input.value; // Retrieve doctor's email from the input field
    const doctors = await fetchDoctors();
    
    const isDoctorExists = doctors.some(doctor => doctor.email === doctorEmail);
    if (!isDoctorExists) {
        alert('No such doctor found');
        return;
    }
    

    await linkPatientWithDoctor(email, doctorEmail, 'mainDoctor');
    document.body.removeChild(modal); // Close the modal after linking
});

linkAsMainButton.addEventListener('mouseout', () => {
    linkAsMainButton.style.backgroundColor = '#3498db'; // Restore original color on mouseout
});




        const linkAsTempButton = document.createElement('button');
        linkAsTempButton.textContent = 'Link as Temporary Doctor';
        linkAsTempButton.style.backgroundColor = '#377989';
        linkAsTempButton.style.color = 'white';
        linkAsTempButton.style.border = '1px none'; // Black frame
        linkAsTempButton.style.padding = '4px 8px'; // Decreased padding
        linkAsTempButton.style.cursor = 'pointer';
        linkAsTempButton.style.marginBottom = '5px'; 
        linkAsTempButton.style.width = '500px'; 
        linkAsTempButton.style.borderRadius='5px'

        linkAsTempButton.addEventListener('mouseover', () => {
            linkAsTempButton.style.backgroundColor = '#4192A6'; // Light gray on hover
});

linkAsTempButton.addEventListener('mouseout', () => {
    linkAsTempButton.style.backgroundColor = '#377989'; // Restore original color on mouseout
});
linkAsTempButton.addEventListener('click', async () => {
    const doctorEmail = input.value; // Retrieve doctor's email from the input field
    const doctors = await fetchDoctors();

    const isDoctorExists = doctors.some(doctor => doctor.email === doctorEmail);
    if (!isDoctorExists) {
        alert('No such doctor found');
        return;
    }

  

    await linkPatientWithDoctor(email, doctorEmail, 'tempDoctor');
    document.body.removeChild(modal); // Close the modal after linking
});

const unlinkButton = document.createElement('button');
       unlinkButton.textContent = 'Unlink';
       unlinkButton.style.backgroundColor = '#B90B0B'; // Blue color
       unlinkButton.style.color = 'white';
       unlinkButton.style.border = '1px none'; // Black frame
       unlinkButton.style.padding = '4px 8px'; // Decreased padding
       unlinkButton.style.cursor = 'pointer';
       unlinkButton.style.marginRight = '10px';
       unlinkButton.style.width = '500px'; 
       unlinkButton.style.borderRadius='5px'

      unlinkButton.addEventListener('mouseover', () => {
       unlinkButton.style.backgroundColor = '#C03232'; // Light gray on hover
});

unlinkButton.addEventListener('mouseout', () => {
unlinkButton.style.backgroundColor = '#B90B0B'; // Restore original color on mouseout
});


   
   


       const contentContainer = document.createElement('div');
        contentContainer.style.display = 'flex';
        contentContainer.style.flexDirection = 'column';
        contentContainer.appendChild(header);
        contentContainer.appendChild(emailContainer);

        contentContainer.appendChild(label);
        contentContainer.appendChild(input);
        contentContainer.appendChild(linkAsMainButton);
        contentContainer.appendChild(linkAsTempButton);
        contentContainer.appendChild(unlinkButton);



        
      
    
        

    const linkPatientWithDoctor = async (patientEmail, doctorEmail, linkType) => {
        try {
            const response = await fetch('http://localhost:3000/receptionist/patients/link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ patientEmail, doctorEmail, linkType }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert('Patient linked with doctor successfully');       
                } else {
                    alert('Failed to link patient with doctor');
                }
            } else {
                alert('Failed to link patient with doctor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

 
            
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Cancel';
        closeButton.style.backgroundColor = '#494545';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.padding = '3px 16px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.margin = ' auto';
        closeButton.style.display = 'block';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

    
        
       
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center';
        buttonContainer.style.marginTop = '20px';
        buttonContainer.appendChild(closeButton);

       const modalContent = document.createElement('div');
    modalContent.style.flex = '1';
    modalContent.style.display = 'flex';
    modalContent.style.flexDirection = 'column';
    modalContent.appendChild(contentContainer);
    modalContent.appendChild(buttonContainer);


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
    innerModal.style.height = '400px';
    innerModal.style.display = 'flex';
    innerModal.style.flexDirection = 'column';
    innerModal.appendChild(modalContent);
    
    
        modal.appendChild(innerModal);
    
        document.body.appendChild(modal);

      
   

    
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
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
            const fullName = `${index + 1}. Full Name :  ${patient.name?.first || ''} ${patient.name?.middle || ''} ${patient.name?.last || ''}`;
            patientName.textContent = fullName.trim() || 'No Name Available';
            patientName.style.fontWeight = 'bold';
            patientName.style.color = '#4E402C';
            patientInfo.appendChild(patientName);

            const patientId= patient.patientId

            const linkState=  document.createElement('span');
            const link = `Linkage Status : ${patient.linkState }`;
            linkState.textContent = link.trim() || 'link State Unavailable ';
            linkState.style.fontWeight = 'bold';
           linkState.style.color = '#4E402C';
            patientInfo.appendChild(linkState);
    
            const patientEmail = document.createElement('span');
            const emailIcon = document.createElement('i');
            emailIcon.classList.add('fas');
            emailIcon.classList.add('fa-envelope');
            emailIcon.style.marginRight = '5px';
            patientEmail.appendChild(emailIcon);

          
    
            patientEmail.textContent = `Patient email : ${patient.email || 'No Email Available'}`;
            patientEmail.style.color = '#377989';
            patientInfo.appendChild(patientEmail);
    
            listItem.appendChild(patientInfo);
    
            const icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-link');
            icon.style.color = '#1C89CF';
            icon.style.marginLeft = '5px';
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => {
                showModal(patient.email);
            });
    
            listItem.appendChild(icon);
            patientList.appendChild(listItem);

            const reactivateAccount = document.createElement('button');
            reactivateAccount.textContent = 'reactivate ';
            reactivateAccount.style.backgroundColor = '#318346'; // Blue color
            reactivateAccount.style.color = 'white';
            reactivateAccount.style.border = '1px none'; // Black frame
            reactivateAccount.style.padding = '4px 8px'; // Decreased padding
            reactivateAccount.style.cursor = 'pointer';
            reactivateAccount.style.marginLeft = '10px';
            reactivateAccount.style.width = '200px'; 
            reactivateAccount.style.borderRadius='5px'
            reactivateAccount.style.display='block'
            reactivateAccount.setAttribute('class', `reactivate`);
            reactivateAccount.setAttribute('class', `common`);
            reactivateAccount.dataset.patientId = patientId;
           
            listItem.appendChild(reactivateAccount);
            patientList.appendChild(listItem);


            const deactivateButton = document.createElement('button');
            deactivateButton.textContent = 'deactivate ';
            deactivateButton.style.backgroundColor = '#B90B0B'; // Blue color
            deactivateButton.style.color = 'white';
            deactivateButton.style.border = '1px none'; // Black frame
            deactivateButton.style.padding = '4px 8px'; // Decreased padding
            deactivateButton.style.cursor = 'pointer';
            deactivateButton.style.marginLeft = '10px';
            deactivateButton.style.width = '200px'; 
            deactivateButton.style.borderRadius='5px'
            deactivateButton.style.display='block'
            deactivateButton.setAttribute('class', `deactivate`);
            deactivateButton.setAttribute('class', `common`);
            listItem.appendChild(deactivateButton);
            deactivateButton.dataset.patientId =patientId;
            patientList.appendChild(listItem);

            


            async function deactivatePatient(email) {
                try {
                    const response = await fetch(`http://localhost:3000/receptionist/deactivate-patient/${email}`, {
                        method: 'PUT',
                    });
            
                    if (response.ok) {
                        alert('Patient account deactivated successfully');
                        // Fetch and display updated patients
                        fetchPatients();
                    } else {
                        const data = await response.json();
                        if (response.status === 400) {
                            alert(`Error deactivating Patient: Invalid request`);
                        } else if (response.status === 404) {
                            alert(`Error deactivating Patient: Patient not found`);
                        } else {
                            alert(`Error deactivating Patient: ${data.error}`);
                        }
                    }
                } catch (error) {
                    console.error('Error deactivating patient:', error);
                    alert('Error deactivating Patient: Something went wrong');
                }
            }
            
            async function reactivatePatient(email) {
                try {
                    const response = await fetch(`http://localhost:3000/receptionist/reactivate-patient/${email}`, {
                        method: 'PUT',
                    });
            
                    if (response.ok) {
                        alert('Patient account reactivated successfully');
                        // Fetch and display updated patients
                        fetchPatients();
                    } else {
                        const data = await response.json();
                        if (response.status === 400) {
                            alert(`Error reactivating Patient: Invalid request`);
                        } else if (response.status === 404) {
                            alert(`Error reactivating Patient: Patient not found`);
                        } else {
                            alert(`Error reactivating Patient: ${data.error}`);
                        }
                    }
                } catch (error) {
                    console.error('Error reactivating patient:', error);
                    alert('Error reactivating Patient: Something went wrong');
                }
            }
            
            ``
            deactivateButton.addEventListener('click', async (event) => {
                const patientEmail = patient.email; // Retrieve patient's email here
                await deactivatePatient(patientEmail);
            });
            
            reactivateAccount.addEventListener('click', async (event) => {
                const patientEmail = patient.email; // Retrieve patient's email here
                await reactivatePatient(patientEmail);
            });
        });
  
    };
    
    fetchPatients();
    fetchDoctors()
});
   