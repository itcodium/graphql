var mongoose = require('mongoose'),
    Notificaciones = mongoose.model('Notificaciones')


exports.getAll = function (req, res) {
    Notificaciones.find(req.query, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
}

exports.notificaciones = function (req, res, next, id) {
    console.log("Notificaciones id: ", id)
    Notificaciones.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (!item) { return res.json({ error: "No se encontro el registro." }); }
        req.item = item;
        return next();
    })
}
exports.getById = function (req, res) {
    res.jsonp(req.item);
}
exports.create = function (req, res) {
    try {
        var item = new Notificaciones(req.body);
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
    Notificaciones.findById({ _id: req.params.id }, (err, Notificaciones) => {
        if (err) {
            return res.json({ status: "error", message: err.message });
        }
        Object.assign(Notificaciones, req.body).save((err, Notificaciones) => {
            if (err) res.send(err);
            res.json({ status: "ok", message: 'Notificaciones updated!', data: Notificaciones });
        });
    });
}
exports.delete = function (req, res) {
    Notificaciones.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ status: "ok", message: "Notificaciones successfully deleted!" });
    });
}
