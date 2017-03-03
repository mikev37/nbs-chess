//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//

var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//


// Create application/x-www-form-urlencoded parser
var app = express();



app.get('/hello', function (req, res) {
   res.send("Hello");
});

app.get('/help', function (req, res) {
    var val = {};
    val.lerp = "OOOOO@"
   res.send(val);
});


var server = app.listen(8081, process.env.IP, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

