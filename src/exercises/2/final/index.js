/* eslint-disable global-require */
module.exports = {
  inventory: {
    typeDefs: require("./inventory/typeDefs").typeDefs,
    resolvers: require("./inventory/resolvers").resolvers
  },
  products: {
    typeDefs: require("./products/typeDefs").typeDefs,
    resolvers: require("./products/resolvers").resolvers
  }
};
