var mongoose = require('mongoose'),
    Message = mongoose.model('Message')

exports.getAll = function (req, res) {
    Message.find(req.query, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
}

exports.item = function (req, res, next, id) {
    Message.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (!item) { return res.json({ status: "error", error: "No se encontro el registro." }); }
        req.item = item;
        return next();
    })
}
exports.getById = function (req, res) {
    res.jsonp(req.item);
}
exports.create = function (req, res) {
    try {
        var item = new Message(req.body);
        item.save(function (err, post) {
            if (err) {
                return res.json({ status: "error", message: err.message });
            }
            res.json(post);
        });
    }
    catch (err) {
        return res.json({ status: "error", message: err.message });
    }
}
exports.update = function (req, res) {
    Message.findById({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.json({ status: "error", message: err.message });
        }
        Object.assign(item, req.body).save((err, item) => {
            if (err) res.send(err);
            res.json({ status: "ok", message: 'Message updated!', data: item });
        });
    });
}
exports.delete = function (req, res) {
    Message.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ status: "ok", message: "Message successfully deleted!" });
    });
}
