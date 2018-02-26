//Copyright menouer nobach -  www.menouernobach.nl
var PDK = require('node-pinterest');
var pinterest = PDK.init('');
var mysql = require('mysql');
var moment = require('moment');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '23136_database',
    port: 3307
});


connection.connect(function(err) {
    if (err)
        throw err;
    else {
        console.log('Connected to MySQL');



    }




    var options = {
        qs: {
            fields: "id,url,created_at,note",
            limit: 100


        }

    };

    pinterest.api('me/pins', options).then(function (json) {
        console.log("Requesting api call");
        console.log("API call succesfully made");
        var stringify = JSON.stringify(json.data);
        var parsed = JSON.parse(stringify);



        for (var i = 0; i < parsed.length; i++) {

            console.log("Querying data into database");
            var time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            var data = [
                [0,parsed[i].id,parsed[i].url,parsed[i].note,parsed[i].created_at,'0','Pinterest',time]
            ];

                    var sql = "INSERT INTO stats_socials (ss_m_id,ss_id_soc,ss_postlink,ss_text,ss_date,ss_aantal,ss_type,ss_last_update) VALUES ? ON DUPLICATE KEY UPDATE ss_id_soc=ss_id_soc";
                    connection.query(sql, [data], function (err, result) {
                        if (err) throw err;
                        console.log(result);
                    });




        }

    });

});


