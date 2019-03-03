var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NotificationSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    id: { type: Number, default: 0 },
    timestamp: { type: Number, default: new Date().getTime() },
    type: Number,
    category: String,
    category_str: String,
    inner_id: String,
    read: Boolean
});

module.exports = mongoose.model('Notification', NotificationSchema, 'Notification');
