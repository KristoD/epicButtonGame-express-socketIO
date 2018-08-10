var express = require('express');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
var count = 0;


app.get('/', function(req, res) {
    res.render('index');
});

var server = app.listen(8000, function() {
    console.log("Server running on port 8000...");
})
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
    console.log("Client/socket connected to server");
    socket.emit("count", {response: count});
    socket.on('count_button', function(data) {
        count++;
        io.emit('count_response', {response: count});
        console.log(count)
    });
    socket.on('reset_button', function(data) {
        count = 0;
        io.emit('count_response', {response: count});
    })

});