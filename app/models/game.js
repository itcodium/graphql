let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var cardSchema = new Schema({
    name: {
        type: String,
        enum: ['heal', 'damage', 'shield', 'horror']
    },
    value: {
        type: Number,
        required: true,
        min: 0, max: 1
    }
});

let EntitySchema = new Schema({
    name: { type: String, required: true, enum: ['player', 'monster'] },
    hp: { type: Number, required: true },
    shield: { type: Number, required: true, min: 0 },
    turns: { type: Number, required: true, min: 0, max: 12 },
    createdAt: { type: Date, default: Date.now },
    cards: [cardSchema]
});

let GameSchema = new mongoose.Schema({
    player: EntitySchema,
    monster: EntitySchema,
});


module.exports = mongoose.model('Card', cardSchema, 'card');
module.exports = mongoose.model('Entity', EntitySchema, 'entity');
module.exports = mongoose.model('Game', GameSchema, 'game');
