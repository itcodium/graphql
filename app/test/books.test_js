var mongoose = require("mongoose");
var Book = require('../../app/models/books');

process.env.NODE_ENV = 'test';

//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Books', () => {
    beforeEach((done) => { //Before each test we empty the database
        Book.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET book', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
                .get('/api/book')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    // https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

    /*
     * Test the /POST route
     */
    describe('/POST book', () => {
        it('it should not POST a book without pages field', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954
            }
            chai.request(server)
                .post('/api/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('pages');
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
        it('it should POST a book ', (done) => {
            let book = {
                title: "The Lord of the Rings",
                author: "J.R.R. Tolkien",
                year: 1954,
                pages: 1170
            }
            chai.request(server)
                .post('/api/book')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Book successfully added!');
                    res.body.book.should.have.property('title');
                    res.body.book.should.have.property('author');
                    res.body.book.should.have.property('year');
                    res.body.book.should.have.property('pages');
                    done();
                });
        });
    });
    /*
      * Test the /GET/:id route
      */
    describe('/GET/:id book', () => {
        it('it should GET a book by the given id', (done) => {
            let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
            book.save((err, book) => {
                chai.request(server)
                    .get('/api/book/' + book.id)
                    .send(book)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('title');
                        res.body.should.have.property('author');
                        res.body.should.have.property('pages');
                        res.body.should.have.property('year');
                        res.body.should.have.property('_id').eql(book.id);
                        done();
                    });
            });

        });
    });

    /*
 * Test the /PUT/:id route
 */
    describe('/PUT/:id book', () => {
        it('it should UPDATE a book given the id', (done) => {
            let book = new Book({ title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778 })
            book.save((err, book) => {
                chai.request(server)
                    .put('/api/book/' + book.id)
                    .send({ title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778 })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Book updated!');
                        res.body.book.should.have.property('year').eql(1950);
                        done();
                    });
            });
        });
    });


});
