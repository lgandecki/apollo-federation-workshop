const { gql } = require("apollo-server");

// 🐨 (test 1) Turn this standalone schema into federated one.
// Use keywords such as extend, @key, @external.

// 💰 (test 1) Try to drive changes in this schema by the test errors.
// (You might have to jump to accounts/typeDefs.js while doing so, before finishing with this file)

// 💰 (test 1) Once you get this error: `User.username -> is marked as @external but is not used`
// Just remove the username field from the User type.
// It will be fetched from the accounts service now, and this service doesn't have to know about it anymore.

exports.typeDefs = gql`
  extend type Query {
    reviewsForProduct(productId: ID!): [Review!]!
  }

  type Review {
    id: ID!
    body: String
    author: User
    product: Product
  }

  type User {
    id: ID!
    username: String
    reviews: [Review]
  }

  type Product {
    id: ID!
    reviews: [Review]
  }
`;

// 🐨 (test 2) Look at the reviews/resolvers.js . We have the username cached in this service.
// It initially got resolved by the resolvers.User.username function, but now that's skipped.
// If that's the only field we would like to have for a reviewer, it would be nice not to have to request it from the accounts service.
// Add the User.username field back in. Use @provides directive.

// 📜 (test 2) https://www.apollographql.com/docs/apollo-server/federation/advanced-features/#using-denormalized-data
