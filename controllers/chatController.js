// controllers/chatController.js
const { addUserToRoom, getUserRoom } = require('../models/chatModel');

// Function to handle user matching
const matchUsers = (req, res) => {
    const { user1, user2 } = req.body;
    const roomId = `room-${user1}-${user2}`;

    addUserToRoom(user1, user2, roomId);

    res.status(200).json({ roomId, message: 'Users matched and room created' });
};

// Function to handle user joining a room
const joinRoom = (socket, userId) => {
    const roomId = getUserRoom(userId);
    if (roomId) {
        socket.join(roomId);
        console.log(`User ${userId} joined room ${roomId}`);
        socket.emit('message', { sender: 'system', message: `You have joined the chat.` });
    }
};

// Function to handle sending messages
const sendMessage = (io, userId, message) => {
    const roomId = getUserRoom(userId);
    if (roomId) {
        io.to(roomId).emit('message', { sender: userId, message });
        console.log(`Message from ${userId} to room ${roomId}: ${message}`);
    }
};

module.exports = {
    matchUsers,
    joinRoom,
    sendMessage,
};
