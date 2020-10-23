
var mongoose = require('mongoose');
var async = require('async'),
    Timers = mongoose.model('Timer');

exports.getAll = function (req, res) {
    var order = {};
    if (req.query.column) {
        try {
            var sort = req.query.dir == "+" ? "1" : "-1";
            order = JSON.parse("{\"" + req.query.column + "\":\"" + sort + "\"}");
        }
        catch (err) {
            res.status(500).jsonp({ "message": err.message });
        }
    }
    var perPage = parseInt(req.query.pagesize);
    var page = (parseInt(req.query.page) - 1) * perPage;

    Timers.find({})
        .sort(order)
        .skip(page)
        .limit(perPage)
        .exec(function (err, data) {
            Timers.countDocuments().exec(function (err, count) {
                if (err) {
                    res.status(500).jsonp({ "message": err.message });
                }
                res.jsonp(
                    {
                        response: {
                            code: 0,
                            result: { Timers: data },
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
    console.log("item: ",id)
    Timers.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (!item) { return res.json({ status: "error", errors: "No se encontro el registro." }); }
        console.log(id);
        req.item = item;
        return next();
    })
}
exports.getById = function (req, res) {
    res.jsonp(req.item);
}
exports.create = function (req, res) {
    try {
        var item = new Timers(req.body);
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
    Object.assign(req.item, req.body).save((err, item) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json([{ result: { msg: 'OK', data: item } }]);
    });
}
exports.delete = function (req, res) {
    Timers.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json({ status: "ok", message: "Timers successfully deleted!" });
    });
}
exports.start = function (req, res) {
    req.item.runningSince=req.body.start;
    req.item.save((err, item) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json([{ result: { msg: 'OK', data: item } }]);
    });
}
exports.stop = function (req, res) {
   const lastElapsed = req.body.stop - req.item.runningSince;
   req.item.elapsed= req.item.elapsed + lastElapsed,
   req.item.runningSince=null;
   req.item.save((err, item) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json([{ result: { msg: 'OK', data: item } }]);
    });
}