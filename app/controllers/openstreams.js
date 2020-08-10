
var mongoose = require('mongoose');
var async = require('async'),
    OpenStreams = mongoose.model('OpenStreams');

exports.getAll = function (req, res) {
    var order = {};
    if (req.query.column) {
        try {
            order = req.query.dir + req.query.column;
        }
        catch (err) {
            res.status(500).jsonp({ "message": err.message });
        }
    }
    var perPage = parseInt(req.query.pagesize);
    var page = (parseInt(req.query.page) - 1) * perPage;

    OpenStreams.find({})
        .sort(order)
        .skip(page)
        .limit(perPage)
        .exec(function (err, data) {
            OpenStreams.countDocuments().exec(function (err, count) {
                if (err) {
                    res.status(500).jsonp({ "message": err.message });
                }
                res.jsonp(
                    {
                        response: {
                            code: 0,
                            result: { openstreams: data },
                            current: page,
                            recordsTotal: count,
                            recordsFiltered: count
                        }
                    }
                );
            })
        })
};

exports.item = function (req, res, next, id) {
    console.log("OpenStreams id: ", id)
    OpenStreams.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (!item) { return res.json({ status: "error", errors: "No se encontro el registro." }); }
        req.item = item;
        return next();
    })
}
exports.getById = function (req, res) {
    res.jsonp(req.item);
}
exports.create = function (req, res) {
    try {
        var item = new OpenStreams(req.body);
        item.save(function (err, item) {
            if (err) {
                return res.send({ status: "error", errors: err.message });
            }
            res.json([{ result: { msg: 'OK', data: item } }]);
        });
    }
    catch (err) {
        return res.send({ status: "error", errors: err.message });
    }
}
exports.update = function (req, res) {
    OpenStreams.findById({ _id: req.params.id }, (err, item) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        Object.assign(item, req.body).save((err, item) => {
            if (err) {
                return res.send({ status: "error", errors: err.message });
            }
            res.json([{ result: { msg: 'OK', data: item } }]);
        });
    });

}
exports.delete = function (req, res) {
    OpenStreams.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json({ status: "ok", message: "OpenStreams successfully deleted!" });
    });
}
