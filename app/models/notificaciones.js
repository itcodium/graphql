var mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var NotificaionesSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    id: {type: Number, default: 0},
    timestamp : { type :  Number, default: new Date().getTime() },
    type:Number,
    category: Number,
    category_str:String,
    inner_id: Number,
    read: Boolean
});

module.exports = mongoose.model('Notificaciones',NotificaionesSchema,'notificaciones');


 

