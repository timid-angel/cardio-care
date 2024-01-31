document.addEventListener('DOMContentLoaded', async () => {
    const exportButton = document.getElementById('exportButton')

    exportButton.addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('export btn clicked')
        try {
        
            const response = await fetch('/patient/exportRecord/')

            if (!response.ok){
                throw new Error(`Error: ${response.status}`);
            }

            const file = await response.blob();
            const link = window.URL.createObjectURL(file);

            const a = document.createElement('a');
            a.href = link;
            a.download = 'user_medical_record.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    })
});
