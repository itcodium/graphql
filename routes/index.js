/*
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post     = require('../models/Posts');

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

// 
router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);
  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.get('/posts/:post', function(req, res) {
  res.json(req.post);
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express yeah!!' });
});

router.get('/message', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.post('/posts', function(req, res,next) {
          var post = new Post(req.body);
          post.save(function(err, post){
              if(err){ return next(err); }
              res.json(post);
            });
    });

router.get('/posts', function(req, res, next) {
     Post.find(function(err, posts){
     if(err){ return next(err); }
          res.json(posts);
     });
});    

router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote(function(err, post){
    if (err) { return next(err); }

    res.json(post);
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});


router.get('/posts/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }
    res.json(post);
  });
});




module.exports = router;

*/
/*

Testing de routes

curl --data 'title=test&link=http://test.com' http://localhost:3000/posts
curl http://localhost:3000/posts
curl -X PUT http://localhost:3000/posts/556e105bc9ea124f130458e1/upvote

*/
