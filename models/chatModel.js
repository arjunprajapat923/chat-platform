// models/chatModel.js
const users = new Map(); // key: userId, value: roomId

const addUserToRoom = (user1, user2, roomId) => {
    users.set(user1, roomId);
    users.set(user2, roomId);
};

const getUserRoom = (userId) => {
    return users.get(userId);
};

module.exports = {
    addUserToRoom,
    getUserRoom,
};
