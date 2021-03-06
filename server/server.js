const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function(socket) {
    console.log('New user connected');

    // socket.emit from Admin, text Welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
    
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', function(message) {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

// *****SERVER*****
server.listen(port, function() {
    console.log(`***** server started on ${port} *****`)
});