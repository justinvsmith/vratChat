const { Room } = require('../models/room.models');
const { Message } = require('../models/message.models');

module.exports.createRoom = (req, res) => {
    const { name } = req.body;
    Room.create({
        name
    })
        .then(room => res.json(room))
        .catch(err => res.json(err))
}

module.exports.newMessage = (req, res) => {
    const roomId = req.params.id;
    const { user, message } = req.body;
    Message.create({
        user,
        message,
        roomId
    })
        .then(message => res.json(message))
        .catch(err => res.json(err))
}

module.exports.getRooms = (req, res) => {
    Room.find({})
        .then(rooms => res.json(rooms))
        .catch(err => res.json(err))
}

module.exports.getARoom = (req, res) => {
    Room.findById({_id: req.params.id})
        .then(room => res.json(room))
        .catch(err => res.json(err))
}

module.exports.getMessages = (req, res) => {
    Message.find({})
        .then(messages => res.json(messages))
        .catch(err => res.json(err))
}

module.exports.getMessagesInRoom = (req, res) => {
    Message.find({roomId: req.params.id})
        .then(messages => res.json(messages))
        .catch(err => res.json(err))
}

module.exports.getUsersInRoom = (req, res) => {
    Message.find({roomId: req.params.id}, {user: 1})
        .then(messages => res.json(messages))
        .catch(err => res.json(err))
}

module.exports.deleteMessages = (req, res) => {
    Message.findByIdAndDelete({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}



