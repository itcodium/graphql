const chai = require('chai');


const url_local = `http://localhost:4000/`;
const url_remote = `https://nodejs-gql.herokuapp.com`;
const should = chai.should();
const expect = chai.expect;

const request = require('supertest')(url_remote);

describe('GraphQL', () => {
    it('Query Message', (done) => {
        request.post('/graphql')
            .send({
                query: `{
                            getMessage (
                                _id: "5e23a8aa0a436314c4c6555b"
                            ) {
                                _id
                                title
                                description
                            }
                        }`})
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                res.body.data.should.have.property('getMessage');
                res.body.data.getMessage.should.have.property('_id');
                res.body.data.getMessage.should.have.property('title');
                res.body.data.getMessage.should.have.property('description');
                done();
            })
    })
});