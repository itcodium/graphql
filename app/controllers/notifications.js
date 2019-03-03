var mongoose = require('mongoose'),
    Notifications = mongoose.model('Notification')

exports.getAll = function (req, res) {
    Notifications.find(req.query, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
}

exports.item = function (req, res, next, id) {
    Notifications.findById(id, function (err, item) {
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
        var item = new Notifications(req.body);
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
    Notifications.findById({ _id: req.params.id }, (err, Notifications) => {
        if (err) {
            return res.json({ status: "error", message: err.message });
        }
        Object.assign(Notifications, req.body).save((err, Notifications) => {
            if (err) res.send(err);
            res.json({ status: "ok", message: 'Notifications updated!', data: Notifications });
        });
    });
}
exports.delete = function (req, res) {
    Notifications.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ status: "ok", message: "Notifications successfully deleted!" });
    });
}
