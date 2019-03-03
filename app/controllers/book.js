
var mongoose = require('mongoose');
var async = require('async')
    , Book = mongoose.model('Book')



exports.getAll = function (req, res) {
    Book.find(req.query, function (err, items) {
        if (err) return next(err);
        res.json(items);
    });
}

exports.book = function (req, res, next, id) {
    console.log("Book id: ", id)
    Book.findById(id, function (err, item) {
        console.log("item: ", item)
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
        var item = new Book(req.body);
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
    Book.findById({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.json({ status: "error", message: err.message });
        }
        Object.assign(book, req.body).save((err, book) => {
            if (err) res.send(err);
            res.json({ status: "ok", message: 'Book updated!', data: book });
        });
    });
}
exports.delete = function (req, res) {
    Book.remove({ _id: req.params.id }, (err, result) => {
        if (err) {
            return res.json({ error: err.message });
        }
        res.json({ status: "ok", message: "Book successfully deleted!" });
    });
}
