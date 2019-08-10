const { gql } = require("apollo-server");

// 🐨 (test 1) Turn this standalone schema into a federated one.

exports.typeDefs = gql`
  extend type Query {
    me: User
  }

  type User {
    id: ID!
    name: String
    username: String
    birthDate: String
  }
`;

// 💰 In case you are stuck: You have to use one of these keywords: extend, @key, @external.
