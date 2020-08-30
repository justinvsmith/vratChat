const { Room } = require('../models/room.models');

module.exports.getRooms = (req, res) => {
    Room.find({})
        .then(room => res.json(room))
        .catch(err => res.json(err))
}

module.exports.createRoom = (req, res) => {
    const { name } = req.body
    Room.create({
        name
    })
        .then(room => res.json(room))
        .catch(err => res.json(err));
}

module.exports.getRoom = (req, res) => {
    Room.findById({_id: req.params.id})
        .then(room => res.json(room))
        .catch(err => res.json(err))
}

module.exports.deleteRoom = (req, res) => {
    Room.findByIdAndDelete({_id: req.params.id})
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
}