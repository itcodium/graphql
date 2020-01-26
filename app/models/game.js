let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var ObjectIdSchema = Schema.ObjectId;
var ObjectId = mongoose.Types.ObjectId;


var cardSchema = new Schema({
    name: {
        type: String,
        enum: ['Heal', 'Damage', 'Shield', 'Horror']
    },
    value: {
        type: Number,
        required: true,
        min: 0, max: 1
    }
});
/*
var EntityTypeSchema = new mongoose.Schema({
    type: String,
    controller: String,
    created: { type: Date, default: Date.now }
});*/

let EntitySchema = new Schema({
    name: { type: String, required: true, unique: false },
    hp: { type: Number, required: true, default: 12 },
    shield: { type: Number, required: true, min: 0, default: 12 },
    turns: { type: Number, required: true, min: 0, max: 12, default: 12 },
    createdAt: { type: Date, default: Date.now },
    cards: [String],
    hands: [String],
});

let GameSchema = new mongoose.Schema({
    player: { type: Schema.Types.ObjectId, ref: 'Entity' },
    monster: { type: Schema.Types.ObjectId, ref: 'Entity' },
});


module.exports = {
    Card: mongoose.model('Card', GameSchema, 'card'),
    Entity: mongoose.model('Entity', EntitySchema, 'entity'),
    Game: mongoose.model('Game', GameSchema, 'game')
};