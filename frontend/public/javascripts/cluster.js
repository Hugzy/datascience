var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoiZGFqb2gxNiIsImEiOiJjazI5NWliY3kyM3I0M25tcXllM3ZkOXkwIn0.NyYRoNcUU31ngCp0U1DvbQ'
});
var map = new L.Map('mapid', {
    center: new L.LatLng(41.881832, -87.623177),
    zoom: 10,
    layers: [baseLayer]
});

let centroidColor = {
    0: "#FF0000",
    1: "#FF00BB",
    2: "#1000FF",
    3: "#00F1FF",
    4: "#2BFF00",
    5: "#FFF300",
    6: "#FF9D00",
    7: "#000000",
    8: "#66FF9D",
    9: "#A85757",
    10: "#6F78A8",
    11: "#1E7E00"

}

function makeCluster() {
    let limiter = document.getElementById("limiter");

    fetch(`http://localhost:3000/cluster`).then(response => {
        response.json().then(results => {
                let latLongs = [];
                for (let result of results) {
                    latLongs.push(result.features);
                    L.circle(result.features, {radius: 300, color: centroidColor[`${result.index}`]}).addTo(map).bindTooltip(`Cluster Number: ${result.index} <br> Avg Tips: $${result.avg_tips.toFixed(2)} <br> Avg Price: $${result.avg_price.toFixed(2)} <br> Avg Miles: ${result.avg_miles.toFixed(2)} <br> Avg Seconds: ${parseFloat(result.avg_tripseconds).toFixed(2)} `, {permanent: false, direction: 'auto'});
                }
                map.fitBounds(latLongs);
            }
        ).catch(err => console.log(err))
    })


}

function makeClusterPoints() {
    let limiter = document.getElementById("limiter");

    fetch(`http://localhost:3000/cluster-points?limit=${limiter.value}`).then(response => {
        response.json().then(results => {
                for (let result of results) {
                    circle = L.circle(result.features, {radius: 50, color: centroidColor[`${result.prediction}`]}).addTo(map);

                }
            }
        ).then(_ => {
            console.log("done");
        }).catch(err => console.log(err))
    })


}


