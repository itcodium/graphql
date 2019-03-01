/*
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Todo     = require('../models/Todos');

// middleware to use for all requests
router.use(function(req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', ip);
    next(); 
});

// findById
router.param('post', function(req, res, next, id) {
        console.log("Todo.findById(id)...");
  var query = Todo.findById(id);
  query.exec(function (err, item){
    if (err) { return next(err); }
    if (!item) { return next(new Error('can\'t find item')); }

    req.post = item;   // posible error
    return next();
  });
});

// Call findById
router.get('/:post', function(req, res) {
  res.json(req.post);
});

// get all
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.post('/', function(req, res,next) {
          var vTodo = new Todo(req.body);
          vTodo.save(function(err, post){
              if(err){ return next(err); }
              res.json(post);
            });
    }); 


router.put('/:id', function (req, res){
  return Todo.findById(req.params.id, function (err, item) {
    item.name = req.body.name;
    return item.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(item);
    });
  });
});


//Delete a book
router.delete( '/:id', function( request, response ) {
  return Todo.findById(request.params.id, function (err, item) {
    return item.remove(function (err) {
      if (!err) {
        console.log("removed");
        return response.send('');
      } else {
        console.log(err);
      }
    });
  });

});

module.exports = router;
*/
/*

curl http://localhost:3000/todos
curl http://localhost:3000/todos/557206cd94bf0eec1878ebd5
curl --data 'name=ingresar dato&completed=true' http://localhost:3000/todos
curl -X PUT http://localhost:3000/todos/557206cd94bf0eec1878ebd5
curl -X DELETE http://localhost:3000/posts/557206cd94bf0eec1878ebd5

Testing de routes

curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
curl http://localhost:3000/posts
curl -X PUT http://localhost:3000/posts/556e105bc9ea124f130458e1/upvote

*/
