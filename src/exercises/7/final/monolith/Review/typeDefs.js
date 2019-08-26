const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    reviewsForProduct(productId: ID!): [Review!]!
  }

  type Review {
    id: ID!
    body: String
    author: User
    product: Product
  }

  extend type User @key(fields: "id") {
    id: ID! @external
    reviews: [Review]
  }
`;
