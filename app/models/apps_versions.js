var mongoose = require('mongoose');

var AppVersionSchema = new mongoose.Schema({
  version: Object,
  app:String
});

module.exports = mongoose.model('AppVersion',AppVersionSchema,'app_version');

 /*

{
  "iOS": {
   "actual" : "1.1",
   "estable": "1.0"
    },
  "Android": {
   "actual" : "1.1",
   "estable": "1.0"
    }
}

*/