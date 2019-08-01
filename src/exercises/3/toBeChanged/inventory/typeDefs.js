const { gql } = require("apollo-server");

// 🐨 Let's add shippingEstimate as a float to the definition.
// We will need weight and price to calculate it, so annotate shippingEstimate with requires.

// 📜 https://www.apollographql.com/docs/apollo-server/federation/federation-spec/#requires

// 🐨 Run your test now. You should get two errors:
// Product.shippingEstimate -> requires the field `weight` to be marked as @external.
// Product.shippingEstimate -> requires the field `price` to be marked as @external.
// Make these errors go away. :-)

// 💰 Tip, in case you are stuck:
// Inventory service doesn't know anything about those fields, so let's define them here and mark them as external.

exports.typeDefs = gql`
  extend type Product @key(fields: "id") {
    id: ID! @external
    inStock: Boolean
    shippingEstimate: Float @requires(fields: "weight price")
    weight: Int @external
    price: Int @external
  }
`;
