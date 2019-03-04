
var Notifications = require('../../app/models/notifications');
module.exports = {
    Query: {
        async getNotification (root, {
            _id
        }) {
            return await Notifications.findById(_id);
        },
        async allNotifications () {
            return await Notifications.find();
        }
    },
    Mutation: {
        async createNotification (root, {
            input
        }) {
            return await Notifications.create(input);
        },
        async updateNotification (root, {
            _id,
            input
        }) {
            return await Notifications.findOneAndUpdate({
                _id
            }, input, {
                    new: true
                })
        },
        async deleteNotification (root, {
            _id
        }) {
            return await Notifications.findOneAndRemove({
                _id
            });
        }
    }
};
