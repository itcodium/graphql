
var Message = require('../../app/models/message');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newMessage';


module.exports = {
    Query: {
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
        async createMessage (root, {
            input
        }) {
            var message = await Message.create(input);
            pubsub.publish(NOTIFICATION_SUBSCRIPTION_TOPIC, { message });
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
        newMessage: {
            subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC)
        }
    },
};
