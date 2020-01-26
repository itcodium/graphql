
var Message = require('../../app/models/message');
var Game = require('../../app/models/game').Game;
var Entity = require('../../app/models/game').Entity;
var GameAI = require('../../app/controllers/game');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newMessage';
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

        async getMessage (root, {
            _id
        }) {
            return await Message.findById(_id);
        },
        async allMessage () {
            return await Message.find();
        }
    },
    Mutation: {
        // Game
        async createGame (root, {
            input
        }) {

            var initParams = {
                name: input.name,
                hp: 12,
                shield: 12,
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
            var cards = GameAI.Game;
            console.log('[cards]', GameAI.cards);
            //console.log('cards 1: ', GameAI.getCards());
            //console.log('cards 2: ', GameAI.getCards());

            console.log('input (playTurn):', input);
            var game = await Game.findById(_id).populate("player").populate("monster");
            GameAI.userPlay(game, input)

            /*var game = await Game.findOneAndUpdate({
                _id
            }, input, {
                    new: true
                });
                */

            // pubsub.publish(NOTIFICATION_UPDATED_GAME, { updatedGame: game });

            return game;
        },

        async createMessage (root, {
            input
        }) {
            var message = await Message.create(input);
            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { createdMessage: message });
            return message;

        },
        async updateMessage (root, {
            _id,
            input
        }) {
            return await Message.findOneAndUpdate({
                _id
            }, input, {
                    new: true
                })
        },
        async deleteMessage (root, {
            _id
        }) {
            return await Message.findOneAndDelete({
                _id
            });
        }
    },
    Subscription: {
        createdMessage: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC)
        },
        // Game
        createdGame: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_CREATED_GAME)
        },
        playedTurn: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_CREATED_GAME)
        }

    },
};
