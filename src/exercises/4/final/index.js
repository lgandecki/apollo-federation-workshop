/* eslint-disable global-require */
module.exports = {
  accounts: {
    typeDefs: require("./accounts/typeDefs").typeDefs,
    resolvers: require("./accounts/resolvers").resolvers
  },
  reviews: {
    typeDefs: require("./reviews/typeDefs").typeDefs,
    resolvers: require("./reviews/resolvers").resolvers
  },
  inventory: {
    typeDefs: require("./inventory/typeDefs").typeDefs,
    resolvers: require("./inventory/resolvers").resolvers
  },
  products: {
    typeDefs: require("./products/typeDefs").typeDefs,
    resolvers: require("./products/resolvers").resolvers
  }
};
