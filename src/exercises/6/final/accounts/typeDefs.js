const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    me: User
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
  }
`;
