
//chart

document.addEventListener("DOMContentLoaded", function () {
    var data = {
        labels: ["Heart Rate", "Body Temperature", "Blood Sugar", "Blood Pressure", "Respiration Rate"],
        datasets: [
            {
                label: "Weekly Reading",
                borderColor: "blue",
                borderWidth: 2,
                pointBackgroundColor: "blue",
                pointRadius: 5,
                fill: false,
                data: [59, 39, 116, 149, 25],
            },
        ],
    };

    var options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    var ctx = document.getElementById("summaryChart").getContext("2d");

    var myLineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options,
    });
});

