var mongoose = require('mongoose');

var BackPocSchema = new mongoose.Schema({
   id: {type: Number, default: 0},
   tipo: String,
   nombre: String,
   direccion: String,
   localidad: String,
   provincia:  String,
   capacidad1:  String,
   capacidad2:  String,
   capacidad3:  String,
   capacidad4:  String,
   capacidad5:  String,
   latitud:  String,
   longitud:  String,
   atencion:  String,
   maplink:  String,
   maplink2:  String,
   direccion_completa:  String,
   FIELD18: {type: Number, default: 0},
});

module.exports = mongoose.model('Backpoc',BackPocSchema,'backpoc');



