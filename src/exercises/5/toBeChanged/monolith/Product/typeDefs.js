const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    productById(productId: ID!): Product
  }
  type Product {
    id: ID!
    name: String
    price: Int
    reviews: [Review]
  }
`;
