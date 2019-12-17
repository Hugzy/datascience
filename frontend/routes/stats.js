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


module.exports = router;
