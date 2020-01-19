
const { ApolloServer, graphiqlExpress } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');

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
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
  }));

  const ws = createServer(app);
  ws.listen(4000, () => {
    console.log('Go to http://localhost:4000/graphiql to run queries!');

    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
        server: ws,
        path: '/subscriptions',
      });
  });

}
