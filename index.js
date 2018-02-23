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
            limit: 100


        }

    };

    pinterest.api('me/pins', options).then(function (json) {

        var stringify = JSON.stringify(json.data);
        var parsed = JSON.parse(stringify);



        for (var i = 0; i < parsed.length; i++) {

            var sql = "INSERT INTO test (url) VALUES (?)";
            connection.query(sql, parsed[i].url,  function (err, result ){
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            })



        }

    });

});



