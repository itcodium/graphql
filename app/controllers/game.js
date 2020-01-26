var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Card = mongoose.model('Card'),
    Entity = mongoose.model('Entity')

exports.getAll = function (req, res) {


}

var gameCards = [{ name: 'Heal', value: 1 },
{ name: 'Damage', value: 1 },
{ name: 'Shield', value: 1 },
{ name: 'Horror', value: 0 }]


exports.cards = gameCards;
exports.getCards = function () {
    randomizeInteger = function (min, max) {
        if (max == null) {
            max = (min == null ? Number.MAX_SAFE_INTEGER : min);
            min = 0;
        }

        min = Math.ceil(min);  // inclusive min
        max = Math.floor(max); // exclusive max

        if (min > max - 1) {
            throw new Error("Incorrect arguments.");
        }

        return min + Math.floor((max - min) * Math.random());
    }


    var cards = [];
    for (var i = 0; i < 4; i++) {
        cards.push(gameCards[randomizeInteger(1, 5) - 1].name)
    }
    return cards;
}

exports.userPlay = function (game, card) {
    console.log('Card: ', card);
    console.log('game: ', game.player);
}

exports.monsterPlay = function (game) {

}