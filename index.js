var PDK = require('node-pinterest');
var pinterest = PDK.init('AV5nkJsfoYv0-5wgrzwCUwTpVuNHFRVJ4QjNuH5EuIIz3IBGzgAAAAA');
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
            limit: 5


        }

    };

    pinterest.api('me/pins', options).then(function (json) {
         console.log("Requesting api call");
         console.log("API call succesfully made");
        var stringify = JSON.stringify(json.data);
        var parsed = JSON.parse(stringify);



        for (var i = 0; i < parsed.length; i++) {
          console.log("Querying data into database");
          var data = [
              [parsed[i].url,parsed[i].id]
          ];
            var sql = "INSERT INTO test (url,ss_id) VALUES ?";
            connection.query(sql, [data],  function (err, result,fields ){
                if (err) throw err;
                console.log(result);
            })



        }

    });

});



