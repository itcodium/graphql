
const { ApolloServer, gql } = require('apollo-server-express');

var typeDefs = require('./schema');
var resolvers = require('./resolvers');

module.exports = function (app, bodyParser) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  server.applyMiddleware({ app });
  //var port = process.env.PORT || 4000;

  /*
  app.listen({ port: port }, () => {
    console.log(`1(🚀) Server ready at http://localhost:${ port }${ server.graphqlPath }`);
  });*/

}
