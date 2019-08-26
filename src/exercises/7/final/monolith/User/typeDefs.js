const { gql } = require("apollo-server");

exports.typeDefs = gql`
  extend type User @key(fields: "id") {
    id: ID! @external
    #    name: String
    #    reviews: [Review]
  }
`;
