
var mongoose = require('mongoose');
var async = require('async')
    , Books = mongoose.model('Book')


exports.getAll = function (req, res) {
    var order = {};
    if (req.query.column) {
        try {
            var sort = req.query.order == "1" ? "1" : "-1";
            order = JSON.parse("{\"" + req.query.column + "\":\"" + sort + "\"}");
        }
        catch (err) {
            res.status(500).jsonp({ "message": err.message });
        }
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
                    res.status(500).jsonp({ error: err.message });
                }
                res.jsonp(
                    {
                        response: {
                            code: 0,
                            result: data,
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
    Books.findById(id, function (err, item) {
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
        var item = new Books(req.body);
        item.save(function (err, book) {
            if (err) {
                return res.status(500).json({success: false, error: err.message});
            }
            res.json({ status: "ok", message: "Book successfully added!", book });
        });
    }
    catch (err) {
        return res.status(500).json({success: false, error: err.message});
    }
}
exports.update = function (req, res) {
    Books.findById({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        Object.assign(book, req.body).save((err, book) => {
            if (err) {
                return res.send({ status: "error", errors: err.message });
            }
            res.json({ message: 'Book updated!', book });
        });
    });

}
exports.delete = function (req, res) {
    Books.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json({ status: "ok", message: "Books successfully deleted!" });
    });
}
