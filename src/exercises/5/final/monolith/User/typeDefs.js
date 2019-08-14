const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    id: ID!
    name: String
    reviews: [Review]
  }
`;
