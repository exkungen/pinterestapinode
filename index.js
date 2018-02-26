var PDK = require('node-pinterest');
var pinterest = PDK.init('AV5nkJsfoYv0-5wgrzwCUwTpVuNHFRVJ4QjNuH5EuIIz3IBGzgAAAAA');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const parseJson = require('parse-json');




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
        // Start the app when connection is ready


    }


// pinterest.api('me').then(console.log);

    var options = {
        qs: {
            fields: "id,url,created_at,note",

            limit: 1


        }

    };
// var pins = [];
// console.log(options.qs.fields);
    pinterest.api('me/pins', options).then(function (json) {

        var stringify = JSON.stringify(json.data);
        // console.log(json);
        var parsed = JSON.parse(stringify);


//
//
        for (var i = 0; i < parsed.length; i++) {

            var array = [];

            array.push(parsed[i].url);


             var values =  '[' + '\''  +array+ '\'' + ']' +',';


            // var splice = array.splice(0 , 999 , "[","]");
              console.log(values);


            // var values = [['https://www.pinterest.com/pin/523895369145026448/'],['https://www.pinterest.com/pin/523895369145026448/']];



            var sql = "INSERT INTO test (url) VALUES =" +mysql.escape(values);
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });



        }

    });

});

// pinterest.api('me/boards', options).then(console.log);

// pinterest.api('me/pins', options).then(function(json) {
//     // console.log(json.data);
//     if (json) {
//
//         pinterest.api(json.page.next).then(function (json) {
//             var apijson =  JSON.parse(json);
//             console.log(apijson.id);
//         });
//     }
// });

// pinterest.api('me/boards').then(function(json) {
//     pinterest.api('pins', {
//         method: 'POST',
//         body: {
//             board: json.data[0].id,
//             note: 'this is a test',
//             link: 'http://gizmodo.com/amazon-prime-music-finally-gets-tunes-from-universal-mu-1733540468',
//             image_url: 'http://i.kinja-img.com/gawker-media/image/upload/s--4Vp0Ks1S--/1451895062187798055.jpg'
//         }
//     }).then(function(json) {
//         pinterest.api('me/pins').then(console.log);
//     });
// });

