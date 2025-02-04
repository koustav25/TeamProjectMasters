function createChart(id, labels, datasets, type, options = null) {
    const sales_chart = $(id)

    let chart_data = {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    boxPadding: 3
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
            maintainAspectRatio: false,
            responsive: true
        },
    };

    if (options) {
        // Merge the options object with the chart_data object
        chart_data.options = Object.assign(chart_data.options, options);
    }

    const chart = new Chart(sales_chart, chart_data);
}

let last_index = 0;

/**
 * Pick a random colour for the chart
 * @param name The value to pick a colour for
 * @returns {{border: string, background: string}} A colour object with a background and border colour
 * @author Benjamin Lister
 */
function pickRandomColour(name) {
    //This function was originally going to pick a random colour, but in practice it worked out better
    // to cycle through a set of colours to prevent a lot of similarly named values from having the same colour
    // This is effectively a round-robin algorithm that cycles through a set of colours
    // But can still appear random if the order of the values changes
    const backgroundColours =
        [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(0, 0, 255, 0.2)',
            'rgba(0, 128, 0, 0.2)',
            'rgba(128, 128, 128, 0.2)',
            'rgba(13,202,240, 0.2)',
            'rgba(255, 165, 0, 0.2)',
        ];

    const borderColours =
        [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(0, 0, 255)',
            'rgb(0, 128, 0)',
            'rgb(128, 128, 128)',
            'rgb(13,202,240)',
            'rgb(255, 165, 0)',
        ];

    const out = {background: backgroundColours[last_index], border: borderColours[last_index]};

    //Increment the index and loop back to the start if we reach the end
    last_index = (++last_index) % backgroundColours.length;

    return out;
}