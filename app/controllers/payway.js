
var mongoose = require('mongoose');
var async = require('async')
    , Payway = mongoose.model('Payway');

exports.getAll = function (req, res) {
    Payway.find({})
        .exec(function (err, data) {
            if (err) {
                res.status(500).jsonp({ "message": err.message });
            }
            res.jsonp(
                {
                    entry: {
                        "api_version": "v1.0",
                        "authpn": "net",
                        "authpt": "5facd9d23d05bb83",
                    },
                    response: {
                        products: data
                    }
                }
            );
        });
};