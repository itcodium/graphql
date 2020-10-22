
module.exports = function (app, passport,cors) {
    app.get('/', function (req, res, next) {
        res.render('home', { title: 'Notificaciones' });
    });

    var cOpenStreams = require('../app/controllers/openstreams');
    app.get('/api/openstreams', cOpenStreams.getAll);
    app.get('/api/openstreams/:idOpenstreams', cOpenStreams.getById);
    app.param('idOpenstreams', cOpenStreams.item);
    app.post('/api/openstreams', cOpenStreams.create);
    app.put('/api/openstreams/:id', cOpenStreams.update);
    app.delete('/api/openstreams/:id', cOpenStreams.delete);

    var cTimer = require('../app/controllers/timer');
    app.get('/api/timer', cors(),cTimer.getAll);
    app.get('/api/timer/:idTimer', cTimer.getById);
    app.param('idTimer', cTimer.item);
    app.post('/api/timer', cTimer.create);
    app.put('/api/timer/:id', cTimer.update);
    app.delete('/api/timer/:id', cTimer.delete);

    var cBook = require('../app/controllers/books')
    app.get('/api/book', cBook.getAll);
    app.get('/api/book/:idBook', cBook.getById);
    app.param('idBook', cBook.item);
    app.post('/api/book', cBook.create);
    app.put('/api/book/:id', cBook.update);
    app.delete('/api/book/:id', cBook.delete);
   
    var cGame = require('../app/controllers/game')
    app.get('/api/game', cGame.getAll);
}