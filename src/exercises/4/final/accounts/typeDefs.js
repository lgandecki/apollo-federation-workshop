const { gql } = require("apollo-server");

exports.typeDefs = gql`
  extend type Query {
    me: User
  }

  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
    birthDate: String
  }
`;
