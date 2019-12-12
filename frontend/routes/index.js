var express = require('express');
var router = express.Router();
const {Client} = require('pg')

/* GET home page. */
router.get('/data', function (req, res, next) {
    let table = req.query.month
    const client = new Client({
        host: '167.172.98.141',
        database: 'postgres',
        user: 'postgres',
        password: 'passw0rd',
        port: 5432
    });
    client.connect()
        .then(_ => {
            const queryRes = client.query(`SELECT pickup_latitude, pickup_longitude FROM ${table}`);
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

module.exports = router;
