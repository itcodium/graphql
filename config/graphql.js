module.exports = function (app) {

    var graphqlHTTP = require('express-graphql');
    var { buildSchema } = require('graphql');

    var schema = buildSchema(`type Query {
                                    hello: String
                                }`);

    var root = { hello: () => 'Hello world!' };


    app.use('/api/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));

}
