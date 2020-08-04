
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let PaywaySchema = new Schema(
    {
        "name": { type: String, required: true },
        "bss-code": { type: String, required: true },
        "type": { type: String, required: true },
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Payway', PaywaySchema, 'payway');
