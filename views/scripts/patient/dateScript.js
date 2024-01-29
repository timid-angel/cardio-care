const dateInput = document.getElementById('date');
      const calendarCard = document.getElementById('calendar');
  
      flatpickr(dateInput, {
        dateFormat: "Y-m-d",
        defaultDate: "today",
        onReady: function(selectedDates, dateStr, instance) {
          instance.open();
        },
        appendTo: calendarCard,
      });