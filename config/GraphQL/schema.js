
var resolvers = require('./resolvers');
var { makeExecutableSchema } = require('graphql-tools');

var typeDefs = `type Notification {
                    _id: ID!
                    title: String!
                    description: String!
                    link: String
                    category: String
                    category_str: String
                    inner_id: String
                    read: Boolean
                  }
                  type Query {
                    getNotification(_id: ID!): Notification
                    allNotifications: [Notification]
                  }

                  input NotificationInput {
                    title: String!
                    description: String!
                  }
                  type Mutation {
                    updateNotification(_id: ID!, input: NotificationInput): Notification
                    createNotification(input: NotificationInput) : Notification
                    deleteNotification(_id: ID!) : Notification
                  }
              `;
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
