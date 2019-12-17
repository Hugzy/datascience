var express = require('express');
var router = express.Router();
const {Client} = require('pg')

/* GET home page. */
router.get('/data', function (req, res, next) {
    let table = req.query.month
    let limiter = req.query.limit
    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT pickup_latitude, pickup_longitude FROM ${table} LIMIT ${limiter}`);
            queryRes.then(result => {
                    client.end()
                    res.json(result.rows)
                }
            );
        }).catch(reason => {
            console.log(reason);
            console.log("something went wrong, check your connection");
        }
    );
});

router.get('/cluster', function (req, res, next) {
    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT index, features, AVG(trip_total) as avg_price, AVG(cluster_data.tips) AS avg_tips, AVG(cluster_data.trip_miles) AS avg_miles, AVG(cluster_data.trip_seconds) AS avg_tripseconds FROM cluster_centroids INNER JOIN cluster_data on cluster_data.prediction = index GROUP BY features, index ORDER BY index`);
            queryRes.then(result => {
                    client.end();
                    res.json(result.rows)
                }
            );
        }).catch(reason => {
            console.log(reason);
            console.log("something went wrong, check your connection");
        }
    );
});


router.get('/cluster-points', function (req, res, next) {
    let limiter = req.query.limit;
    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT prediction, "UDF(features)" as features FROM cluster_data LIMIT ${limiter}`);
            queryRes.then(result => {
                    client.end();
                    res.json(result.rows)
                }
            );
        }).catch(reason => {
            console.log(reason);
            console.log("something went wrong, check your connection");
        }
    );
});

router.get('/clustersite', function (req, res, next) {
    res.sendFile(process.cwd() + '\\public\\cluster.html')
});

function routeCluster() {
    window.location.pathname = '/clustersite';
}

function routeCharts() {
    window.location.pathname = '/stats';
}

function routeHeatMap() {
    window.location.pathname = '/';
}

module.exports = router;
