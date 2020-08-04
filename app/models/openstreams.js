
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//book schema definition
let OpenStreamsSchema = new Schema(
    {
        bss_code: { type: String, required: true },
        start_date: { type: Number },
        end_date: { type: Number },
        operator_id: { type: Number },
        status: { type: Number },
        image_url: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        group_id: { type: String, required: true },
        liveref: { type: String, required: true },
        node_name: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        user_name: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

OpenStreamsSchema.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

module.exports = mongoose.model('OpenStreams', OpenStreamsSchema, 'openstreams');
