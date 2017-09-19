var express = require('express');
var app = express();
var twilio = require('twilio');
var number; 
var text; 

var server = require('http').createServer(app);
var io = require('socket.io')(server);
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('XXX', 'XXX');

io.sockets.on('connection', function(socket) {
  //console.log("Socket connected");
  io.emit('nouf', "hellooooooo");

  socket.on('text', function(data) {
  	console.log(data); 
  	text = data;

  });

  socket.on('message', function(msg) {
    console.log("message receieved: " + msg);

    client.messages.create({
	  to: '+1' + msg,
	  from: '+12403187370',
	  body: text
	});
    socket.emit('message', "Hi!!!");
    console.log("message sent");
  });
});

//anonymous function
server.listen(8000, function () {
  console.log('Server listening on port 8000!')
})

app.use(express.static('public'));
