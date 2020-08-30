const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "Please make a name of at least 3 characters"]
    }
});

module.exports.Room = mongoose.model('Room', RoomSchema);