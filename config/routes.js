var path = require('path');
module.exports = function (app, passport,cors) {
    /*app.get('/', function (req, res, next) {
        res.render('home', { title: 'Notificaciones' });
    });*/

    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname+ '/public/index.html'));
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
    app.param('id',cTimer.item);
    app.get('/api/timer/:id',cors(), cTimer.getById);
    app.post('/api/timer/:id/start', cors(),cTimer.start);
    app.post('/api/timer/:id/stop', cors(),cTimer.stop);
    app.post('/api/timer', cors(),cTimer.create);
    app.put('/api/timer/:id', cors(),cTimer.update);
    app.delete('/api/timer/:id', cors(),cTimer.delete);

    var cBook = require('../app/controllers/books')
    app.get('/api/book',cors(), cBook.getAll);
    app.get('/api/book/:idBook', cBook.getById);
    app.param('idBook',cors(), cBook.item);
    app.post('/api/book',cors(), cBook.create);
    app.put('/api/book/:id',cors(), cBook.update);
    app.delete('/api/book/:id',cors(), cBook.delete);
   
    var cGame = require('../app/controllers/game')
    app.get('/api/game', cGame.getAll);
}