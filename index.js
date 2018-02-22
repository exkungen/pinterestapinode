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


//Establish MySQL connection
connection.connect(function(err) {
    if (err)
        throw err;
    else {
        console.log('Connected to MySQL');
        // Start the app when connection is ready

        console.log('Server listening on port 3000');
    }
});

// pinterest.api('me').then(console.log);

var options = {
    qs: {
        fields: "id,url,created_at,note",

        limit: 100


    }

};
// var pins = [];
// console.log(options.qs.fields);
pinterest.api('me/pins', options).then(function (json) {

    var stringify = JSON.stringify(json);
    var parsed = JSON.parse(stringify);

     var array = [];

     array.push(parsed);
     console.log(parsed);
//
//
//     for(var i=0; i < parsed.length; i++)
//         array.push([stringify[i].id,stringify[i].url,stringify[i].created_at,stringify[i].note])
// console.log(array)
    // var myArr = JSON.parse(json);
 // console.log(myArr[1]);

    // console.log(stringify);
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
//             board: json.data[0].id, // grab the first board from the previous response
//             note: 'this is a test',
//             link: 'http://gizmodo.com/amazon-prime-music-finally-gets-tunes-from-universal-mu-1733540468',
//             image_url: 'http://i.kinja-img.com/gawker-media/image/upload/s--4Vp0Ks1S--/1451895062187798055.jpg'
//         }
//     }).then(function(json) {
//         pinterest.api('me/pins').then(console.log);
//     });
// });

