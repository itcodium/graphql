
const { ApolloServer, gql } = require('apollo-server-express');

var typeDefs = require('./schema');
var resolvers = require('./resolvers');

module.exports = function (app, bodyParser) {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
  var port = process.env.PORT || 4000;
  console.log("process.env.PORT", process.env.PORT)
  app.listen({ port: port }, () =>
    console.log(`🚀 Server ready at http://localhost:${ port }${ server.graphqlPath }`)
  );

}

/*

// List All
    {
        allNotifications{
          title,description
        }
    }

// List By Id
    {
        getNotification(
          _id:"5c7beb82267aca0d7c72a633"
        ) {
          _id
          title
          description
        }
    }

// Update By Id
    mutation{
        updateNotification ( _id:"5c7beb82267aca0d7c72a633",
          input:{
              title: "ADM-4250 (UPDATED II)  Errores de datos - Filtro de pago y Buscador",
              description: "test (UPDATED II)"
          })
        {
          _id
          title
          description
        }
    }



//  Add & Create

    mutation{
        createNotification (input:{
            title:"test GQL",
            description:"Let me show you how to create a new Product. You just need to send the createProduct mutation request from the GraphiQL"
        })
        {
          _id
          title
          description
        }
    }

// DELETE

 mutation{
        deleteNotification (_id:"5c7d5a41cee2590784f1a348")
        {
          _id
          title
          description
        }
    }



*/