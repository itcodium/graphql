var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UsuarioSchema = new mongoose.Schema({
  "id":  {type: Number, default: 0},
  "id_str": String,
  "phone_number": String,
  "nombre":String,
  "apellido":String,  
  "fecha_nacimiento":String, 
  "sexo": String  // M o F
});

UsuarioSchema.plugin(passportLocalMongoose);



module.exports = mongoose.model('Usuario',UsuarioSchema,'usuario');



