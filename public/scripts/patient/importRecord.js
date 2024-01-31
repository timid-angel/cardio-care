document.addEventListener('DOMContentLoaded', async () => {
    const importButton = document.getElementById('importButton');
    const importForm = document.getElementById('importForm');

    importButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('jsonFile');
    
        if (!fileInput.value) {
            alert('Please select a file before importing.');
            return;
        }
        try {
            const formData = new FormData(importForm);
        
            console.log(formData)
            const response = await fetch('/patient/importRecord/', {
                method: 'POST',
                body: formData,
            });

            console.log("response is", response.ok)
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // const result = await response.json();
            // console.log(result);

            alert('Medical record imported successfully!');
        } catch (error) {
            console.error('Error importing medical record:', error);
        }
    });
});
