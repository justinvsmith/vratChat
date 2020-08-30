const roomController = require('../controllers/room.controller');

module.exports = app => {
    app.get('/api/rooms', roomController.getRooms);
    app.get('/api/rooms/:id', roomController.getRoom);
    app.post('/api/rooms', roomController.createRoom);
    app.delete('/api/rooms/:roomidId', roomController.deleteRoom);
}