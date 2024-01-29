document.addEventListener('DOMContentLoaded', () => {
    const receptionistListContainer = document.getElementById('receptionistList');

    // Function to create a button
    function createButton(text, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', onClick);
        return button;
    }

    // Function to handle reactivation
    function reactivateReceptionist(receptionistId) {
        // Implement reactivation logic here
        console.log(`Reactivate receptionist with ID: ${receptionistId}`);
    }

    // Function to handle deactivation
    function deactivateReceptionist(receptionistId, receptionistContainer) {
        // Implement deactivation logic here
        console.log(`Deactivate receptionist with ID: ${receptionistId}`);
    }

    // Function to handle deletion
    function deleteReceptionist(receptionistId, receptionistContainer) {
        // Display confirmation message
        const confirmation = confirm("Are you sure you want to delete this receptionist?");
        if (confirmation) {
            // Fetch receptionist data from the backend
            fetch('http://127.0.0.1:3000/admin/receptionists')
                .then(response => response.json())
                .then(data => {
                    const receptionists = data.receptionists;

                    // Find the selected receptionist
                    const receptionist = receptionists.find(receptionist => receptionist._id === receptionistId);

                    // Make a DELETE request to delete the receptionist
                    fetch(`http://127.0.0.1:3000/admin/receptionist/${encodeURIComponent(receptionist.email)}`, {
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
    fetch('http://127.0.0.1:3000/admin/receptionists')
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

                // Create an ordered list number
                const numberDiv = document.createElement('div');
                numberDiv.textContent = `${index + 1}.`;
                numberDiv.classList.add('number');
                dataDiv.appendChild(numberDiv);

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
                const reactivateBtn = createButton('Reactivate', () => reactivateReceptionist(receptionist._id));
                const deactivateBtn = createButton('Deactivate', () => deactivateReceptionist(receptionist._id, receptionistContainer));
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
