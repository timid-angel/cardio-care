document.addEventListener('DOMContentLoaded', () => {
    const doctorListContainer = document.getElementById('doctorList');

    // Function to create a button
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to handle reactivation
    function reactivateDoctor(doctorId) {
        // Not implemented yet
        console.log(`Reactivate doctor with ID: ${doctorId}`);
    }

    // Function to handle deactivation



    // Function to handle deactivation
    function deactivateDoctor(doctorId, doctor, doctorContainer) {
        // Display confirmation message
        const confirmation = confirm("Are you sure you want to deactivate this Doctor?");
        if (confirmation) {
            // Make a PUT request to deactivate the receptionist
            fetch(`/admin/doctor/deactivate/${encodeURIComponent(doctor.email)}`, {
                method: 'PUT',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to deactivate receptionist');
                    }
                    // Update the UI or perform additional actions as needed
                    alert(`Successfully deactivated doctor with email: ${doctor.email}`);
                })
                .catch(error => console.error('Error deactivating Doctor:', error));
        }
    }



    // Function to handle reactivation
    function reactivateDoctor(doctorId, doctor, doctorContainer) {
        // Make a PUT request to reactivate the doctor
        fetch(`/admin/doctor/reactivate/${encodeURIComponent(doctor.email)}`, {
            method: 'PUT',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to reactivate doctor');
                }
                // Update the UI or perform additional actions as needed
                alert(`Successfully reactivated doctor with email: ${doctor.email}`);
            })
            .catch(error => console.error('Error reactivating Doctor:', error));
    }



    // Function to handle deletion
    function deleteDoctor(doctorEmail, doctorContainer) {
        // Show a confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to delete the doctor?');

        // Check if the user confirmed
        if (isConfirmed) {
            // Make a DELETE request to delete the doctor
            fetch(`/admin/doctor/${encodeURIComponent(doctorEmail)}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete doctor');
                    }
                    // Remove the deleted doctor from the UI
                    doctorContainer.remove();
                    console.log(`Successfully deleted doctor with email: ${doctorEmail}`);
                })
                .catch(error => console.error('Error deleting doctor:', error));
        }
    }


    // Fetch doctors data from the backend
    fetch('/admin/doctors')
        .then(response => response.json())
        .then(data => {
            const doctors = data.doctors;

            // Render each doctor
            doctors.forEach((doctor, index) => {
                // Create a container div for each doctor
                const doctorContainer = document.createElement('div');
                doctorContainer.classList.add('doctor-container');

                // Create a white div container for the doctor's data
                const dataDiv = document.createElement('div');
                dataDiv.classList.add('data-container');

                // Display doctor's full name
                const fullName = `${doctor.name.first} ${doctor.name.middle} ${doctor.name.last}`;
                const fullNameDiv = document.createElement('div');
                fullNameDiv.textContent = `Name: ${fullName}`;
                dataDiv.appendChild(fullNameDiv);

                // Display doctor's email
                const emailDiv = document.createElement('div');
                emailDiv.textContent = `Email: ${doctor.email}`;
                dataDiv.appendChild(emailDiv);

                // Display doctor's state
                const stateDiv = document.createElement('div');
                stateDiv.textContent = `State: ${doctor.state}`;
                dataDiv.appendChild(stateDiv);

                // Append data container to the doctor container
                doctorContainer.appendChild(dataDiv);

                // Create a container div for the buttons
                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('buttons-container');

                // Create buttons for reactivation, deactivation, and deletion
                const reactivateBtn = createButton('Reactivate', () => reactivateDoctor(doctor._id, doctor, doctorContainer));
                const deactivateBtn = createButton('Deactivate', () => deactivateDoctor(doctor._id, doctor, doctorContainer));
                const deleteBtn = createButton('Delete', () => deleteDoctor(doctor.email, doctorContainer));

                // Add specific styling to buttons
                reactivateBtn.classList.add('reactivate-btn');
                deactivateBtn.classList.add('deactivate-btn');
                deleteBtn.classList.add('delete-btn');

                // Append buttons to the buttons container
                buttonsContainer.appendChild(reactivateBtn);
                buttonsContainer.appendChild(deactivateBtn);
                buttonsContainer.appendChild(deleteBtn);
                dataDiv.appendChild(buttonsContainer);

                // Append the doctor container to the main container
                doctorListContainer.appendChild(doctorContainer);
            });
        })
        .catch(error => console.error('Error fetching doctors:', error));
});
