const { gql } = require("apollo-server");

// 🐨 Annotate the Product type with a key of a field upc
// 📜 https://www.apollographql.com/docs/apollo-server/federation/core-concepts/#entities-and-keys

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
