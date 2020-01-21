
var flash = require('connect-flash')
    , helpers = require('view-helpers')
var path = require('path');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
var compress = require('compression')
var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');

module.exports = function (app, express, config, passport) {

    var port = normalizePort(process.env.PORT || '4000');
    app.set('port', port);
    function normalizePort (val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
        return false;
    }

    app.set('showStackError', true)
    app.use(compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }))

    app.set('views', path.join(config.root, 'views'));
    app.set('view engine', 'ejs');

    var sessionOpts = {
        saveUninitialized: true, // saved new sessions
        resave: false,           // do not automatically write to the session store
        store: store,
        secret: 'This is a secret yeah!!',
        cookie: { httpOnly: true, maxAge: 1000 * 60 }
        // configure when sessions expires 1000 * 60 * 60 * 24 * 7
    }

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser(sessionOpts.secret));
    app.use(require('express-session')(sessionOpts));
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    /* Static Files */
    app.use(express.static(path.join(config.root, 'public')));
    app.enable("jsonp callback")
    app.use(helpers(config.app.name))
    app.use(methodOverride())
    app.use(logger('dev'));

    // Session init -------------------------------------------

    var MongoDBStore = require('connect-mongodb-session')(session);
    var store = new MongoDBStore({
        uri: config.db,
        collection: 'app_sessions'
    });
    store.on('error', function (error) {
        assert.ifError(error);
        assert.ok(false);
    });

    // Session End -------------------------------------------

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

    console.log("1. Listen Port: ", port);
    console.log("2. APP_ROOT", config.root)
    console.log("3. config.db", config.db)
}
