




document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the server (replace the URL with the actual backend endpoint)
    fetch('https://example.com/api/appointments')
        .then(response => response.json())
        .then(data => {
            const appointmentsContainer = document.getElementById("appointmentsContainer");

            // Loop through the fetched data and create appointment cards
            data.forEach(appointment => {
                const card = document.createElement("div");
                card.className = getCardClass(appointment);
                card.id = `appointmentCard${appointment.id}`;
                card.innerHTML = `
                    <ul style="width:95%;" class="flex justify-between  items-center text-gray-800  rounded-lg">
                        <li>${appointment.status}</li>
                        <li>${appointment.date}</li>
                        <li>${appointment.time}</li>
                        <li>${appointment.doctor}</li>
                        <li class="w-36">${appointment.instructions}</li>
                        <div>
                            <button class="bg-green-500 text-white px-4 py-2 rounded-full mr-2 hover:bg-green-600 hover:text-gray-100 transition duration-300 ease-in-out" onclick="rescheduleAppointment(${appointment.id})">Reschedule</button>
                            <button class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 hover:text-gray-100 transition duration-300 ease-in-out" onclick="removeAppointment(${appointment.id})">Remove</button>
                        </div>
                    </ul>
                `;

                // Append the card to the container
                appointmentsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function getCardClass(appointment) {
    const currentDate = new Date();
    const appointmentDate = new Date(`${appointment.date} ${appointment.time}`);

    if (appointment.status === 'unresolved' || appointment.status === 'completed') {
        return "flex flex-col justify-center items-center mx-auto font-bold bg-white py-4 mt-4 rounded-lg";
    } else if (appointment.status === 'cancelled') {
        return "flex flex-col justify-center items-center mx-auto font-bold bg-red-300 py-4 mt-4 rounded-lg";
    } else if (appointmentDate > currentDate) {
        // Upcoming appointment
        return "flex flex-col justify-center items-center mx-auto font-bold bg-blue-300 py-4 mt-4 rounded-lg";
    } else {
        // Past appointment
        return "flex flex-col justify-center items-center mx-auto font-bold bg-gray-300 py-4 mt-4 rounded-lg";
    }
}

function rescheduleAppointment(appointmentId) {
    // Add logic to redirect to test2.html with the appointmentId
    window.location.href = `test2.html?appointmentId=${appointmentId}`;
}

function removeAppointment(appointmentId) {
    // Add logic to remove the corresponding card and update the database
    const cardToRemove = document.getElementById(`appointmentCard${appointmentId}`);
    if (cardToRemove) {
        cardToRemove.remove();

        // Add logic to send a request to the server to remove the appointment from the database
        fetch(`https://example.com/api/removeAppointment/${appointmentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error removing appointment');
                }
                return response.json();
            })
            .then(data => console.log('Appointment removed successfully:', data))
            .catch(error => console.error('Error removing appointment:', error));
    }
}

document.getElementById("scheduleAppointmentBtn").addEventListener("click", function () {
    // Redirect to test2.html when the "Schedule Appointment" button is clicked
    window.location.href = "date.html";
});
