function getStats(url) {
    return new Promise(function (resolve, reject) {
        fetch(url).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    resolve(json);
                })
            }
        })
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function renderStats_trips(json) {
    let months = json.map(obj => obj.monthname);
    let sumTrips = json.map(obj => obj.sum);
    let colorFill = 'rgba(75, 192, 192, 0.2)';
    let colorStroke = 'rgba(75, 192, 192, 1)';

    var ctx = document.getElementById('chart_TotalTrips').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Trips per Month',
                data: sumTrips,
                backgroundColor: [
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                ],
                borderColor: [
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Trips per Month'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return numberWithCommas(value)
                        }
                    }
                }]
            }
        }
    });

}

function renderStats_miles(json) {

    let months = json.map(obj => obj.monthname);
    let sumMiles = json.map(obj => obj.sum);

    let colorFill = 'rgba(54, 162, 235, 0.2)'
    let colorStroke = 'rgba(54, 162, 235, 1)'
    var ctx = document.getElementById('chart_TotalMiles').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: '# of Miles per Month',
                data: sumMiles,
                backgroundColor: [
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                ],
                borderColor: [
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Miles per Month'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return numberWithCommas(value)
                        }
                    }
                }]
            }
        }
    });

}

function renderStats_cost(json) {
    let labels = json.map(obj => obj.monthname);
    let data = json.map(obj => obj.sum);
    let colorFill = 'rgba(235,89,81,0.2)'
    let colorStroke = 'rgb(235,89,81)'
    var ctx = document.getElementById('chart_TotalCosts').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total cost of all trips',
                data: data,
                backgroundColor: [
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                ],
                borderColor: [
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Total Cost per Month'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return '$' + numberWithCommas(value)
                        }
                    }
                }]
            }
        }
    });

}

function renderStats_topcompany(json) {

    let labels = json.map(obj => obj.company);
    let data = json.map(obj => obj.totalnumberoftrips);
    let colorFill = 'rgba(36,235,96,0.2)'
    let colorStroke = 'rgb(36,235,96)'
    var ctx = document.getElementById('chart_topcompany').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of trips',
                data: data,
                backgroundColor: [
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                    colorFill,
                ],
                borderColor: [
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                    colorStroke,
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Trips for Top 10 Companies for 2016'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return numberWithCommas(value)
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });

}

function renderStats_averages(json) {

    let labels = json.map(obj => obj.company);
    let data_tripMiles = json.map(obj => obj.tripmiles);
    let data_tripTotal = json.map(obj => obj.triptotal);

    let colorFill_Miles = 'rgba(36,235,96,0.2)';
    let colorStroke_Miles = 'rgb(36,235,96)';
    let colorFill_Cost = 'rgba(78,235,233,0.2)';
    let colorStroke_Cost = 'rgb(78,235,233)';
    var ctx = document.getElementById('chart_averages').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Miles per Trip',
                data: data_tripMiles,
                backgroundColor: [
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                    colorFill_Miles,
                ],
                borderColor: [
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                    colorStroke_Miles,
                ],
                borderWidth: 1
            },
                {
                    label: 'Average Cost per Trip',
                    data: data_tripTotal,
                    backgroundColor: [
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                        colorFill_Cost,
                    ],
                    borderColor: [
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                        colorStroke_Cost,
                    ],
                    borderWidth: 1
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Average Trips for Top 5 Companies for 2016'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return numberWithCommas(value)
                        }
                    }
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false
                    }
                }]
            }
        }
    });

}


function renderStats_Scatter(json) {

    let datapoints = [];
    json.forEach(data => {
        obj = {x: data.sumcost.toFixed(2)};
        obj['y'] = parseFloat(data.sumtrips);
        datapoints.push(obj)
    });

    console.log(datapoints);
    let colorFill = 'rgba(5,12,12,0.2)';
    let colorStroke = 'rgb(5,12,12)';

    var ctx = document.getElementById('chart_tripcost').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: 'Scatter Plot',
            datasets: [{
                label: 'per Month',
                data: datapoints,
                backgroundColor: [
                    colorFill
                ],
                borderColor: [
                    colorStroke
                ],
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Cost Related to # of Trips'
            },
            responsive: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return numberWithCommas(value)
                        }
                    }
                }],
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {
                            return '$' + numberWithCommas(value)
                        }
                    }
                }]
            }
        }
    });

}

getStats('http://localhost:3000/stats/graphtrips').then(json => {
    renderStats_trips(json)
});

getStats('http://localhost:3000/stats/graphmiles').then(json => {
    renderStats_miles(json)
});

getStats('http://localhost:3000/stats/graphcost').then(json => {
    renderStats_cost(json)
});

getStats('http://localhost:3000/stats/graphtopcompany').then(json => {
    renderStats_topcompany(json)
});

getStats('http://localhost:3000/stats/graphaveragecostmilespercompany').then(json => {
    renderStats_averages(json)
});

getStats('http://localhost:3000/stats/graphscatternumoftripscost').then(json => {
    renderStats_Scatter(json)
});




