

document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById('date');
    const calendarCard = document.getElementById('calendar');
    const selectedDateElement = document.getElementById("selectedDate");
  
    // Get the current date and format it as YYYY-MM-DD
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
  
    // Set the default current date on the selectedDate element
    selectedDateElement.textContent = formattedCurrentDate;
  
    flatpickr(dateInput, {
        dateFormat: "Y-m-d",
        defaultDate: "today",
        onReady: function (selectedDates, dateStr, instance) {
            instance.open();
        },
        onChange: function (selectedDates, dateStr) {
            // Update the selected date in the "selectedDate" element
            selectedDateElement.textContent = dateStr;
        },
        appendTo: calendarCard,
    });
  
    document.getElementById("previousBtn").addEventListener("click", function () {
        // Redirect to test.html when the "Previous" button is clicked
        window.location.href = "appointment.html";
    });
  
    const timeSlots = document.querySelectorAll('.time-slot');
  
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            const confirmationDiv = document.createElement('div');
            confirmationDiv.className = 'confirmation-box bg-white p-4 mt-4 rounded-md';
            confirmationDiv.innerHTML = `
                <p class="mb-2">You are going to schedule an appointment on ${selectedDateElement.textContent} at ${slot.textContent}. Click OK to confirm.</p>
                <button id="confirmAppointmentBtn" class="bg-green-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-green-600 hover:text-gray-100 transition duration-300 ease-in-out">OK</button>
                <button id="cancelAppointmentBtn" class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:text-gray-100 transition duration-300 ease-in-out">Cancel</button>
            `;
  
            document.body.appendChild(confirmationDiv);
  
            const confirmBtn = document.getElementById('confirmAppointmentBtn');
            const cancelBtn = document.getElementById('cancelAppointmentBtn');
  
            confirmBtn.addEventListener('click', function () {
                //  function to add the appointment to the database
                addAppointmentToDatabase(selectedDateElement.textContent, slot.textContent);
  
                // Display success message
                alert('Appointment added successfully!');
  
                // Remove the confirmation box
                confirmationDiv.remove();
            });
  
            cancelBtn.addEventListener('click', function () {
                // Remove the confirmation box
                confirmationDiv.remove();
            });
        });
    });
  
    function addAppointmentToDatabase(date, time) {
        //   fetch request to a hypothetical endpoint to send the appointment data to the server and save it in the database
        fetch('https://example.com/api/addAppointment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date: date,
                time: time,
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error adding appointment');
                }
                return response.json();
            })
            .then(data => console.log('Appointment added successfully:', data))
            .catch(error => console.error('Error adding appointment:', error));
    }
  });
  