const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    topProducts(first: Int = 5): [Product]
  }

  type Product @key(fields: "id") {
    id: ID!
    name: String
    price: Int
    weight: Int
  }
`;
