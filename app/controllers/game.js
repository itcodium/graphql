var mongoose = require('mongoose'),
    Game = mongoose.model('Game'),
    Card = mongoose.model('Card'),
    Entity = mongoose.model('Entity')

exports.getAll = function (req, res) {


}

var gameCards = [
    { name: 'Heal', value: 1 },
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

    game.player.turns = game.player.turns - 1
    if (game.monsterEffect == "Horror") {
        game.monsterEffect = null;
        return;
    }

    if (!game.player.cards.length) {
        return;
    }
    var index = game.player.cards.findIndex(function (lCard) {
        return lCard === card
    });
    game.player.cards.splice(index, 1);
    game.player.hands.push(card);

    if (card == "Heal") {
        game.player.hp = game.player.hp + 1;
    }
    if (card == "Shield") {
        game.player.shield = game.player.shield + 1;
    }
    if (card == "Horror") {
        game.monsterEffect == "Horror";
    }
    if (card == "Damage") {
        if (game.monster.hp) {
            game.monster.hp = game.monster.hp - 1;
        } else {
            game.monster.shield = game.monster.shield - 1;
        }

    }

    return game;
}

exports.monsterPlay = function (game) {
    console.log('game: ', game);
    game.monster.turns = game.monster.turns - 1

    if (game.monsterEffect == "Horror") {
        game.moster.turns = game.moster.turns - 1;
        game.monsterEffect = null;
        return;
    }

    var card = game.monster.cards.pop();
    game.monster.hands.push(card);

    if (card == "Heal") {
        game.monster.hp = game.monster.hp + 1;
    }
    if (card == "Shield") {
        game.monster.shield = game.monster.shield + 1;
    }
    if (card == "Damage") {
        if (game.player.hp) {
            game.player.hp = game.player.hp - 1;
        } else {
            game.player.shield = game.player.shield - 1;
        }

    }
    if (card == "Horror") {
        game.monsterEffect = card;
        game.player.turns = game.player.turns - 1;
    }

    return game;
}