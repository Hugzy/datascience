var express = require('express');
var router = express.Router();
const {Client} = require('pg');


router.get('/', function (req, res, next){
    res.sendFile(process.cwd() + '\\public\\graphsstats.html')
});


/* GET home page. */
router.get('/graphtrips', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(number_of_trips) as sum FROM trip_data GROUP by month order by month;`);
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


router.get('/graphmiles', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthName, sum(sum_trip_miles) FROM trip_data GROUP by month order by month`);
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


router.get('/graphcost', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(sum_trip_total) as sum FROM trip_data GROUP by month order by month;`);
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


router.get('/graphtopcompany', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT company, sum(number_of_trips) as totalNumberOfTrips From trip_data group by company order by totalNumberOfTrips desc limit 10`);
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

router.get('/graphaveragecostmilespercompany', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT company, avg(avg_trip_miles) as tripmiles, avg(avg_trip_total) as triptotal From trip_data group by company order by sum(number_of_trips) desc limit 5`);
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

router.get('/graphscatternumoftripscost', function (req, res, next) {

    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT month, to_char(to_timestamp (month::text, 'MM'), 'Month') as monthname, sum(number_of_trips) as sumtrips, sum(sum_trip_total) as sumcost FROM trip_data GROUP by month order by month;`);
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





module.exports = router;
