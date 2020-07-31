var async = require('async')
    , http = require('http')
    , fs = require('fs');

module.exports = function (app, passport) {
    /*
    app.get('/notificaciones', function (req, res, next) {
        res.render('notificaciones', { title: 'Notificaciones.' });
    });
    app.get('/appversion', function (req, res, next) {
        res.render('appversion', { title: 'Versiones.' });
    });*/
    app.get('/', function (req, res, next) {
        res.render('home', { title: 'Notificaciones' });
    });

    var cOpenStreams = require('../app/controllers/openstreams')

    app.get('/api/openstreams', cOpenStreams.getAll);
    app.get('/api/openstreams/:idOpenstreams', cOpenStreams.getById);
    app.param('idOpenstreams', cOpenStreams.item);
    app.post('/api/openstreams', cOpenStreams.create);
    app.put('/api/openstreams/:id', cOpenStreams.update);
    app.delete('/api/openstreams/:id', cOpenStreams.delete);

    var cBook = require('../app/controllers/books')

    app.get('/api/book', cBook.getAll);
    app.get('/api/book/:idBook', cBook.getById);
    app.param('idBook', cBook.item);
    app.post('/api/book', cBook.create);
    app.put('/api/book/:id', cBook.update);
    app.delete('/api/book/:id', cBook.delete);

    var cMessage = require('../app/controllers/message')
    app.get('/api/message', cMessage.getAll);
    app.get('/api/message/:idMessage', cMessage.getById);
    app.param('idMessage', cMessage.item);
    app.post('/api/message', cMessage.create);
    app.put('/api/message/:id', cMessage.update);
    app.delete('/api/message/:id', cMessage.delete);

    var cGame = require('../app/controllers/game')
    app.get('/api/game', cGame.getAll);
    //app.get('/api/game/:idGame', cGame.getById);
    //app.param('idGame', cGame.item);
    //app.post('/api/game', cGame.create);
    //app.put('/api/game/:id', cGame.update);
    //app.delete('/api/game/:id', cGame.delete);
}