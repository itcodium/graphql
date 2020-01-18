
var express = require('express')
    , flash = require('connect-flash')
    , helpers = require('view-helpers')
var favicon = require('serve-favicon');
var path = require('path');
var session = require('express-session')
// var mongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override')
var compress = require('compression')
var logger = require('morgan');
var http = require('http');

module.exports = function (app, config, passport) {

    var port = normalizePort(process.env.PORT || '5000');
    app.set('port', port);


    var server = http.createServer(app);

    console.log("Listen Port: ", port);
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort (val) {
        var port = parseInt(val, 10);

        if (isNaN(port)) {
            // named pipe
            return val;
        }

        if (port >= 0) {
            // port number
            return port;
        }

        return false;
    }

    function onError (error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof port === 'string'
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    function onListening () {
        var addr = server.address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        //debug('Listening on ' + bind);
    }

    // fin inicializar server

    app.set('showStackError', true)
    app.use(compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }))

    // app.use(favicon(__dirname + '/public/favicon.ico'));

    //app.use(express.static('public'));
    console.log("__dirname", __dirname + "/..")
    app.use(express.static(path.join(__dirname + "/../", 'public')));

    /*app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });*/


    //app.use(express.static(config.root + '/public'))
    //app.use(express.static(path.join(__dirname, 'public')));
    //app.use('/public', express.static(path.join(__dirname, 'public')));
    // view engine setup
    //app.set('views', path.join(config.root, 'views'));
    //app.set('view engine', 'ejs');

    app.enable("jsonp callback")


    app.use(helpers(config.app.name))
    app.use(methodOverride())

    // Session init -------------------------------------------
    console.log("-- config.db --", config.db)

    var MongoDBStore = require('connect-mongodb-session')(session);
    var store = new MongoDBStore(
        {
            uri: config.db,
            collection: 'app_sessions'
        });

    var sessionOpts = {
        saveUninitialized: true, // saved new sessions
        resave: false, // do not automatically write to the session store
        store: store,
        secret: 'This is a secret yeah!!',
        cookie: { httpOnly: true, maxAge: 1000 * 60 }
        // configure when sessions expires 1000 * 60 * 60 * 24 * 7
    }
    app.use(cookieParser(sessionOpts.secret));
    app.use(require('express-session')(sessionOpts));

    // Catch errors
    store.on('error', function (error) {
        assert.ifError(error);
        assert.ok(false);
    });



    // Session End -------------------------------------------



    app.use(flash())
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(logger('dev'));




}
