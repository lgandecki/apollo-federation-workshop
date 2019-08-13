const { gql } = require("apollo-server");

// 🐨 Define the Product type with a key annotation, matching the declaration from products service. Since you are extending a type defined in other service, you need to use extend keyword for the type.

// 🐨 Define fields:
// id: ID!
// inStock: Boolean

// 🐨 Since id is defined in another service, it has to be annotated as external here.

// 📜 https://www.apollographql.com/docs/apollo-server/federation/federation-spec/#external
// 📜 More in depth: https://www.apollographql.com/docs/apollo-server/federation/core-concepts/#referencing-external-types

exports.typeDefs = gql``;
