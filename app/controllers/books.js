
var mongoose = require('mongoose');
var async = require('async')
    , Books = mongoose.model('Book')



exports.getAll = function (req, res) {
    Books.find(req.query, function (err, items) {
        if (err) {
            return res.send({ status: "error", errors: err.message });
        }
        res.json(items);
    });
}

exports.item = function (req, res, next, id) {
    console.log("Books id: ", id)
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
                return res.send({ status: "error", errors: err.message });
            }
            res.json({ status: "ok", message: "Book successfully added!", book });
        });
    }
    catch (err) {
        return res.send({ status: "error", errors: err.message });
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
