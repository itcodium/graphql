var async = require('async')
    , http = require('http')
    , fs = require('fs');


module.exports = function (app, passport) {
    app.get('/notificaciones', function (req, res, next) {
        res.render('notificaciones', { title: 'Notificaciones.' });
    });
    app.get('/appversion', function (req, res, next) {
        res.render('appversion', { title: 'Versiones.' });
    });
    app.get('/', function (req, res, next) {
        res.render('index', { title: 'Notificaciones' });
    });

    var cBook = require('../app/controllers/book')

    app.get('/api/book', cBook.getAll);
    app.get('/api/book/:id', cBook.getById);
    app.param('id', cBook.book);
    app.post('/api/book', cBook.create);
    app.put('/api/book/:id', cBook.update);
    app.delete('/api/book/:id', cBook.delete);

    var cNotificaciones = require('../app/controllers/notificaciones')

    app.get('/api/notificaciones', cNotificaciones.getAll);
    app.get('/api/notificaciones/:id', cNotificaciones.getById);
    app.param('id', cNotificaciones.notificaciones);
    app.post('/api/notificaciones', cNotificaciones.create);
    app.put('/api/notificaciones/:id', cNotificaciones.update);
    app.delete('/api/notificaciones/:id', cNotificaciones.delete);
}