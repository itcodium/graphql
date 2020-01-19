var typeDefs = require('./schema');
var resolvers = require('./resolvers');
var cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');

module.exports = function (app) {
  const PORT = process.env.PORT || '4000';

  app.use('*', cors({ origin: `http://localhost:${ PORT }` }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
  });
  server.applyMiddleware({ app });

  const httpServer = createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:${ PORT }${ server.graphqlPath }`)
    console.log(`🚀 Subscriptions ready at ws://localhost:${ PORT }${ server.subscriptionsPath }`)
  })

  httpServer.on('error', onError);
  httpServer.on('listening', onListening);

  function onError (error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening () {
    var addr = httpServer.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  }


}
