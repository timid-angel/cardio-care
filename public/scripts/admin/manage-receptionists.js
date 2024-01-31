document.addEventListener('DOMContentLoaded', () => {
    const receptionistListContainer = document.getElementById('receptionistList');

    // Function to create a button
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to handle deactivation
    function deactivateReceptionist(receptionistId, receptionist, receptionistContainer) {
        // Display confirmation message
        const confirmation = confirm("Are you sure you want to deactivate this receptionist?");
        if (confirmation) {
            // Make a PUT request to deactivate the receptionist
            fetch(`/admin/receptionist/deactivate/${encodeURIComponent(receptionist.email)}`, {
                method: 'PUT',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to deactivate receptionist');
                    }
                    // Update the UI or perform additional actions as needed
                    alert(`Successfully deactivated receptionist with email: ${receptionist.email}`);
                })
                .catch(error => console.error('Error deactivating receptionist:', error));
        }
    }


    // Function to handle reactivation
    function reactivateReceptionist(receptionistId, receptionist, receptionistContainer) {
        // Display confirmation message
        const confirmation = confirm("Are you sure you want to reactivate this receptionist?");
        if (confirmation) {
            // Make a PUT request to reactivate the receptionist
            fetch(`/admin/receptionist/reactivate/${encodeURIComponent(receptionist.email)}`, {
                method: 'PUT',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to reactivate receptionist');
                    }
                    // Update the UI or perform additional actions as needed
                    alert(`Successfully reactivated receptionist with email: ${receptionist.email}`);
                })
                .catch(error => console.error('Error reactivating receptionist:', error));
        }
    }


    // Function to handle deletion
    function deleteReceptionist(receptionistId, receptionistContainer) {
        // Display confirmation message
        const confirmation = confirm("Are you sure you want to delete this receptionist?");
        if (confirmation) {
            // Fetch receptionist data from the backend
            fetch('/admin/receptionists')
                .then(response => response.json())
                .then(data => {
                    const receptionists = data.receptionists;

                    // Find the selected receptionist
                    const receptionist = receptionists.find(receptionist => receptionist._id === receptionistId);

                    // Make a DELETE request to delete the receptionist
                    fetch(`/admin/receptionist/${encodeURIComponent(receptionist.email)}`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to delete receptionist');
                            }
                            // Remove the deleted receptionist from the UI
                            receptionistContainer.remove();
                            console.log(`Successfully deleted receptionist with ID: ${receptionistId}`);
                            // Display success alert
                            alert("Receptionist deleted successfully!");
                        })
                        .catch(error => console.error('Error deleting receptionist:', error));
                })
                .catch(error => console.error('Error fetching receptionists:', error));
        }
    }

    // Fetch receptionists data from the backend
    fetch('/admin/receptionists')
        .then(response => response.json())
        .then(data => {
            const receptionists = data.receptionists;

            // Render each receptionist
            receptionists.forEach((receptionist, index) => {
                // Create a container div for each receptionist
                const receptionistContainer = document.createElement('div');
                receptionistContainer.classList.add('receptionist-container');

                // Create a white div container for the receptionist's data
                const dataDiv = document.createElement('div');
                dataDiv.classList.add('data-container');

                // Display receptionist's full name
                const fullName = `${receptionist.name.first} ${receptionist.name.middle} ${receptionist.name.last}`;
                const fullNameDiv = document.createElement('div');
                fullNameDiv.textContent = `Name: ${fullName}`;
                dataDiv.appendChild(fullNameDiv);

                // Display receptionist's email
                const emailDiv = document.createElement('div');
                emailDiv.textContent = `Email: ${receptionist.email}`;
                dataDiv.appendChild(emailDiv);

                // Display receptionist's state
                const stateDiv = document.createElement('div');
                stateDiv.textContent = `State: ${receptionist.state}`;
                dataDiv.appendChild(stateDiv);

                // Append data container to the receptionist container
                receptionistContainer.appendChild(dataDiv);

                // Create a container div for the buttons
                const buttonsContainer = document.createElement('div');
                buttonsContainer.classList.add('buttons-container');

                // Create buttons for reactivation, deactivation, and deletion
                const reactivateBtn = createButton('Reactivate', () => {
                    if (receptionist) {
                        reactivateReceptionist(receptionist._id, receptionist, receptionistContainer);
                    } else {
                        console.error('Receptionist object is undefined');
                    }
                });


                const deactivateBtn = createButton('Deactivate', () => deactivateReceptionist(receptionist._id, receptionist, receptionistContainer));
                const deleteBtn = createButton('Delete', () => deleteReceptionist(receptionist._id, receptionistContainer));


                // Add specific styling to buttons
                reactivateBtn.classList.add('reactivate-btn');
                deactivateBtn.classList.add('deactivate-btn');
                deleteBtn.classList.add('delete-btn');

                // Append buttons to the buttons container
                buttonsContainer.appendChild(reactivateBtn);
                buttonsContainer.appendChild(deactivateBtn);
                buttonsContainer.appendChild(deleteBtn);
                dataDiv.appendChild(buttonsContainer);

                // Append the receptionist container to the main container
                receptionistListContainer.appendChild(receptionistContainer);
            });
        })
        .catch(error => console.error('Error fetching receptionists:', error));
});
