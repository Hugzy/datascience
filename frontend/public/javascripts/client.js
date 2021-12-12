
var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'sk.eyJ1IjoiZGFqb2gxNiIsImEiOiJjazI5NWliY3kyM3I0M25tcXllM3ZkOXkwIn0.NyYRoNcUU31ngCp0U1DvbQ'
});

var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 0.009,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'pickup_latitude',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'pickup_longitude',
    // which field name in your data represents the data value - default "value"
    valueField: 'value'
};

var heatmapLayer = new HeatmapOverlay(cfg);

var map = new L.Map('mapid', {
    center: new L.LatLng(41.881832, -87.623177),
    zoom: 10,
    layers: [baseLayer, heatmapLayer]
});

function makeHeatmap() {

    let selector = document.getElementById("heatmapMonthSelector");
    let limiter = document.getElementById("limiter");

    console.log(selector.value);
    console.log(limiter.value);
    fetch(`http://localhost:3000/data?month=${selector.value}&limit=${limiter.value}`).then(response => {
        response.json().then( result =>
            {
                heatmapLayer.setData({
                    max: 1000,
                    data: result
                });
            }
        )
    })
}

// don't forget to include leaflet-heatmap.js
var testData = {
    max: 8,
    data: []
};


