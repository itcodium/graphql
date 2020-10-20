
var Game = require('../../app/models/game').Game;
var Entity = require('../../app/models/game').Entity;
var GameAI = require('../../app/controllers/game');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const NOTIFICATION_CREATED_GAME = 'newGame';
const NOTIFICATION_UPDATED_GAME = 'updatedGame';

module.exports = {
    Query: {
        async getGame (root, {
            _id
        }) {
            return await Game.findById(_id).populate("player").populate("monster");
        },

        async getPlayerCards (root, {
            _id
        }) {
            var game = await Game.findById(_id).populate("player")
            console.log('game.player: ', game.player);
            return game.player.cards;

        },

        async getPlayerStatus (root, {
            _id
        }) {
            var game = await Game.findById(_id).populate("player")
            return game.player;
        },
        async getMonsterStatus (root, {
            _id
        }) {
            var game = await Game.findById(_id).populate("monster")
            return game.monster;
        },
    },
    Mutation: {
        async createGame (root, {
            input
        }) {

            var initParams = {
                name: input.name,
                hp: 10,
                shield: 10,
                turns: 12,
                cards: GameAI.getCards(),
                hands: []
            }
            var player = await Entity.create(initParams);
            initParams.name = "monster";
            var monster = await Entity.create(initParams);
            monster.cards = GameAI.getCards()
            var game = await Game.create({ player: player, monster: monster });
            pubsub.publish(NOTIFICATION_CREATED_GAME, { createdGame: game });
            return game;
        },
        // Play Turn
        async playTurn (root, {
            _id,
            input
        }) {
            var game = await Game.findById(_id).populate("player").populate("monster");
            GameAI.userPlay(game, input);
            const player = await Entity.findOne(game.player._id);
            player.overwrite(game.player);
            await player.save();

            const monster = await Entity.findOne(game.monster._id);
            monster.overwrite(game.monster);
            await monster.save();

            GameAI.monsterPlay(game);
            const player2 = await Entity.findOne(game.player._id);
            player2.overwrite(game.player);
            await player2.save();

            const monster2 = await Entity.findOne(game.monster._id);
            monster2.overwrite(game.monster);
            await monster2.save();

            pubsub.publish(NOTIFICATION_UPDATED_GAME, { playedTurn: game });
            console.log('game: ', game);
            await game.save();
            return game;

        },
    },
    Subscription: {
        createdGame: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_CREATED_GAME)
        },
        playedTurn: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_UPDATED_GAME)
        }

    },
};