// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const { joinRoom, sendMessage } = require('./controllers/chatController');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware
app.use(express.json());

// Use chat routes
app.use('/api/chat', chatRoutes);

// Handle socket connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join the user to their respective room
    socket.on('joinRoom', ({ userId }) => {
        joinRoom(socket, userId);
    });

    // Listen for messages
    socket.on('sendMessage', ({ userId, message }) => {
        sendMessage(io, userId, message);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
