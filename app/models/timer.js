
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TimerSchema = new Schema(
    {
        title: { type: String, required: true },
        project: { type: String, required: true },
        elapsed: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now },
        user_name: { type: String, required: false },
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Timer', TimerSchema, 'timer');
