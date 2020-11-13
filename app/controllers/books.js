
var mongoose = require('mongoose');
var async = require('async')
    , Books = mongoose.model('Book')


exports.getAll = function (req, res) {
    try {
        var order = {};
        if (req.query.column) {
            var sort = req.query.order == "1" ? "1" : "-1";
            order = JSON.parse("{\"" + req.query.column + "\":\"" + sort + "\"}");
        }
        var perPage = parseInt(req.query.pagesize);
        var page = (parseInt(req.query.page) - 1) * perPage;

        Books.find({})
            .sort(order)
            .skip(page)
            .limit(perPage)
            .exec(function (err, data) {
                Books.countDocuments().exec(function (err, count) {
                    if (err) {
                        return res.status(400).jsonp({ error: err.message });
                    }
                    res.jsonp({
                        result: data,
                        current: page,
                        recordsTotal: count,
                        recordsFiltered: count
                    });
                })
            })
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.item = function (req, res, next, id) {
    Books.findById(id, function (err, item) {
        if (err) { return next(err); }
        if (!item) { return res.status(400).json({ error: "No se encontro el registro." }); }
        req.item = item;
        return next();
    })

}
exports.getById = function (req, res) {
    try {
        res.jsonp(req.item);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
exports.create = function (req, res) {
    try {
        var item = new Books(req.body);
        item.save(function (err, book) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.jsonp({ book });
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
exports.update = function (req, res) {
    try {
        Object.assign(req.item, req.body).save((err, item) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }
            res.json({ message: 'Book updated!', book });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
exports.delete = function (req, res) {
    try {
        Books.remove({ _id: req.params.id }, (err, result) => {
            if (err) {
                return res.status(400).send({ error: err.message });
            }
            res.json({ message: "Books successfully deleted!" });
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
