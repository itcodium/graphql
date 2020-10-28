
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let BookSchema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        email: { type: String, required: true },
        year: { type: Number, required: false },
        pages: { type: Number, required: false, min: 1, default:1 },
        createdAt: { type: Date, default: Date.now },
    },
    {
        versionKey: false
    }
);

// Sets the createdAt parameter equal to the current time
BookSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

//Exports the BookSchema for use elsewhere.

module.exports = mongoose.model('Book', BookSchema, 'book');
