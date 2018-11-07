const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    player1: mongoose.Schema.Types.ObjectId, 
    player2: mongoose.Schema.Types.ObjectId,
    moveList: [{
        moveCount: Number,
        from: String, 
        to: String
    }]
});

module.exports = mongoose.model('Game', gameSchema);