const { gql } = require("apollo-server");

exports.typeDefs = gql`
  extend type Query {
    reviewsForProduct(productId: ID!): [Review!]!
  }

  type Review {
    id: ID!
    body: String
    author: User @provides(fields: "username")
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    username: String @external
    reviews: [Review]
  }

  extend type Product @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;
