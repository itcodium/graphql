var express = require('express');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
  mongoose = require('mongoose')


var db = mongoose.connect(config.db, { useNewUrlParser: true })
require('./config/passport')(passport, config)

require('./app/models/books.js')
require('./app/models/notifications.js')

require('./config/passport')(passport, config)

// SET NODE_ENV=development

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log("DIR: ", __dirname + '/static')
console.log("DIR 2: ", path.join(__dirname, '/static'))
app.use(express.static(path.join(__dirname, '/static')));

require('./config/GraphQL/graphql')(app, bodyParser)
require('./config/express')(app, config, passport)
require('./config/routes')(app, passport)


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});


app.use(function (req, res, next) {
  var err = new Error('Not Found ' + req.originalUrl);
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


exports = module.exports = app;