const ChatController = require('../controllers/chat.controller');

module.exports = app => {
    app.post('/api/rooms', ChatController.createRoom);
    app.post('/api/rooms/:id', ChatController.newMessage);
    app.get('/api/rooms/:id', ChatController.getARoom);
    app.get('/api/rooms', ChatController.getRooms);
    app.get('/api/messages', ChatController.getMessages);
    app.delete('/api/messages/:id', ChatController.deleteMessages);
    app.get('/api/rooms/:id/messages', ChatController.getMessagesInRoom);
    app.get('/api/rooms/:id/users', ChatController.getUsersInRoom);
}