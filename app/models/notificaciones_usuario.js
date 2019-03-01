var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var NotificaionesUsuarioSchema = new mongoose.Schema({
    notification: { type: Schema.Types.ObjectId, ref: 'Notificaciones'},
    id_str:String
    
});

module.exports = mongoose.model('NotificacionesUsuarios',NotificaionesUsuarioSchema,'notificaciones_usuarios');


 
