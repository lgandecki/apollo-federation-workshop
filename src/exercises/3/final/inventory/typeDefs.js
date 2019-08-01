const { gql } = require("apollo-server");

exports.typeDefs = gql`
  extend type Product @key(fields: "id") {
    id: ID! @external
    inStock: Boolean
  }
`;
