document.addEventListener('DOMContentLoaded', () => {
    const exportDataSection = document.getElementById('export-data');
    const exportButton = exportDataSection.querySelector('.button button');

    exportButton.addEventListener('click', async () => {
        try {
            // const selectedFile = document.getElementById('myDropdown1').value;
            // const selectedFormat = document.getElementById('myDropdown2').value;
            // const selectedDestination = document.getElementById('myDropdown3').value;

            const response = await fetch('patient/export-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({
                //     file: selectedFile,
                //     format: selectedFormat,
                //     destination: selectedDestination,
                // }),
            });

            if (response.ok) {
                console.log('Export successful');
            } else {
                console.error('Export failed');
            }
        } catch (err) {
            console.error(err);
        }
    });
});
