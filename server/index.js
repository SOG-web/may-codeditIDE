const express = require('express');
const socketio = require('socket.io');
// const cors = require('cors');

const { createRoom, addUser, removeUser, getUser, getRoomUsers } = require('./controllers/UsersController');

const app = express();
const http = require('http');
const server = http.createServer(app);

const io = socketio(server, 
    { 
    cors: {    
      origin: "*",    
      methods: ["GET", "POST"]  
    }});

// app.use(cors());

//This is used for incoming socket connections
io.on('connect', (socket) => {
    socket.on('create', ({name, room}, callback) => {
        const { error, user } = createRoom({ id: socket.id, name, room});
        if(error) {
            return callback(error);
        }

        socket.join(user.room);
        //notify users/joiners of room creator/original owner of session(admin)
        socket.emit('notification', { user: 'admin', text: `Admin ${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('notification', { user: 'admin', text: `${user.name} has joined!`});
        //emit room data and let chat component receive the users (data)
        io.to(user.room).emit('roomData', { room: user.room, users: getRoomUsers(user.room) });

        callback();
    });

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room});
        if(error) {
            return callback(error);
        }
        
        socket.join(user.room);

        socket.emit('notification', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('notification', { user: 'admin', text: `${user.name} has joined!`});

        io.to(user.room).emit('roomData', { room: user.room, users: getRoomUsers(user.room) });

        callback();
    });

    //we are getting the user using the getUser function which is in the controller, then we are emiting codeMessage with our username and message
    socket.on('sendCode', (message) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('codeMessage', { user: user.name, text: message });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('notification', { user: 'Admin', text: `${user.name} has left the room.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getRoomUsers(user.room) });
        }
    });
}); 


server.listen(process.env.PORT || 5000, () => console.log('Server has started.'));