const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./public/utils/messages')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Setup static folder
app.use(express.static(path.join(__dirname, 'public')));

const botName = "ChatCord Bot"

// Run when client connects
io.on('connection', socket => {
    //Welcome current user
    socket.emit('message', formatMessage(botName,'Welcome to ChatCord'));

    //Broadcast when a user connects
    socket.broadcast.emit('message', formatMessage(botName,'A user joined the chat'));

    socket.on('chatMessage', msg => {
        io.emit('message', msg);
    });
     //Run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message',formatMessage(botName, 'A user has left the chat'));

    });

    //Listen for chatMessage
    socket.on('chatMessage', msg =>{
        io.emit('message' ,formatMessage('USER',msg));
    });
});

const PORT = process.env.PORT || 3000; // Thiết lập cổng
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
