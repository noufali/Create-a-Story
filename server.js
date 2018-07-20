// server intialization with express
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// twilio helper library 
var twilio = require('twilio');
var number; 
var text; 
// socket
var io = require('socket.io')(server);
 
// Find your account sid and auth token in your Twilio account Console.
var client = new twilio('XXX', 'XXX');

io.sockets.on('connection', function(socket) {
  // socket sends hello to client 
  io.emit('nouf', "hellooooooo");
  // socket receives message from client to text 
  socket.on('text', function(data) {
  	console.log(data); 
  	text = data;
  });
  // socket receives phone number from client to text 
  socket.on('phone', function(number) {
    console.log("send to: " + number);
    // texts message to number with twilio account
    client.messages.create({
	  to: '+1' + number,
	  from: '+12403187370',
	  body: text
	});
    console.log("message sent");
  });
});

// server listening on port 8000
server.listen(8000, function () {
  console.log('Server listening on port 8000!')
})
// express server accessing public folder for other files
app.use(express.static('public'));
