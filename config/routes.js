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

    var cBook = require('../app/controllers/books')

    app.get('/api/book', cBook.getAll);
    app.get('/api/book/:idBook', cBook.getById);
    app.param('idBook', cBook.item);
    app.post('/api/book', cBook.create);
    app.put('/api/book/:id', cBook.update);
    app.delete('/api/book/:id', cBook.delete);

    var cNotifications = require('../app/controllers/notifications')

    app.get('/api/notifications', cNotifications.getAll);
    app.get('/api/notifications/:idNotifications', cNotifications.getById);
    app.param('idNotifications', cNotifications.item);
    app.post('/api/notifications', cNotifications.create);
    app.put('/api/notifications/:id', cNotifications.update);
    app.delete('/api/notifications/:id', cNotifications.delete);
}