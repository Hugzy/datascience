const fs = require('fs');


function convertJsonToSparkJson(filename, toInt ) {
    let arr = [];
    fs.readFile('./' + filename + '.json', (err, data) => {
        if (err) throw err;
        let jsondata = JSON.parse(data);

        for (let id in jsondata[filename]) {
            let value = jsondata[filename][id];
            var obj = {id: parseInt(id)};
            if (toInt) {
                obj[filename] = parseFloat(value);
            } else {
                obj[filename] = value;
            }
            arr.push(obj)
        }
        let stringifiedData = JSON.stringify(arr, null, 2);

        fs.writeFile('1-' + filename + '.json', stringifiedData, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    });

}

for (let filename of ["dropOff_latitude", "dropOff_longitude","pickup_latitude","pickup_longitude"]){
    convertJsonToSparkJson(filename, true)
}

for (let filename of ["company", "pickup_census_tract","dropoff_census_tract", "taxi_id"]){
    convertJsonToSparkJson(filename, false)
}



