var express = require('express');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var env = process.env.NODE_ENV || 'development',
  config = require('./config/config')[env],
  mongoose = require('mongoose')

var db = mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

require('./app/models/books.js');
require('./app/models/openstreams.js');
require('./app/models/message.js');
require('./config/passport')(passport, config);

var app = express();
app.options('*', cors());

require('./config/GraphQL/graphql')(app, express, bodyParser);
require('./config/express')(app, express, config, passport);
require('./config/routes')(app, passport);

app.use(function (req, res, next) {
  var err = new Error('Not Found ' + req.originalUrl);
  err.status = 404;
  next(err);
});

exports = module.exports = app;