var PDK = require('node-pinterest');
var pinterest = PDK.init('');
var mysql = require('mysql');




var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: '23136_database'
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
            var sql = "INSERT INTO test (url) VALUES (?)";
            connection.query(sql, parsed[i].url,  function (err, result ){
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            })



        }

    });

});



