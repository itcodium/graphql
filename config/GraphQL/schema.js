

var typeDefs = `type Message {
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
                    getMessage(_id: ID!): Message
                    allMessage: [Message]
                  }
                  input MessageInput {
                    title: String!
                    description: String!
                  }
                  type Mutation {
                    updateMessage(_id: ID!, input: MessageInput): Message
                    createMessage(input: MessageInput) : Message
                    deleteMessage(_id: ID!) : Message
                  }
                  type Subscription {
                    createdMessage: Message
                  }
              `;

module.exports = typeDefs;
