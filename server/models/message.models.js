const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    user: String,
    message: String,
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    }
}, {
    timestamps: true,
});

module.exports.Message = mongoose.model("Message", MessageSchema);