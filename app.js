var express = require('express');
var passport = require('passport');
var path = require('path');
var bodyParser = require('body-parser');
var  http = require('http');

// var env = process.env.NODE_ENV || 'development',
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
app.use(express.static(path.join(__dirname, 'public')));

require('./config/GraphQL/graphql')(app, bodyParser)
require('./config/express')(app, config, passport)
require('./config/routes')(app, passport)

 


var request = require('request');
var headers = {
    'Authorization':      "Bearer "+"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NTM4OTE2NjQsImV4cCI6MTU1Mzg5MjI2NCwiZGF0YSI6eyJpZCI6IjgxIn19.W67DIaSCT602_7rNZzz0EI_YXipsNglrrqLvKge2BmM",
    'Content-Type':    "application/json;charset=utf-8"
}
// Configure the request
var options = {
    url: 'http://dev.adm.dlatv.net/services/products/filters/1308/contents?tenant_code=clarovideo',
    method: 'GET',
    headers: headers,
    qs: {'key1': 'xxx', 'key2': 'yyy'}
}
// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
})


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


exports = module.exports = app


/*
// Graphql Init ----------------------------------------------------------------------
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String,
    test: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world!';
  },
  test: () => {
    return 'Hello Testworld!';
  },
};

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// End Graphql ----------------------------------------------------------------------


*/