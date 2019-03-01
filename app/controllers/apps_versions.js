var mongoose = require('mongoose')
    , async = require('async')
    , AppVersion = mongoose.model('AppVersion')

exports.create = function (req, res) {
    var data = new AppVersion(req.body)
        data.save(function(err, data) {
        if(err ) {
            throw err
        } else {
            res.json(data);
        }
}

/*
exports.show = function(req, res){
    console.log("exports.show: ",req.sugar);
    res.jsonp(req.sugar);
}

exports.all = function(req, res){
    Sugar.find(function(err, items) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(items);
        }
    });
}

exports.sugar = function(req, res, next, id){
    var Sugar = mongoose.model('Sugar')
    var query = Sugar.findById(id);
    query.exec(function (err, item){
        if (err) { return next(err); }
        if (!item) { return next(new Error("can't find item")); }
        req.sugar = item;   // posible error
        return next();
    });
}

exports.update = function(req, res){
    var sugar = req.sugar
    sugar = _.extend(sugar, req.body)
    sugar.save(function(err) {
        res.jsonp(sugar)
    })
}

exports.destroy = function(req, res){
    var sugar = req.sugar
    sugar.remove(function(err){
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(1);
        }
    })
}
*/